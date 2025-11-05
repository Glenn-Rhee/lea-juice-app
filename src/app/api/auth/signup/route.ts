import ResponseError from "@/error/ResponseError";
import UserService from "@/service/user-service";
import { RegisterUser, ResponsePayload } from "@/types";
import UserValidation from "@/validation/user-validation";
import Validation from "@/validation/validation";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const dataJSON = await req.text();
    const authorization = req.headers.get("Authorization");
    const token = authorization?.split(" ")[1];
    if (token !== "undefined") {
      throw new ResponseError(403, "You already registered!");
    }
    const data = JSON.parse(dataJSON) as RegisterUser;

    const dataUser = Validation.validate(UserValidation.REGISTER, data);
    const response = await UserService.createUser(dataUser);

    return NextResponse.json<ResponsePayload>(response);
  } catch (error) {
    console.log("Error Signup Route at POST method:", error);
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
