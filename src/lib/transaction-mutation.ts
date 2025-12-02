import { useMutation, useQueryClient } from "@tanstack/react-query";
import { STATUSORDER } from "../../generated/prisma";
import { ResponsePayload } from "@/types";
import ResponseError from "@/error/ResponseError";
import toast from "react-hot-toast";

export function useUpdateStatusTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: STATUSORDER }) => {
      try {
        const res = await fetch("/api/checkout?id=" + id, {
          method: "PATCH",
          credentials: "include",
          body: JSON.stringify({ status }),
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
          toast.error("An error occured while update status!");
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transaction"],
      });
    },
  });
}
