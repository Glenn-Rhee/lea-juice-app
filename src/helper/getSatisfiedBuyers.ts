export function getSatisfiedBuyes(stars: number[]) {
  const totalBuyers = stars.reduce((sum, n) => sum + n, 0);
  const satisfied = stars[3] + stars[4];

  return totalBuyers === 0 ? 0 : (satisfied / totalBuyers) * 100;
}
