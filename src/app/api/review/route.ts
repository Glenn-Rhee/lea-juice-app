import ResponseError from "@/error/ResponseError";
import ReviewService from "@/service/review-service";
import { ResponsePayload } from "@/types";
import ReviewValidation from "@/validation/review-validation";
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
    const dataJSon = await JSON.parse(dataPlain);

    const data = Validation.validate(ReviewValidation.CREATEREVIEW, dataJSon);
    const response = await ReviewService.createReview(data, token.id);

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
