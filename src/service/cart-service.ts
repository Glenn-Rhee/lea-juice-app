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
      where: { product_id: data.product_id, cart_id: cart.id },
    });

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: data.quantity },
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

    const cartItems = await prisma.cartItem.findMany({
      where: { cart_id: cart.id },
      include: { product: true },
    });

    return {
      status: "success",
      code: 201,
      data: cartItems,
      message: "Successfully add to cart!",
    };
  }

  static async getCart(user_id: string): Promise<ResponsePayload> {
    const existingCart = await prisma.cart.findFirst({ where: { user_id } });
    if (!existingCart) {
      return {
        code: 200,
        data: [],
        message: "Successfully get cart Items!",
        status: "success",
      };
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { cart_id: existingCart.id },
      include: { product: true },
    });

    return {
      code: 200,
      data: cartItems,
      message: "Successfully get cart items!",
      status: "success",
    };
  }
}
