import ResponseError from "@/error/ResponseError";
import getMostPurchasedCategory from "@/helper/getMostPurchasedCategory";
import Bcrypt from "@/lib/bcrypt";
import { prisma } from "@/lib/prisma";
import {
  DataUser,
  DataUserTable,
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
        image: data.image,
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

  static async getUser(
    id: string,
    getParams: string | null
  ): Promise<ResponsePayload> {
    if (getParams && getParams === "*") {
      return await this.getUsers(id);
    }

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

    const data: DataUser = {
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
      image: userData.image || "",
    };

    return {
      status: "success",
      code: 200,
      data,
      message: "Successfully get data user!",
    };
  }

  static async getUsers(userId: string): Promise<ResponsePayload> {
    const isAdmin = await prisma.user.findUnique({ where: { id: userId } });
    if (!isAdmin) {
      throw new ResponseError(404, "Oops! User is not found");
    }

    if (isAdmin.role === "USER") {
      throw new ResponseError(
        403,
        "Oops! Yout don't have any access for this service!"
      );
    }

    const users = await prisma.user.findMany({
      where: {
        Order: {
          some: {
            Detail_Order: {
              some: {
                status: "COMPLETED",
              },
            },
          },
        },
      },
      include: {
        userDetail: true,
        Order: {
          include: {
            Detail_Order: {
              include: {
                product: {
                  include: {
                    category: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const allOrders = users.flatMap((u) => u.Order || []);
    const bestSeller =
      allOrders.length > 0 ? getMostPurchasedCategory(allOrders) : "JUICE";

    const data: DataUserTable[] = users
      .map((user) => ({
        address: user.userDetail?.address || "",
        city: user.userDetail?.city || "",
        email: user.email || "",
        id: user.id,
        image: user.image || "",
        name: user.name || "",
        phoneNumber: user.userDetail?.phoneNumber || "",
        postalCode: user.userDetail?.postalCode || "",
        province: user.userDetail?.province || "",
        username: user.username || "",
        lastPurchaseDate: user.Order.sort(
          (a, b) => b.created_at.getTime() - a.created_at.getTime()
        )[0].created_at,
        totalOrders: user.Order.reduce((sum, order) => {
          const completedDetails = order.Detail_Order.filter(
            (d) => d.status === "COMPLETED"
          );
          return sum + completedDetails.length;
        }, 0),
        totalSpending: user.Order.reduce((sum, order) => {
          const completedDetails = order.Detail_Order.filter(
            (d) => d.status === "COMPLETED"
          );
          const totalItems = completedDetails.reduce(
            (s, d) => s + d.total_price,
            0
          );
          return sum + totalItems;
        }, 0),
        gender: user.userDetail?.gender || "UNKNOWN",
        bestSeller,
      }))
      .sort((a, b) => b.totalSpending - a.totalSpending);
    return {
      code: 200,
      data,
      message: "Successfully get data users!",
      status: "success",
    };
  }
}
