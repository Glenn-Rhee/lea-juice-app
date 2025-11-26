"use client";
import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { TransactionDashboard } from "@/types";
import { filterTransaction } from "@/helper/transaction-dashboard";
import StatsCard from "@/components/pages/dashboard/transactions/StatsCard";
import FilterTransaction from "@/components/pages/dashboard/transactions/FilterTransaction";
import { STATUSORDER } from "../../../../generated/prisma";

export default function TransactionsDashboardPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<"all" | STATUSORDER>(
    "PENDING"
  );
  const transactions: TransactionDashboard[] = [
    {
      id: 1,
      transactionId: "TRX-2024-001",
      product: "Lemon Mint Fresh",
      productType: "Juice Original",
      customerName: "Budi Santoso",
      amount: 25000,
      quantity: 2,
      date: "2024-11-19",
      status: "COMPLETED",
    },
    {
      id: 2,
      transactionId: "TRX-2024-002",
      product: "Orange Blast",
      productType: "Juice Mix",
      customerName: "Siti Aminah",
      amount: 30000,
      quantity: 1,
      date: "2024-11-19",
      status: "PENDING",
    },
    {
      id: 3,
      transactionId: "TRX-2024-003",
      product: "Apple Carrot Smoothie",
      productType: "Smoothie",
      customerName: "Andi Wijaya",
      amount: 35000,
      quantity: 3,
      date: "2024-11-18",
      status: "COMPLETED",
    },
    {
      id: 4,
      transactionId: "TRX-2024-004",
      product: "Mango Paradise",
      productType: "Juice Original",
      customerName: "Dewi Lestari",
      amount: 28000,
      quantity: 2,
      date: "2024-11-18",
      status: "CANCELLED",
    },
    {
      id: 5,
      transactionId: "TRX-2024-005",
      product: "Strawberry Delight",
      productType: "Smoothie",
      customerName: "Ahmad Rizki",
      amount: 32000,
      quantity: 1,
      date: "2024-11-17",
      status: "COMPLETED",
    },
    {
      id: 6,
      transactionId: "TRX-2024-006",
      product: "Green Detox",
      productType: "Juice Mix",
      customerName: "Linda Wijaya",
      amount: 40000,
      quantity: 2,
      date: "2024-11-17",
      status: "PENDING",
    },
  ];

  const filteredTransactions = filterTransaction(
    transactions,
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
          <DataTable data={filteredTransactions} />
        </div>
      </div>
    </div>
  );
}
