import z from "zod";
import { STATUSORDER } from "../../generated/prisma";

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

  static readonly PATCHORDER = z.object({
    status: z.enum(STATUSORDER),
  });
}
