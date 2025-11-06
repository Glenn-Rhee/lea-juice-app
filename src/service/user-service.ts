import ResponseError from "@/error/ResponseError";
import Bcrypt from "@/lib/bcrypt";
import { prisma } from "@/lib/prisma";
import { RegisterUser, ResponsePayload } from "@/types";

export default class UserService {
  static async createUser(data: RegisterUser): Promise<ResponsePayload> {
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

    return {
      status: "success",
      code: 201,
      data: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
      },
      message: "Successfully signup!",
    };
  }
}
