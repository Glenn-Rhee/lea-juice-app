import ResponseError from "@/error/ResponseError";
import StatisticService from "@/service/statistic-service";
import { ResponsePayload } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_req: NextRequest): Promise<NextResponse> {
  try {
    const response = await StatisticService.getStatistic();
    return NextResponse.json<ResponsePayload>(response, {
      status: response.code,
    });
  } catch (error) {
    console.log("Error statistic Route at GET method:", error);
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
