import { GroupedRevenue, TotalRevenue } from "@/types";

export function groupOrdersByDate(orders: TotalRevenue[]) {
  const map = new Map<string, GroupedRevenue>();
  for (const order of orders) {
    const date = order.created_at.toISOString().slice(0, 10);
    if (!map.has(date)) {
      map.set(date, {
        date,
        revenue: 0,
        totalOrder: 0,
      });
    }

    const current = map.get(date)!;
    current.totalOrder += 1;
    current.revenue += order.total_price;
  }

  return Array.from(map.values()).sort((a, b) => a.date.localeCompare(b.date));
}
