import ResponseError from "@/error/ResponseError";
import { ResponsePayload } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
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

export function useCheckoutCart() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (total_price: number) => {
      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            total_price,
            status: "PENDING",
            payment_method: "Midtrans",
          }),
        });

        const dataJson = (await res.json()) as ResponsePayload<{ url: string }>;
        if (dataJson.status === "failed") {
          throw new ResponseError(dataJson.code, dataJson.message);
        }

        toast.success(dataJson.message);
        router.push(dataJson.data.url);
      } catch (error) {
        if (error instanceof ResponseError) {
          toast.error(error.message);
        } else {
          toast.error("An error occured while checkout!");
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart-items"],
      });
    },
  });
}
