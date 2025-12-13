export function getDateRange(
  range: "7d" | "30d" | "90d" | "today" | "yesterday"
) {
  const now = new Date();

  if (range === "today") {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    return { gte: start, lte: now };
  }

  if (range === "yesterday") {
    const startYesterday = new Date();
    startYesterday.setDate(startYesterday.getDate() - 1);
    startYesterday.setHours(0, 0, 0, 0);

    const endYesterday = new Date();
    endYesterday.setDate(endYesterday.getDate() - 1);
    endYesterday.setHours(23, 59, 59, 999);

    return { gte: startYesterday, lte: endYesterday };
  }

  const start = new Date();

  if (range === "7d") start.setDate(now.getDate() - 7);
  if (range === "30d") start.setDate(now.getDate() - 30);
  if (range === "90d") start.setDate(now.getMonth() - 3);

  return { gte: start, lte: now };
}
