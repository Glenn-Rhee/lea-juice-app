import z from "zod";

export default class ProductValidation {
  static readonly PRODUCT = z.object({
    product_name: z
      .string({ error: "Please fill product name properly" })
      .min(1, { error: "Minimum length product name is 1" }),
    price: z
      .number({ error: "Please fill price properly" })
      .min(1000, { error: "Minimum price is Rp 1.000" }),
    stock: z
      .number({ error: "Please fill stock properly" })
      .min(1, { error: "Minimum stock is 1" }),
    category: z.enum(["JUICE", "FRUIT", "SALAD"], {
      error: "Please fill category between of JUICE, FRUIT, SALAD",
    }),
    image_url: z.url({ error: "Please fill image url properly!" }).nullable(),
    description: z.string({ error: "Please fill description properly!" }),
  });
}
