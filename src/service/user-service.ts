import ResponseError from "@/error/ResponseError";
import Bcrypt from "@/lib/bcrypt";
import { prisma } from "@/lib/prisma";
import {
  ImageUserEdit,
  PatchUser,
  RegisterUser,
  ResponsePayload,
} from "@/types";

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

    await prisma.userDetail.create({
      data: {
        userId: createdUser.id,
        address: "",
        phoneNumber: "",
        bio: "",
        city: "",
        gender: "UNKNOWN",
        postalCode: "",
        province: "",
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

  static async patchUser(data: PatchUser): Promise<ResponsePayload> {
    const isRegistered = await prisma.user.findFirst({
      where: { email: data.email },
    });

    if (!isRegistered)
      throw new ResponseError(
        404,
        "Email is not found! Check your form data properly!"
      );

    const user = await prisma.user.update({
      where: { email: data.email },
      data: {
        name: data.fullname,
        username: data.username,
      },
    });

    await prisma.userDetail.update({
      where: { userId: user.id },
      data: {
        address: data.address,
        phoneNumber: data.phoneNumber,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        bio: data.bio,
        city: data.city,
        province: data.province,
        postalCode: data.postalCode,
      },
    });

    return {
      status: "success",
      code: 201,
      data: null,
      message: "Successfully edit user data!",
    };
  }

  static async getUser(id: string): Promise<ResponsePayload> {
    const userData = await prisma.user.findFirst({
      where: { id },
    });

    if (!userData) {
      throw new ResponseError(404, "Oops user not found! Invalid token!");
    }

    const userDetail = await prisma.userDetail.findFirst({
      where: { userId: userData.id },
    });

    if (!userDetail) {
      throw new ResponseError(404, "Oops user not found! Invalid token!");
    }

    const data: PatchUser = {
      address: userDetail.address || "",
      city: userDetail.city || "",
      dateOfBirth: userDetail.dateOfBirth || null,
      email: userData.email || "",
      fullname: userData.name || "",
      gender: userDetail.gender,
      phoneNumber: userDetail.phoneNumber || "",
      postalCode: userDetail.postalCode || "",
      province: userDetail.province || "",
      username: userData.username || "",
      bio: userDetail.bio || "",
    };

    return {
      status: "success",
      code: 200,
      data,
      message: "Successfully get data user!",
    };
  }

  static async updateImage(
    data: ImageUserEdit,
    email: string
  ): Promise<ResponsePayload> {
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new ResponseError(404, "Oops! Email is not registered!");
    }

    await prisma.user.update({ where: { email }, data: { image: data.image } });

    return {
      code: 201,
      data: null,
      message: "Successfully upload file!",
      status: "success",
    };
  }
}
