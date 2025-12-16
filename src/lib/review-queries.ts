import ResponseError from "@/error/ResponseError";
import { ResponsePayload, TotalReview } from "@/types";
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
        const data = (await res.json()) as ResponsePayload<TotalReview>;
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

export function useGetReviewReply(product_id: string) {
  return useQuery({
    queryKey: ["review", product_id],
    enabled: false,
    queryFn: async () => {
      try {
        const res = await fetch("/api/review?product_id=" + product_id);
        const dataRes = (await res.json()) as ResponsePayload<TotalReview>;
        if (dataRes.status === "failed") {
          throw new ResponseError(dataRes.code, dataRes.message);
        }
        const dataReviewUser = dataRes.data.dataReview.map((d) => ({
          ...d,
          isActive: false,
        }));

        console.log(dataRes.data);

        return {
          dataReview: dataReviewUser,
          satisfiedTotal: dataRes.data.satisfiedTotal,
          totalRating: dataRes.data.totalRating,
        };
      } catch (error) {
        if (error instanceof ResponseError) {
          toast.error(error.message);
        } else {
          toast.error("An error occured while get review product!");
        }
      }
    },
    staleTime: 5 * 60 * 1000,
  });
}
