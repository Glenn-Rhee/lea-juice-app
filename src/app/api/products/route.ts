import ResponseError from "@/error/ResponseError";
import ProductService from "@/service/product-service";
import { ResponsePayload } from "@/types";
import ProductValidation from "@/validation/product-validation";
import Validation from "@/validation/validation";
import { NextRequest, NextResponse } from "next/server";
import z, { ZodError } from "zod";
import { UTApi } from "uploadthing/server";
import { CATEGORY } from "../../../../generated/prisma";
import { getToken } from "next-auth/jwt";

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
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const query = req.nextUrl.searchParams;
    const category = query.get("c") as CATEGORY | null;
    if (category) {
      const CATEGORIES = ["JUICE", "FRUIT", "SALAD"] as const;
      if (!CATEGORIES.includes(category)) {
        throw new ResponseError(400, "Invalid category!");
      }
    }

    const best = query.get("best");
    const response =
      best && best == "true"
        ? await ProductService.getProductBestSeller()
        : await ProductService.getProduct(
            query,
            token ? token.id : null,
            token
          );
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

export async function PATCH(req: NextRequest): Promise<NextResponse> {
  const dataJSON = await req.text();
  const data = (await JSON.parse(dataJSON)) as z.infer<
    typeof ProductValidation.PRODUCT
  >;
  try {
    const query = req.nextUrl.searchParams;
    const id = query.get("id");
    if (!id) {
      throw new ResponseError(402, "Id product is required!");
    }
    const dataValidated = Validation.validate(ProductValidation.PRODUCT, data);

    const response = await ProductService.updateProduct(dataValidated, id);
    return NextResponse.json<ResponsePayload>(response);
  } catch (error) {
    console.log("Error product Route at PATCH method:", error);
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
    const id = query.get("id");
    if (!id) {
      throw new ResponseError(402, "Bad Request! Id product is required!");
    }

    const response = await ProductService.deleteProduct(id);
    return NextResponse.json<ResponsePayload>(response);
  } catch (error) {
    console.log("Error product Route at DELETE method:", error);
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
