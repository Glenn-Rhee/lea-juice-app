import { TransactionDashboard } from "@/types";

interface StatsCardProps {
  filteredTransactions: TransactionDashboard[];
  transactions: TransactionDashboard[];
  totalAmount: number;
}

export default function StatsCard(props: StatsCardProps) {
  const { filteredTransactions, transactions, totalAmount } = props;
  const completedCount = filteredTransactions.filter(
    (trx) => trx.status === "COMPLETED"
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition">
        <p className="text-sm text-muted-foreground mb-2">Total Transaksi</p>
        <p className="text-3xl font-bold">{filteredTransactions.length}</p>
        <p className="text-xs text-muted-foreground mt-1">
          dari {transactions.length} total
        </p>
      </div>
      <div className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition">
        <p className="text-sm text-muted-foreground mb-2">Total Nilai</p>
        <p className="text-3xl font-bold">
          Rp {totalAmount.toLocaleString("id-ID")}
        </p>
        <p className="text-xs text-muted-foreground mt-1">nilai transaksi</p>
      </div>
      <div className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition">
        <p className="text-sm text-muted-foreground mb-2">Transaksi Selesai</p>
        <p className="text-3xl font-bold">{completedCount}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {Math.round((completedCount / filteredTransactions.length) * 100) ||
            0}
          % dari total
        </p>
      </div>
    </div>
  );
}
