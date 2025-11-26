import ResponseError from "@/error/ResponseError";
import TransactionService from "@/service/transaction-service";
import { ResponsePayload } from "@/types";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.id) {
      throw new ResponseError(403, "Forbidden! You don't have an access!");
    }

    const response = await TransactionService.getTransaction(token.id);

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
