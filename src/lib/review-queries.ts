import ResponseError from "@/error/ResponseError";
import { DataReview, ResponsePayload } from "@/types";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useReviews(product_id: string) {
  return useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/review?product_id=" + product_id, {
          credentials: "include",
        });
        const data = (await res.json()) as ResponsePayload<DataReview[]>;
        if (data.status === "failed") {
          throw new ResponseError(data.code, data.message);
        }

        return data.data;
      } catch (error) {
        toast.dismiss();
        if (error instanceof ResponseError) {
          toast.error(error.message);
        } else {
          toast.error("An error occured! Please try again later!");
        }
      }
    },
  });
}
