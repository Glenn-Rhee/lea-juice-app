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
      select: {
        product_name: true,
        stock: true,
      },
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
      select: { id: true },
    });

    if (existingItem) {
      throw new ResponseError(401, "Oops! This item already add to cart");
    }

    if (isProductRegist.stock < data.quantity) {
      throw new ResponseError(
        401,
        `Stock for ${isProductRegist.product_name} is run out!`
      );
    }

    await prisma.cartItem.create({
      data: {
        quantity: data.quantity,
        product_id: data.product_id,
        cart_id: cart.id,
      },
    });

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
    const existingCart = await prisma.cart.findFirst({
      where: { user_id },
      select: { id: true },
    });
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

  static async deleteCart(
    item_id: string,
    user_id: string
  ): Promise<ResponsePayload> {
    const existingUser = await prisma.user.findUnique({
      where: { id: user_id },
      select: { id: true },
    });

    if (!existingUser) {
      throw new ResponseError(404, "Oops! user is not found!");
    }

    const existingCartItem = await prisma.cartItem.findUnique({
      where: { id: item_id },
      select: { id: true },
    });

    if (!existingCartItem) {
      throw new ResponseError(404, "Oops! Cart item is missing or deleted!");
    }

    await prisma.cartItem.delete({ where: { id: item_id } });

    return {
      code: 201,
      data: null,
      message: "Successfully delete cart item",
      status: "success",
    };
  }

  static async updateCart(
    data: z.infer<typeof CartValidation.UPDATECART>
  ): Promise<ResponsePayload> {
    const existingCart = await prisma.cartItem.findUnique({
      where: { id: data.item_id },
      select: { product_id: true, cart_id: true },
    });

    if (!existingCart) {
      throw new ResponseError(
        404,
        "Item cart is not found! Item is missing or has been deleted!"
      );
    }

    const product = await prisma.product.findUnique({
      where: { id: existingCart.product_id },
      select: { stock: true, product_name: true },
    });

    if (!product) {
      throw new ResponseError(404, "Product is not found!");
    }

    if (product.stock < data.quantity) {
      throw new ResponseError(
        401,
        `Stock for ${product.product_name} is run out!`
      );
    }

    await prisma.cartItem.update({
      where: { id: data.item_id },
      data: { quantity: data.quantity },
    });

    const cartItems = await prisma.cartItem.findMany({
      where: { cart_id: existingCart.cart_id },
    });

    return {
      code: 201,
      data: cartItems,
      message: "Successfully update cart item",
      status: "success",
    };
  }
}
