import { ResponsePayload } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateCartQuantity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      item_id,
      quantity,
    }: {
      item_id: string;
      quantity: number;
    }) => {
      const res = await fetch("/api/cart", {
        method: "PUT",
        body: JSON.stringify({ item_id, quantity }),
      });

      const dataJson = (await res.json()) as ResponsePayload;
      if (dataJson.status === "failed") {
        toast.error(dataJson.message);
      } else {
        toast.success(dataJson.message);
      }

      return dataJson;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart-items"],
      });
    },
  });
}

export function useDeleteCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (item_id: string) => {
      const res = await fetch("/api/cart?item_id=" + item_id, {
        method: "DELETE",
      });

      const dataJson = (await res.json()) as ResponsePayload;
      if (dataJson.status === "failed") {
        toast.error(dataJson.message);
      } else {
        toast.success(dataJson.message);
      }

      return dataJson;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart-items"] });
    },
  });
}

export function useCreateCart() {
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
      const dataJson = (await res.json()) as ResponsePayload;
      if (dataJson.status === "failed") {
        toast.error(dataJson.message);
      } else {
        toast.success(dataJson.message);
      }

      return dataJson;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart-items"],
      });
    },
  });
}
