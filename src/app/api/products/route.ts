import ResponseError from "@/error/ResponseError";
import ProductService from "@/service/product-service";
import { ResponsePayload } from "@/types";
import ProductValidation from "@/validation/product-validation";
import Validation from "@/validation/validation";
import { NextRequest, NextResponse } from "next/server";
import z, { ZodError } from "zod";
import { UTApi } from "uploadthing/server";
import { CATEGORY } from "../../../../generated/prisma";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const dataJson = await req.text();
  const dataProduct = (await JSON.parse(dataJson)) as z.infer<
    typeof ProductValidation.PRODUCT
  >;
  try {
    const dataValidated = Validation.validate(
      ProductValidation.PRODUCT,
      dataProduct
    );

    const response = await ProductService.createProduct(dataValidated);
    return NextResponse.json<ResponsePayload>(response);
  } catch (error) {
    console.log("Error product Route at POST method:", error);
    const utApi = new UTApi();
    const fileKey = dataProduct.image_url!.split("/").pop();
    await utApi.deleteFiles(fileKey!);
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
    const query = req.nextUrl.searchParams;
    const category = query.get("c") as CATEGORY | null;
    if (category) {
      const CATEGORIES = ["JUICE", "FRUIT", "SALAD"] as const;
      if (!CATEGORIES.includes(category)) {
        throw new ResponseError(400, "Invalid category!");
      }
    }
    const response = await ProductService.getProduct(query);
    return NextResponse.json<ResponsePayload>(response);
  } catch (error) {
    console.log("Error product Route at POST method:", error);
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
