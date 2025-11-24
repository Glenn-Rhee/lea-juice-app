import z from "zod";

export default class CartValidation {
  static readonly CREATECART = z.object({
    product_id: z.string({ error: "Please fill product id properly!" }),
    quantity: z.number({ error: "Please fill quantity of product properly" }),
  });

  static readonly UPDATECART = z.object({
    item_id: z.string({ error: "Please fill product id properly!" }),
    quantity: z.number({ error: "Please fill quantity of product properly" }),
  });
}
