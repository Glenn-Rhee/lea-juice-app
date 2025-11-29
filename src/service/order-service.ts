import { ResponsePayload } from "@/types";
import OrderValidation from "@/validation/order-validation";
import z from "zod";
import midtransClient, {
  SnapTransactionParameters,
  SnapTransactionResponse,
} from "midtrans-client";
import { prisma } from "@/lib/prisma";
import ResponseError from "@/error/ResponseError";
import { CartItem, Product } from "../../generated/prisma";

export default class OrderService {
  static async createOrder(
    data: z.infer<typeof OrderValidation.CREATEORDER>,
    user_id: string
  ): Promise<ResponsePayload> {
    const dataUser = await prisma.userDetail.findUnique({
      where: { userId: user_id },
    });

    if (!dataUser) {
      throw new ResponseError(404, "Oops user is not found!");
    }

    if (
      !dataUser.address ||
      !dataUser.phoneNumber ||
      !dataUser.city ||
      !dataUser.province ||
      !dataUser.postalCode
    ) {
      throw new ResponseError(400, "Please fill your profile data first!");
    }

    let cartItems: CartItem[] = [];

    const order = await prisma.$transaction(async (tx) => {
      const cartUser = await tx.cart.findUnique({ where: { user_id } });
      if (!cartUser) {
        throw new ResponseError(404, "Oops you don't have a chart yet!");
      }
      cartItems = await tx.cartItem.findMany({
        where: { cart_id: cartUser.id },
      });

      if (cartItems.length === 0) {
        throw new ResponseError(
          404,
          "Oops you don't have a chart yet or you already checkout!"
        );
      }
      const productsIds = cartItems.map((c) => c.product_id);
      const products = await tx.product.findMany({
        where: { id: { in: productsIds } },
      });

      const productMap = new Map();
      products.forEach((p) => productMap.set(p.id, p));

      const userOrder = await tx.order.create({ data: { user_id } });

      for (const c of cartItems) {
        const product = productMap.get(c.product_id) as Product;

        if (!product) throw new ResponseError(404, "Product is not found!");
        if (product.stock < c.quantity) {
          throw new ResponseError(
            400,
            `Stock for ${product.product_name} is not enough`
          );
        }

        await tx.detail_Order.create({
          data: {
            order_id: userOrder.id,
            product_id: c.product_id,
            quantity: c.quantity,
            total_price: c.quantity * product.price,
            status: "PENDING",
            payment_method: data.payment_method,
          },
        });

        await tx.product.update({
          where: { id: c.product_id },
          data: {
            stock: { decrement: c.quantity },
          },
        });
      }

      await tx.cartItem.deleteMany({ where: { cart_id: cartUser.id } });

      return userOrder;
    });

    let transaction: SnapTransactionResponse | null = null;
    try {
      const snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY!,
        clientKey: process.env.MIDTRANS_CLIENT_KEY!,
      });

      const parameter: SnapTransactionParameters = {
        transaction_details: {
          order_id: order.id,
          gross_amount: data.total_price,
        },
      };

      transaction = await snap.createTransaction(parameter);

      await prisma.payment.create({
        data: {
          payment_status: "SUCCESS",
          order_id: order.id,
          transaction_id: transaction.token,
        },
      });
    } catch (error) {
      console.log("Error while create transaction:", error);
      await prisma.$transaction(async (tx) => {
        await tx.cartItem.createMany({ data: cartItems });

        for (const c of cartItems) {
          await tx.product.update({
            where: { id: c.product_id },
            data: {
              stock: { increment: c.quantity },
            },
          });
        }
      });

      throw new ResponseError(500, "An error while create transaction!");
    }

    return {
      status: "success",
      code: 201,
      data: {
        url: transaction ? transaction.redirect_url : "/shop",
      },
      message: "Successfully checkout!",
    };
  }
}
