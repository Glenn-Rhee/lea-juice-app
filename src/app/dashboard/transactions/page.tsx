"use client";
import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { filterTransaction } from "@/helper/transaction-dashboard";
import StatsCard from "@/components/pages/dashboard/transactions/StatsCard";
import FilterTransaction from "@/components/pages/dashboard/transactions/FilterTransaction";
import { STATUSORDER } from "../../../../generated/prisma";
import { columnsTransaction } from "@/components/pages/dashboard/transactions/columns";
import { useTransactions } from "@/lib/transaction-queries";

export default function TransactionsDashboardPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<"all" | STATUSORDER>(
    "all"
  );

  const { data: transactions, isLoading } = useTransactions();
  const filteredTransactions = filterTransaction(
    transactions || [],
    searchTerm,
    selectedStatus
  );

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
            transactions={transactions || []}
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
          <DataTable
            columns={columnsTransaction}
            loading={isLoading}
            data={filteredTransactions}
          />
        </div>
      </div>
    </div>
  );
}
