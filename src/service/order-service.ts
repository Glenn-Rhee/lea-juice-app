import { ResponsePayload } from "@/types";
import OrderValidation from "@/validation/order-validation";
import z from "zod";
import midtransClient from "midtrans-client";
import { prisma } from "@/lib/prisma";
import ResponseError from "@/error/ResponseError";
import { Product } from "../../generated/prisma";

export default class OrderService {
  static async createOrder(
    data: z.infer<typeof OrderValidation.CREATEORDER>,
    user_id: string
  ): Promise<ResponsePayload> {
    await prisma.$transaction(async (tx) => {
      const cartUser = await tx.cart.findUnique({ where: { user_id } });
      if (!cartUser) {
        throw new ResponseError(404, "Oops you don't have a chart yet!");
      }
      const cartItems = await tx.cartItem.findMany({
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

      let userOrder = await tx.order.findUnique({ where: { user_id } });
      if (!userOrder) {
        userOrder = await tx.order.create({
          data: { user_id },
        });
      }

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
    });

    // const snap = new midtransClient.Snap({
    //   isProduction: false,
    //   serverKey: process.env.MIDTRANS_SERVER_KEY!,
    //   clientKey: process.env.MIDTRANS_CLIENT_KEY!,
    // });

    // const parameter = {
    //     transaction_details: {
    //         order_id: data.
    //     }
    // }

    return {
      status: "success",
      code: 201,
      data: null,
      message: "Successfully checkout!",
    };
  }
}
