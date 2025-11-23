"use client";
import { useState, useEffect } from "react";
import { Search, ChevronDown, Download, Filter } from "lucide-react";
import { DataTable } from "@/components/data-table";

interface Transaction {
  id: number;
  transactionId: string;
  product: string;
  productType: string;
  customerName: string;
  amount: number;
  quantity: number;
  date: string;
  status: "completed" | "pending" | "cancelled";
}

export default function TransactionsDashboardPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<
    "all" | "completed" | "pending" | "cancelled"
  >("all");
  const [showStatusMenu, setShowStatusMenu] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Load data dari JSON file
  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch("/api/transactions");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error loading data:", error);
        // Fallback ke mock data jika fetch gagal
        setTransactions([
          {
            id: 1,
            transactionId: "TRX-2024-001",
            product: "Lemon Mint Fresh",
            productType: "Juice Original",
            customerName: "Budi Santoso",
            amount: 25000,
            quantity: 2,
            date: "2024-11-19",
            status: "completed",
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
            status: "pending",
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
            status: "completed",
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
            status: "cancelled",
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
            status: "completed",
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
            status: "pending",
          },
        ]);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Filter berdasarkan search dan status
  const filteredTransactions = transactions.filter((trx: Transaction) => {
    const matchesSearch =
      trx.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trx.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trx.product.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" || trx.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  // Hitung statistik dari data yang sudah difilter
  const totalAmount = filteredTransactions.reduce(
    (sum, trx) => sum + trx.amount,
    0
  );
  const completedCount = filteredTransactions.filter(
    (trx) => trx.status === "completed"
  ).length;

  // Export to Excel dengan formatting
  const handleExport = async () => {
    // Dynamically import xlsx
    const XLSX = await import("xlsx");

    // Prepare data for export
    const exportData = filteredTransactions.map((trx, index) => ({
      No: index + 1,
      "Transaction ID": trx.transactionId,
      Product: trx.product,
      "Jenis Product": trx.productType,
      "Nama Pembeli": trx.customerName,
      Quantity: trx.quantity,
      Amount: trx.amount,
      Date: new Date(trx.date).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      Status: trx.status.charAt(0).toUpperCase() + trx.status.slice(1),
    }));

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);

    // Set column widths
    const colWidths = [
      { wch: 5 }, // No
      { wch: 15 }, // Transaction ID
      { wch: 25 }, // Product
      { wch: 15 }, // Jenis Product
      { wch: 20 }, // Nama Pembeli
      { wch: 10 }, // Quantity
      { wch: 15 }, // Amount
      { wch: 18 }, // Date
      { wch: 12 }, // Status
    ];
    ws["!cols"] = colWidths;

    // Style header row (row 1)
    const range = XLSX.utils.decode_range(ws["!ref"] || "A1");
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const address = XLSX.utils.encode_col(C) + "1";
      if (!ws[address]) continue;
      ws[address].s = {
        font: { bold: true, color: { rgb: "FFFFFF" }, sz: 12 },
        fill: { fgColor: { rgb: "4472C4" } },
        alignment: { horizontal: "center", vertical: "center" },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      };
    }

    // Format Amount column as currency
    for (let R = range.s.r + 1; R <= range.e.r; ++R) {
      // Format Amount (column G/index 6)
      const amountCell = ws[XLSX.utils.encode_cell({ r: R, c: 6 })];
      if (amountCell && typeof amountCell.v === "number") {
        amountCell.z = "Rp #,##0";
      }

      // Add borders to all cells
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
        if (!ws[cellAddress]) continue;
        ws[cellAddress].s = {
          ...ws[cellAddress].s,
          border: {
            top: { style: "thin", color: { rgb: "D3D3D3" } },
            bottom: { style: "thin", color: { rgb: "D3D3D3" } },
            left: { style: "thin", color: { rgb: "D3D3D3" } },
            right: { style: "thin", color: { rgb: "D3D3D3" } },
          },
          alignment: { vertical: "center" },
        };
      }

      // Center align for No, Quantity, Status
      const noCell = ws[XLSX.utils.encode_cell({ r: R, c: 0 })];
      const qtyCell = ws[XLSX.utils.encode_cell({ r: R, c: 5 })];
      const statusCell = ws[XLSX.utils.encode_cell({ r: R, c: 8 })];

      if (noCell)
        noCell.s = {
          ...noCell.s,
          alignment: { horizontal: "center", vertical: "center" },
        };
      if (qtyCell)
        qtyCell.s = {
          ...qtyCell.s,
          alignment: { horizontal: "center", vertical: "center" },
        };
      if (statusCell)
        statusCell.s = {
          ...statusCell.s,
          alignment: { horizontal: "center", vertical: "center" },
        };

      // Right align for Amount
      if (amountCell)
        amountCell.s = {
          ...amountCell.s,
          alignment: { horizontal: "right", vertical: "center" },
        };
    }

    // Add summary row
    const summaryRowIndex = range.e.r + 2;
    ws[XLSX.utils.encode_cell({ r: summaryRowIndex, c: 5 })] = {
      v: "TOTAL:",
      s: {
        font: { bold: true },
        alignment: { horizontal: "right", vertical: "center" },
      },
    };
    ws[XLSX.utils.encode_cell({ r: summaryRowIndex, c: 6 })] = {
      v: totalAmount,
      z: "Rp #,##0",
      s: {
        font: { bold: true, color: { rgb: "4472C4" } },
        alignment: { horizontal: "right", vertical: "center" },
        fill: { fgColor: { rgb: "E7E6E6" } },
      },
    };

    // Update range to include summary
    ws["!ref"] = XLSX.utils.encode_range({
      s: { r: 0, c: 0 },
      e: { r: summaryRowIndex, c: range.e.c },
    });

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Transactions");

    // Generate filename with current date
    const filename = `Transactions_${
      new Date().toISOString().split("T")[0]
    }.xlsx`;

    // Save file
    XLSX.writeFile(wb, filename);
  };

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

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading data...</p>
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition">
                  <p className="text-sm text-muted-foreground mb-2">
                    Total Transaksi
                  </p>
                  <p className="text-3xl font-bold">
                    {filteredTransactions.length}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    dari {transactions.length} total
                  </p>
                </div>
                <div className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition">
                  <p className="text-sm text-muted-foreground mb-2">
                    Total Nilai
                  </p>
                  <p className="text-3xl font-bold">
                    Rp {totalAmount.toLocaleString("id-ID")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    nilai transaksi
                  </p>
                </div>
                <div className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition">
                  <p className="text-sm text-muted-foreground mb-2">
                    Transaksi Selesai
                  </p>
                  <p className="text-3xl font-bold">{completedCount}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {Math.round(
                      (completedCount / filteredTransactions.length) * 100
                    ) || 0}
                    % dari total
                  </p>
                </div>
              </div>

              {/* Search and Filter */}
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
                    <button
                      onClick={() => setShowStatusMenu(!showStatusMenu)}
                      className="flex items-center gap-2 px-4 py-2 border border-input rounded-lg bg-background hover:bg-accent hover:text-accent-foreground transition"
                    >
                      <Filter className="h-4 w-4" />
                      {selectedStatus === "all"
                        ? "Semua Status"
                        : selectedStatus}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {showStatusMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg z-10">
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
                            setSelectedStatus("completed");
                            setShowStatusMenu(false);
                          }}
                          className={`w-full text-left px-4 py-2 hover:bg-accent hover:text-accent-foreground border-b border-border text-sm ${
                            selectedStatus === "completed" ? "bg-accent" : ""
                          }`}
                        >
                          Completed
                        </button>
                        <button
                          onClick={() => {
                            setSelectedStatus("pending");
                            setShowStatusMenu(false);
                          }}
                          className={`w-full text-left px-4 py-2 hover:bg-accent hover:text-accent-foreground border-b border-border text-sm ${
                            selectedStatus === "pending" ? "bg-accent" : ""
                          }`}
                        >
                          Pending
                        </button>
                        <button
                          onClick={() => {
                            setSelectedStatus("cancelled");
                            setShowStatusMenu(false);
                          }}
                          className={`w-full text-left px-4 py-2 hover:bg-accent hover:text-accent-foreground text-sm rounded-b-lg ${
                            selectedStatus === "cancelled" ? "bg-accent" : ""
                          }`}
                        >
                          Cancelled
                        </button>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-4 py-2 border border-input rounded-lg bg-background hover:bg-accent hover:text-accent-foreground transition"
                  >
                    <Download className="h-4 w-4" />
                    Export
                  </button>
                </div>
              </div>

              {/* DataTable - Pass filtered data */}
              <DataTable data={filteredTransactions} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
