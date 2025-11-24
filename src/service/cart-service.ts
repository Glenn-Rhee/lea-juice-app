import ResponseError from "@/error/ResponseError";
import { prisma } from "@/lib/prisma";
import { ResponsePayload } from "@/types";
import CartValidation from "@/validation/cart-validation";
import z from "zod";

export default class CartService {
  static async createCart(
    data: z.infer<typeof CartValidation.CREATECART>,
    user_id: string
  ): Promise<ResponsePayload> {
    const isUserRegist = await prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!isUserRegist) {
      throw new ResponseError(404, "Oops! user id is not found!");
    }

    const isProductRegist = await prisma.product.findUnique({
      where: { id: data.product_id },
    });
    if (!isProductRegist) {
      throw new ResponseError(404, "Oops! Product is not found!");
    }

    let cart = await prisma.cart.findFirst({ where: { user_id } });
    if (!cart) {
      cart = await prisma.cart.create({ data: { user_id } });
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: { product_id: data.product_id },
    });

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + data.quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          quantity: data.quantity,
          product_id: data.product_id,
          cart_id: cart.id,
        },
      });
    }

    return {
      status: "success",
      code: 201,
      data: null,
      message: "Successfully add to cart!",
    };
  }
}
