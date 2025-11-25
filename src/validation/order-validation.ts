import z from "zod";

export default class OrderValidation {
  static readonly CREATEORDER = z.object({
    total_price: z
      .number({ error: "Please fill total price properly" })
      .min(1000, { error: "Minimum of total price is Rp1.000" }),
    status: z.enum([
      "PENDING",
      "SHIPPED",
      "COMPLETED",
      "CANCELLED",
      "PROCESSING",
    ]),
    payment_method: z.string({ error: "Please fill payment method properly!" }),
  });
}
