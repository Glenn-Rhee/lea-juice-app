"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { handleExportExcel } from "@/helper/excel";
import { TransactionDashboard } from "@/types";
import { ChevronDown, Download, Filter, Search } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { STATUSORDER } from "../../../../../generated/prisma";

interface FilterTransactionProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  selectedStatus: "all" | STATUSORDER;
  setSelectedStatus: Dispatch<
    SetStateAction<FilterTransactionProps["selectedStatus"]>
  >;
  filteredTransactions: TransactionDashboard[];
  totalAmount: number;
}

export default function FilterTransaction(props: FilterTransactionProps) {
  const {
    searchTerm,
    setSearchTerm,
    selectedStatus,
    setSelectedStatus,
    filteredTransactions,
    totalAmount,
  } = props;
  const [showStatusMenu, setShowStatusMenu] = useState<boolean>(false);

  return (
    <div className="flex flex-col md:flex-row gap-3">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Cari ID transaksi, nama pelanggan, atau produk..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
        />
      </div>
      <div className="flex gap-2">
        <div className="relative">
          <DropdownMenu open={showStatusMenu} onOpenChange={setShowStatusMenu}>
            <DropdownMenuTrigger className="w-52" asChild>
              <button className="flex items-center gap-2 px-4 py-2 border border-input rounded-lg bg-background hover:bg-accent hover:text-accent-foreground transition">
                <Filter className="h-4 w-4" />
                {selectedStatus === "all"
                  ? "Semua Status"
                  : selectedStatus[0] + selectedStatus.slice(1).toLowerCase()}
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-52">
              <button
                onClick={() => {
                  setSelectedStatus("all");
                  setShowStatusMenu(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-accent hover:text-accent-foreground border-b border-border text-sm rounded-t-lg ${
                  selectedStatus === "all" ? "bg-accent" : ""
                }`}
              >
                Semua Status
              </button>
              <button
                onClick={() => {
                  setSelectedStatus("COMPLETED");
                  setShowStatusMenu(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-accent hover:text-accent-foreground border-b border-border text-sm ${
                  selectedStatus === "COMPLETED" ? "bg-accent" : ""
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => {
                  setSelectedStatus("PENDING");
                  setShowStatusMenu(false);
                }}
                className={`w-full text-left px-4  py-2 hover:bg-accent hover:text-accent-foreground border-b border-border text-sm ${
                  selectedStatus === "PENDING" ? "bg-accent" : ""
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => {
                  setSelectedStatus("CANCELLED");
                  setShowStatusMenu(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-accent hover:text-accent-foreground text-sm rounded-b-lg ${
                  selectedStatus === "CANCELLED" ? "bg-accent" : ""
                }`}
              >
                Cancelled
              </button>
              <button
                onClick={() => {
                  setSelectedStatus("SHIPPED");
                  setShowStatusMenu(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-accent hover:text-accent-foreground text-sm rounded-b-lg ${
                  selectedStatus === "SHIPPED" ? "bg-accent" : ""
                }`}
              >
                Shipped
              </button>
              <button
                onClick={() => {
                  setSelectedStatus("PROCESSING");
                  setShowStatusMenu(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-accent hover:text-accent-foreground text-sm rounded-b-lg ${
                  selectedStatus === "PROCESSING" ? "bg-accent" : ""
                }`}
              >
                Processing
              </button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <button
          onClick={() => handleExportExcel(filteredTransactions, totalAmount)}
          className="flex items-center gap-2 px-4 py-2 border border-input rounded-lg bg-background hover:bg-accent hover:text-accent-foreground transition"
        >
          <Download className="h-4 w-4" />
          Export
        </button>
      </div>
    </div>
  );
}
