import ResponseError from "@/error/ResponseError";
import { prisma } from "@/lib/prisma";
import { ResponsePayload } from "@/types";
import ProductValidation from "@/validation/product-validation";
import z from "zod";

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
}

// HANDLE KETIKA IMAGE SUDAH KE UPLOAD, TAPI TERJADI KEGAGALAN KETIKA MEMASUKKAN DATA KE DATABASE
