import ResponseError from "@/error/ResponseError";
import ProductService from "@/service/product-service";
import { ResponsePayload } from "@/types";
import ProductValidation from "@/validation/product-validation";
import Validation from "@/validation/validation";
import { NextRequest, NextResponse } from "next/server";
import z, { ZodError } from "zod";
import { UTApi } from "uploadthing/server";

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
    const response = await ProductService.getProduct();
    return NextResponse.json<ResponsePayload>(response)
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
