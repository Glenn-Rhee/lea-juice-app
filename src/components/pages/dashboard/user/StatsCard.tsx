import { DataUserTable } from "@/types";

export default function StatsCard({ data }: { data: DataUserTable[] }) {
  const totalRevenue = data.reduce((sum, item) => sum + item.totalSpending, 0);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition">
        <p className="text-sm text-muted-foreground mb-2">Total Users</p>
        <p className="text-3xl font-bold">{data.length}</p>
        <p className="text-xs text-muted-foreground mt-1">
          The total of all users who have purchased.
        </p>
      </div>
      <div className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition">
        <p className="text-sm text-muted-foreground mb-2">Total Revenue</p>
        <p className="text-3xl font-bold">
          Rp {totalRevenue.toLocaleString("id-ID")}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Accumulated revenue from all transactions.
        </p>
      </div>
      <div className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition">
        <p className="text-sm text-muted-foreground mb-2">
          Best Selling Product
        </p>
        <p className="text-3xl font-bold">
          {data.length === 0 ? "-" : data[0].bestSeller}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          The product with the most sales.
        </p>
      </div>
    </div>
  );
}
