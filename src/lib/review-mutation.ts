import ResponseError from "@/error/ResponseError";
import { ResponsePayload, } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import toast from "react-hot-toast";

export function useComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      comment,
      product_id,
      rating,
      token,
    }: {
      comment: string;
      rating: number;
      product_id: string;
      token: RequestCookie | undefined;
    }) => {
      try {
        const res = await fetch("/api/review", {
          method: "POST",
          body: JSON.stringify({ comment, rating, product_id }),
          headers: {
            Authorization: `Bearer ${token?.value || ""}`,
          },
        });

        const dataRes = (await res.json()) as ResponsePayload;
        if (dataRes.status === "failed") {
          throw new ResponseError(dataRes.code, dataRes.message);
        }

        toast.success(dataRes.message);
        return dataRes;
      } catch (error) {
        if (error instanceof ResponseError) {
          toast.error(error.message);
        } else {
          toast.error("An error occured!");
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["review"],
      });
    },
  });
}
