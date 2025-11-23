import ResponseError from "@/error/ResponseError";
import { prisma } from "@/lib/prisma";
import { ResponsePayload } from "@/types";
import ProductValidation from "@/validation/product-validation";
import z from "zod";
import { CATEGORY } from "../../generated/prisma";

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

  static async getProduct(query: URLSearchParams): Promise<ResponsePayload> {
    const q = query.get("q");
    const category = query.get("c") as CATEGORY | null;
    let products = await prisma.product.findMany({
      include: {
        category: true,
      },
    });

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
        },
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
          },
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
        },
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
          },
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
        },
      });
    }

    return {
      code: 200,
      data: products,
      message: "Successfully get products!",
      status: "success",
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
}
