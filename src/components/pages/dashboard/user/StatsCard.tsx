export default function StatsCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition">
        <p className="text-sm text-muted-foreground mb-2">Total Users</p>
        <p className="text-3xl font-bold">100</p>
        <p className="text-xs text-muted-foreground mt-1">
          The total of all users who have purchased.
        </p>
      </div>
      <div className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition">
        <p className="text-sm text-muted-foreground mb-2">Total Revenue</p>
        <p className="text-3xl font-bold">Rp 100.000</p>
        <p className="text-xs text-muted-foreground mt-1">
          Accumulated revenue from all transactions.
        </p>
      </div>
      <div className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition">
        <p className="text-sm text-muted-foreground mb-2">
          Best Selling Product
        </p>
        <p className="text-3xl font-bold">JUICE</p>
        <p className="text-xs text-muted-foreground mt-1">
          The product with the most sales.
        </p>
      </div>
    </div>
  );
}
