import ResponseError from "@/error/ResponseError";
import Bcrypt from "@/lib/bcrypt";
import JWT from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { RegisterUser, ResponsePayload } from "@/types";
import { cookies } from "next/headers";

export default class UserService {
  static async createUser(data: RegisterUser): Promise<ResponsePayload> {
    const cookieStore = await cookies();
    const isRegistered = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (isRegistered) {
      throw new ResponseError(402, "Email already registered!");
    }

    const passwordHashed = await Bcrypt.hashPassword(data.password);

    const createdUser = await prisma.user.create({
      data: {
        email: data.email,
        name: data.fullname,
        password: passwordHashed,
        role: data.email === "dfaleajuice@gmail.com" ? "ADMIN" : "USER",
        username: data.username,
      },
    });

    const token = JWT.generateToken({
      email: createdUser.email,
      password: createdUser.password,
    });

    cookieStore.set("lea-xxx-juice", token, {
      name: "lea-xxx-juice",
      value: token,
      httpOnly: true,
      maxAge: 60 * 60 * 3,
      secure: process.env.NODE_ENV === "production",
    });

    return {
      status: "success",
      code: 201,
      data: null,
      message: "Successfully signup!",
    };
  }
}
