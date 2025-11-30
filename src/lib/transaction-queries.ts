import ResponseError from "@/error/ResponseError";
import { ResponsePayload, TransactionDashboard } from "@/types";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useTransactions() {
  return useQuery({
    queryKey: ["transaction"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/transaction", { credentials: "include" });
        const data = (await res.json()) as ResponsePayload<
          TransactionDashboard[]
        >;
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
