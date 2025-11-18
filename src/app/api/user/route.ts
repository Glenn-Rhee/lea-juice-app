import ResponseError from "@/error/ResponseError";
import UserService from "@/service/user-service";
import { ImageUserEdit, PatchUser, ResponsePayload } from "@/types";
import UserValidation from "@/validation/user-validation";
import Validation from "@/validation/validation";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    const dataJSON = await req.text();
    let data = JSON.parse(dataJSON) as PatchUser;
    data = {
      ...data,
      dateOfBirth: new Date(data.dateOfBirth as unknown as string),
    };
    const dataUser = Validation.validate(UserValidation.EDIT, data);

    const response = await UserService.patchUser(dataUser);
    return NextResponse.json<ResponsePayload>(response);
  } catch (error) {
    console.log("Error user Route at PUT method:", error);
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
      throw new ResponseError(
        403,
        "Unathorized! You don't have any permission!"
      );
    }

    const response = await UserService.getUser(token.id);
    return NextResponse.json<ResponsePayload>(response);
  } catch (error) {
    console.log("Error user Route at GET method:", error);
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
  try {
    const dataJson = await req.text();
    const data = (await JSON.parse(dataJson)) as ImageUserEdit;
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.email) {
      throw new ResponseError(
        403,
        "Unathorized! You don't have any permission!"
      );
    }
    const dataImage = Validation.validate(UserValidation.EDITIMAGE, data);

    const response = await UserService.updateImage(dataImage, token.email);
    return NextResponse.json<ResponsePayload>(response);
  } catch (error) {
    console.log("Error user Route at PATCH method:", error);
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
