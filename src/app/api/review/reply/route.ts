import ResponseError from "@/error/ResponseError";
import ReviewService from "@/service/review-service";
import { ResponsePayload } from "@/types";
import ReviewValidation from "@/validation/review-validation";
import Validation from "@/validation/validation";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const dataJson = JSON.parse(await req.text());
    const dataReply = Validation.validate(
      ReviewValidation.CREATEREPLYREVIEW,
      dataJson
    );

    const response = await ReviewService.createReplyReview(dataReply);
    return NextResponse.json<ResponsePayload>(response, {
      status: response.code,
    });
  } catch (error) {
    console.log("Error review/reply Route at POST method:", error);
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
