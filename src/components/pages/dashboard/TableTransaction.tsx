"use client";
import { useEffect, useState } from "react";
import { ResponsePayload, TransactionDashboard } from "@/types";
import ResponseError from "@/error/ResponseError";
import toast from "react-hot-toast";
import { DataTable } from "@/components/data-table";
import { columnsTransaction } from "./ColumnsTransaction";

export default function TableTransaction() {
  const [transactions, setTransaction] = useState<TransactionDashboard[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/transaction", { credentials: "include" });
        const data = (await res.json()) as ResponsePayload<
          TransactionDashboard[]
        >;
        if (data.status === "failed") {
          throw new ResponseError(data.code, data.message);
        }

        setTransaction(data.data);
      } catch (error) {
        toast.dismiss();
        if (error instanceof ResponseError) {
          toast.error(error.message);
        } else {
          toast.error("An error occured! Please try again later!");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <DataTable
      columns={columnsTransaction}
      loading={loading}
      data={transactions.slice(0, 5)}
    />
  );
}
