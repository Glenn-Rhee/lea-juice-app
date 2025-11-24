import { Cart, ResponsePayload } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useCartItems() {
  return useQuery({
    queryKey: ["cart-items"],
    queryFn: async () => {
      const res = await fetch("/api/cart", { credentials: "include" });
      const json = (await res.json()) as ResponsePayload<Cart[]>;
      return json.data;
    },
  });
}
