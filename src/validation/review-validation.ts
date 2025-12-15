import z from "zod";

export default class ReviewValidation {
  static readonly CREATEREVIEW = z.object({
    product_id: z.string({ error: "Please fill product id!" }),
    rating: z
      .number({ error: "Please fill rating!" })
      .min(1, { error: "Minimum of rating is 1!" })
      .max(5, { error: "Maximum of rating is 5!" }),
    comment: z.string({ error: "Please fill comment properly!" }),
  });

  static readonly CREATEREPLYREVIEW = z.object({
    reply: z
      .string({ error: "Please fill reply review properly" })
      .min(1, { error: "Minimum length of review is one" }),
    review_id: z.string({ error: "Please fill review id properly!" }),
    user_id: z.string({
      error: "Oops! Id user is required! Please login first",
    }),
  });
}
