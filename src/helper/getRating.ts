import { Review, User } from "../../generated/prisma";

interface Reviews extends Review {
  user: User;
}

export function getRating(reviews: Reviews[]) {
  const stars = [0, 0, 0, 0, 0];

  reviews.forEach((r) => {
    if (r.rating >= 1 && r.rating <= 5) {
      stars[r.rating - 1]++;
    }
  });

  return stars;
}
