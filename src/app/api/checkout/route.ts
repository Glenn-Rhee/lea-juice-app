import ResponseError from "@/error/ResponseError";
import OrderService from "@/service/order-service";
import { ResponsePayload } from "@/types";
import OrderValidation from "@/validation/order-validation";
import Validation from "@/validation/validation";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.id) {
      throw new ResponseError(403, "Forbidden! You don't have an access!");
    }

    const dataPlain = await req.text();
    const dataOrder = await JSON.parse(dataPlain);

    const data = Validation.validate(OrderValidation.CREATEORDER, dataOrder);
    const response = await OrderService.createOrder(data, token.id);
    return NextResponse.json<ResponsePayload>(response);
  } catch (error) {
    console.log("Error cart Route at POST method:", error);
    if (error instanceof ZodError) {
      return NextResponse.json<ResponsePayload>(
        {
          status: "failed",
          code: 401,
          data: null,
          message: error.issues[0].message,
        },
        { status: 401 }
      );
    } else if (error instanceof ResponseError) {
      return NextResponse.json<ResponsePayload>(
        {
          status: "failed",
          code: error.code,
          data: null,
          message: error.message,
        },
        { status: error.code }
      );
    } else {
      return NextResponse.json<ResponsePayload>(
        {
          status: "failed",
          code: 500,
          data: null,
          message: "An error occured! Please try again later",
        },
        { status: 500 }
      );
    }
  }
}

export async function PATCH(req: NextRequest): Promise<NextResponse> {
  try {
    const searchParams = req.nextUrl.searchParams;
    const detailOrderId = searchParams.get("id");
    if (!detailOrderId) {
      throw new ResponseError(401, "Detail order id is required!");
    }

    const dataJson = await req.text();
    const dataStatus = await JSON.parse(dataJson);
    const data = Validation.validate(OrderValidation.PATCHORDER, dataStatus)
    const response = await OrderService.patchOrder(detailOrderId, data);
    return NextResponse.json<ResponsePayload>(response, {
      status: response.code,
    });
  } catch (error) {
    console.log("Error cart Route at PATCH method:", error);
    if (error instanceof ZodError) {
      return NextResponse.json<ResponsePayload>(
        {
          status: "failed",
          code: 401,
          data: null,
          message: error.issues[0].message,
        },
        { status: 401 }
      );
    } else if (error instanceof ResponseError) {
      return NextResponse.json<ResponsePayload>(
        {
          status: "failed",
          code: error.code,
          data: null,
          message: error.message,
        },
        { status: error.code }
      );
    } else {
      return NextResponse.json<ResponsePayload>(
        {
          status: "failed",
          code: 500,
          data: null,
          message: "An error occured! Please try again later",
        },
        { status: 500 }
      );
    }
  }
}
