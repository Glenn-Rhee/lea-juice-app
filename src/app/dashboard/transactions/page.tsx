"use client";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table";
import { ResponsePayload, TransactionDashboard } from "@/types";
import { filterTransaction } from "@/helper/transaction-dashboard";
import StatsCard from "@/components/pages/dashboard/transactions/StatsCard";
import FilterTransaction from "@/components/pages/dashboard/transactions/FilterTransaction";
import { STATUSORDER } from "../../../../generated/prisma";
import ResponseError from "@/error/ResponseError";
import toast from "react-hot-toast";

export default function TransactionsDashboardPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<"all" | STATUSORDER>(
    "PENDING"
  );
  const [transactions, setTransaction] = useState<TransactionDashboard[]>([]);
  const filteredTransactions = filterTransaction(
    transactions,
    searchTerm,
    selectedStatus
  );
  const [loading, setLoading] = useState<boolean>(true);

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

  const totalAmount = filteredTransactions.reduce(
    (sum, trx) => sum + trx.amount,
    0
  );

  return (
    <div className="flex flex-1 flex-col min-h-screen bg-background">
      <div className="@container/main flex flex-1 flex-col">
        <div className="flex flex-col gap-6 py-6 px-4 lg:px-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Transaksi</h1>
            <p className="text-muted-foreground">
              Kelola dan pantau semua transaksi pelanggan
            </p>
          </div>

          {/* Stats Cards */}
          <StatsCard
            filteredTransactions={filteredTransactions}
            totalAmount={totalAmount}
            transactions={transactions}
          />

          {/* Search and Filter */}
          <FilterTransaction
            filteredTransactions={filteredTransactions}
            searchTerm={searchTerm}
            selectedStatus={selectedStatus}
            setSearchTerm={setSearchTerm}
            setSelectedStatus={setSelectedStatus}
            totalAmount={totalAmount}
          />
          {/* DataTable - Pass filtered data */}
          <DataTable loading={loading} data={filteredTransactions} />
        </div>
      </div>
    </div>
  );
}
