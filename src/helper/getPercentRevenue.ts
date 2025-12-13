export function getPercentRevenue(
  totalToday: number,
  totalYesterday: number
): {
  percent: number;
  type: "stable" | "increase" | "decrease";
} {
  if (totalYesterday === 0 && totalToday === 0) {
    return {
      percent: 0,
      type: "stable",
    };
  }

  if (totalYesterday === 0 && totalToday > 0) {
    return {
      percent: 100,
      type: "increase",
    };
  }

  if (totalYesterday > 0 && totalToday === 0) {
    return {
      percent: 100,
      type: "decrease",
    };
  }

  const diff = totalToday - totalYesterday;
  const percent = Math.abs((diff / totalYesterday) * 100);

  return {
    percent: percent,
    type: diff > 0 ? "increase" : diff < 0 ? "decrease" : "stable",
  };
}
