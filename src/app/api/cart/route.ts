import ResponseError from "@/error/ResponseError";
import { redis } from "@/lib/redis";
import CartService from "@/service/cart-service";
import { ResponsePayload } from "@/types";
import CartValidation from "@/validation/cart-validation";
import Validation from "@/validation/validation";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import z, { ZodError } from "zod";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.id) {
      throw new ResponseError(403, "Forbidden! You don't have an access!");
    }

    const key = `checkout:${token.id}`;
    const limitWindow = 2;
    const last = await redis.get(key);
    if (last) {
      throw new ResponseError(429, "Please wait before checkout again.");
    }
    await redis.set(key, "1", { ex: limitWindow });

    const dataJSON = await req.text();
    const dataCart = (await JSON.parse(dataJSON)) as z.infer<
      typeof CartValidation.CREATECART
    >;

    const data = Validation.validate(CartValidation.CREATECART, dataCart);
    const response = await CartService.createCart(data, token.id);
    return NextResponse.json<ResponsePayload>(response);
  } catch (error) {
    console.log("Error cart Route at POST method:", error);
    if (error instanceof ZodError) {
      return NextResponse.json<ResponsePayload>({
        status: "failed",
        code: 401,
        data: null,
        message: error.issues[0].message,
      });
    } else if (error instanceof ResponseError) {
      return NextResponse.json<ResponsePayload>({
        status: "failed",
        code: error.code,
        data: null,
        message: error.message,
      });
    } else {
      return NextResponse.json<ResponsePayload>({
        status: "failed",
        code: 500,
        data: null,
        message: "An error occured! Please try again later",
      });
    }
  }
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.id) {
      throw new ResponseError(403, "Forbidden! You don't have an access!");
    }
    const key = `checkout:${token.id}`;
    const limitWindow = 2;
    const last = await redis.get(key);
    if (last) {
      throw new ResponseError(429, "Please wait before checkout again.");
    }
    await redis.set(key, "1", { ex: limitWindow });
    const dataJSON = await req.text();
    const dataCart = (await JSON.parse(dataJSON)) as z.infer<
      typeof CartValidation.UPDATECART
    >;

    const data = Validation.validate(CartValidation.UPDATECART, dataCart);
    const response = await CartService.updateCart(data);

    return NextResponse.json<ResponsePayload>(response);
  } catch (error) {
    console.log("Error cart Route at PUT method:", error);
    if (error instanceof ZodError) {
      return NextResponse.json<ResponsePayload>({
        status: "failed",
        code: 401,
        data: null,
        message: error.issues[0].message,
      });
    } else if (error instanceof ResponseError) {
      return NextResponse.json<ResponsePayload>({
        status: "failed",
        code: error.code,
        data: null,
        message: error.message,
      });
    } else {
      return NextResponse.json<ResponsePayload>({
        status: "failed",
        code: 500,
        data: null,
        message: "An error occured! Please try again later",
      });
    }
  }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.id) {
      throw new ResponseError(403, "Forbidden! You don't have an access!");
    }

    const response = await CartService.getCart(token.id);
    return NextResponse.json<ResponsePayload>(response);
  } catch (error) {
    console.log("Error cart Route at GET method:", error);
    if (error instanceof ZodError) {
      return NextResponse.json<ResponsePayload>({
        status: "failed",
        code: 401,
        data: null,
        message: error.issues[0].message,
      });
    } else if (error instanceof ResponseError) {
      return NextResponse.json<ResponsePayload>({
        status: "failed",
        code: error.code,
        data: null,
        message: error.message,
      });
    } else {
      return NextResponse.json<ResponsePayload>({
        status: "failed",
        code: 500,
        data: null,
        message: "An error occured! Please try again later",
      });
    }
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const query = req.nextUrl.searchParams;
    const item_id = query.get("item_id");
    if (!item_id) {
      throw new ResponseError(401, "Item id is required!");
    }

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.id) {
      throw new ResponseError(403, "Forbidden! You don't have an access!");
    }

    const response = await CartService.deleteCart(item_id, token.id);
    return NextResponse.json<ResponsePayload>(response);
  } catch (error) {
    console.log("Error cart Route at DELETE method:", error);
    if (error instanceof ZodError) {
      return NextResponse.json<ResponsePayload>({
        status: "failed",
        code: 401,
        data: null,
        message: error.issues[0].message,
      });
    } else if (error instanceof ResponseError) {
      return NextResponse.json<ResponsePayload>({
        status: "failed",
        code: error.code,
        data: null,
        message: error.message,
      });
    } else {
      return NextResponse.json<ResponsePayload>({
        status: "failed",
        code: 500,
        data: null,
        message: "An error occured! Please try again later",
      });
    }
  }
}
