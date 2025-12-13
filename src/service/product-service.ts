import ResponseError from "@/error/ResponseError";
import { prisma } from "@/lib/prisma";
import { ResponsePayload } from "@/types";
import ProductValidation from "@/validation/product-validation";
import z from "zod";
import { CATEGORY } from "../../generated/prisma";
import { UTApi } from "uploadthing/server";
import { JWT } from "next-auth/jwt";
import StatisticService from "./statistic-service";

export default class ProductService {
  static async createProduct(
    data: z.infer<typeof ProductValidation.PRODUCT>
  ): Promise<ResponsePayload> {
    const isRegistered = await prisma.product.findFirst({
      where: {
        product_name: data.product_name,
      },
    });

    if (isRegistered) {
      throw new ResponseError(401, "Product name already registered!");
    }

    const category = await prisma.category.upsert({
      where: { category_name: data.category },
      update: {},
      create: { category_name: data.category },
    });

    await prisma.product.create({
      data: {
        description: data.description,
        image_url: data.image_url || "",
        price: data.price,
        product_name: data.product_name,
        stock: data.stock,
        category_id: category.id,
      },
    });

    return {
      status: "success",
      code: 201,
      data: null,
      message: "Successfully created new product!",
    };
  }

  static async getProduct(
    query: URLSearchParams,
    user_id: string | null | undefined,
    token: JWT | null
  ): Promise<ResponsePayload> {
    const q = query.get("q");
    const category = query.get("c") as CATEGORY | null;
    const id = query.get("id");
    let products = await prisma.product.findMany({
      include: {
        category: true,
        Detail_Order: {
          select: {
            quantity: true,
          },
          where: {
            status: "COMPLETED",
          },
        },
      },
      orderBy: { product_name: "asc" },
    });
    let imageUrlUser: string | null = null;
    if (user_id) {
      const user = await prisma.user.findUnique({
        where: {
          id: user_id,
        },
      });

      if (user) {
        imageUrlUser = user.image;
      }
    }

    if (q && category) {
      products = await prisma.product.findMany({
        where: {
          product_name: {
            contains: q,
            mode: "insensitive",
          },
          category: {
            category_name: category,
          },
        },
        include: {
          category: true,
          Detail_Order: {
            select: {
              quantity: true,
            },
            where: {
              status: "COMPLETED",
            },
          },
        },
        orderBy: { product_name: "asc" },
      });

      if (products.length === 0) {
        products = await prisma.product.findMany({
          where: {
            description: {
              contains: q,
              mode: "insensitive",
            },
            category: {
              category_name: category,
            },
          },
          include: {
            category: true,
            Detail_Order: {
              select: {
                quantity: true,
              },
              where: {
                status: "COMPLETED",
              },
            },
          },
          orderBy: { product_name: "asc" },
        });
      }
    } else if (q) {
      products = await prisma.product.findMany({
        where: {
          product_name: {
            contains: q,
            mode: "insensitive",
          },
        },
        include: {
          category: true,
          Detail_Order: {
            select: {
              quantity: true,
            },
            where: {
              status: "COMPLETED",
            },
          },
        },

        orderBy: { product_name: "asc" },
      });

      if (products.length === 0) {
        products = await prisma.product.findMany({
          where: {
            description: {
              contains: q,
              mode: "insensitive",
            },
          },
          include: {
            category: true,
            Detail_Order: {
              select: {
                quantity: true,
              },
              where: {
                status: "COMPLETED",
              },
            },
          },
          orderBy: { product_name: "asc" },
        });
      }
    } else if (category) {
      products = await prisma.product.findMany({
        where: {
          category: {
            category_name: category,
          },
        },
        include: {
          category: true,
          Detail_Order: {
            select: {
              quantity: true,
            },
            where: {
              status: "COMPLETED",
            },
          },
        },
        orderBy: { product_name: "asc" },
      });
    }
    if (id) {
      const product = await prisma.product.findUnique({
        where: { id },
        include: { category: true },
      });

      if (!product) {
        throw new ResponseError(404, "Product is not found!");
      }

      return {
        code: 200,
        data: { ...product, imageUrlUser },
        message: "Successfully get product!",
        status: "success",
      };
    }

    if (token && token.role === "ADMIN") {
      products = products.map((p) => {
        const totalPurchased = p.Detail_Order.reduce(
          (acc, d) => acc + d.quantity,
          0
        );

        return {
          ...p,
          totalPurchased,
          advantage: totalPurchased * p.price,
        };
      });
    }

    return {
      code: 200,
      data: products,
      message: "Successfully get products!",
      status: "success",
    };
  }

  static async getProductBestSeller(): Promise<ResponsePayload> {
    const bestSeller = await StatisticService.getBestSeller();
    const productIds = bestSeller.map((item) => item.product_id);
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
      orderBy: {
        product_name: "asc",
      },
    });

    return {
      status: "success",
      code: 200,
      data: products,
      message: "Successfully get best seller products!",
    };
  }

  static async updateProduct(
    data: z.infer<typeof ProductValidation.PRODUCT>,
    id: string
  ): Promise<ResponsePayload> {
    const isRegistered = await prisma.product.findUnique({ where: { id } });
    if (!isRegistered) {
      throw new ResponseError(404, "Product is not found!");
    }

    const category = await prisma.category.upsert({
      where: { category_name: data.category },
      update: {},
      create: { category_name: data.category },
    });

    await prisma.product.update({
      where: { id },
      data: {
        category_id: category.id,
        description: data.description,
        image_url: data.image_url || "",
        price: data.price,
        product_name: data.product_name,
        stock: data.stock,
      },
    });

    return {
      status: "success",
      code: 201,
      data: null,
      message: "Successfully update product!",
    };
  }

  static async deleteProduct(id: string): Promise<ResponsePayload> {
    const isRegistered = await prisma.product.findUnique({ where: { id } });
    if (!isRegistered) {
      throw new ResponseError(404, "Oops product is not found!");
    }

    await prisma.product.delete({ where: { id } });
    const utapi = new UTApi();
    const fileKey = isRegistered.image_url.split("/").pop();
    await utapi.deleteFiles(fileKey!);

    return {
      status: "success",
      code: 201,
      data: null,
      message: "Sucessfully delete product!",
    };
  }
}
