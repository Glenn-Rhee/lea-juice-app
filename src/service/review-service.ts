import ResponseError from "@/error/ResponseError";
import { prisma } from "@/lib/prisma";
import { ResponsePayload } from "@/types";
import ReviewValidation from "@/validation/review-validation";
import z from "zod";

export default class ReviewService {
  static async createReview(
    data: z.infer<typeof ReviewValidation.CREATEREVIEW>,
    user_id: string
  ): Promise<ResponsePayload> {
    const user = await prisma.user.findUnique({ where: { id: user_id } });
    if (!user) {
      throw new ResponseError(404, "Oops! User is not found! Please log in");
    }

    const product = await prisma.product.findUnique({
      where: { id: data.product_id },
    });
    if (!product) {
      throw new ResponseError(
        404,
        "Oops! Product is not found or product is deleted!"
      );
    }

    await prisma.review.create({
      data: {
        comment: data.comment,
        rating: data.rating,
        product_id: data.product_id,
        user_id,
      },
    });

    return {
      status: "success",
      code: 201,
      data: null,
      message: "Successfully create comment!",
    };
  }
}
