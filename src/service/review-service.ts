import ResponseError from "@/error/ResponseError";
import { getAverageRating } from "@/helper/getAverageRating";
import { getRating } from "@/helper/getRating";
import { getSatisfiedBuyes } from "@/helper/getSatisfiedBuyers";
import { prisma } from "@/lib/prisma";
import { DataReview, ResponsePayload, TotalReview } from "@/types";
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

    const isAlreadyBuy = await prisma.order.findFirst({
      where: {
        user_id,
        Detail_Order: {
          some: {
            product_id: data.product_id,
            status: "COMPLETED",
          },
        },
      },
    });

    if (!isAlreadyBuy) {
      throw new ResponseError(
        402,
        "Oops! Please buy this product first and enjoy it!"
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

  static async getReviews(product_id: string): Promise<ResponsePayload> {
    const existProduct = await prisma.product.findUnique({
      where: { id: product_id },
    });

    if (!existProduct) {
      throw new ResponseError(
        404,
        "Oops! Product is not found or already deleted!"
      );
    }

    const reviews = await prisma.review.findMany({
      where: { product_id },
      include: {
        user: true,
      },
    });

    const avgRating = getAverageRating(getRating(reviews));

    const data: DataReview[] = reviews.map((review) => ({
      comment: review.comment,
      createdAt: review.created_at,
      id: review.id,
      imageUrl: review.user.image,
      name: review.user.name,
      rating: review.rating,
    }));

    const dataReviewProduct: TotalReview = {
      dataReview: data,
      totalRating: {
        avgRating,
        stars: getRating(reviews),
      },
      satisfiedTotal: getSatisfiedBuyes(getRating(reviews)),
    };

    return {
      code: 200,
      data: dataReviewProduct,
      message: "Successfully get data reviews!",
      status: "success",
    };
  }
}
