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
}
