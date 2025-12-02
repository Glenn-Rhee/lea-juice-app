export function getAverageRating([
  oneStars,
  twoStars,
  threeStars,
  fourStars,
  fiveStars,
]: number[]) {
  const counts = {
    1: oneStars,
    2: twoStars,
    3: threeStars,
    4: fourStars,
    5: fiveStars,
  };

  const totalReviews = Object.values(counts).reduce((a, b) => a + b, 0);
  if (totalReviews === 0) return "5.0";
  const average =
    Object.entries(counts).reduce(
      (sum, [rating, qty]) => sum + Number(rating) * qty,
      0
    ) / totalReviews;
  return average.toFixed(1);
}
