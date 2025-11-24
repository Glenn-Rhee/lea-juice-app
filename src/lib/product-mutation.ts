import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateCartQuantity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      product_id,
      quantity,
    }: {
      product_id: string;
      quantity: number;
    }) => {
      const res = await fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify({ product_id, quantity }),
      });

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart-items"],
      });
    },
  });
}
