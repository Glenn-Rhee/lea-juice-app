"use client";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useReviews } from "@/lib/review-queries";
import { IconStarFilled } from "@tabler/icons-react";

interface SummaryReviewCardProps {
  product_id: string;
}

export default function SummaryReviewCard(props: SummaryReviewCardProps) {
  const { product_id } = props;
  const { data, isLoading } = useReviews(product_id);
  const totalBuyer = data
    ? data.totalRating.stars.reduce((sum, n) => sum + n, 0)
    : 0;

  return (
    <section className="max-w-6xl w-full mx-auto space-y-4 my-8 px-4 mb-8">
      <h4 className="text-stone-900 font-semibold text-2xl">Buyer reviews</h4>
      {isLoading ? (
        <Skeleton className="bg-gray-300 rounded-sm h-24 w-full" />
      ) : (
        data && (
          <div className="bg-gradient-to-b from-white flex justify-around via-orange-50 to-orange-100 border border-gray-300 rounded-sm py-3 md:py-5 px-4 md:px-8">
            <div className="space-y-3 w-full">
              <div className="flex items-end gap-x-3 text-stone-900 font-semibold text-xl">
                <IconStarFilled className="text-yellow-500" />
                <span>
                  {data.totalRating.avgRating}
                  <sub>/5.0</sub>
                </span>
              </div>
              <span className="text-stone-900">
                {data.satisfiedTotal}% of buyers are satisfied
              </span>
            </div>
            <div className="flex flex-col md:flex-row gap-y-2 md:gap-y-0">
              <div className="flex flex-col w-full gap-y-2">
                <div className="flex text-xs font-medium text-gray-600 items-center gap-x-1">
                  <IconStarFilled size={14} className="text-yellow-500" />
                  <span>5</span>
                  <Progress
                    className="w-[10rem] md:w-[15rem]"
                    value={(data.totalRating.stars[4] / totalBuyer) * 100}
                  />
                  <span>({data.totalRating.stars[4]})</span>
                </div>
                <div className="flex text-xs font-medium text-gray-600 items-center gap-x-1">
                  <IconStarFilled size={14} className="text-yellow-500" />
                  <span>4</span>
                  <Progress
                    className="w-[10rem] md:w-[15rem]"
                    value={(data.totalRating.stars[3] / totalBuyer) * 100}
                  />
                  <span>({data.totalRating.stars[3]})</span>
                </div>
                <div className="flex text-xs font-medium text-gray-600 items-center gap-x-1">
                  <IconStarFilled size={14} className="text-yellow-500" />
                  <span>3</span>
                  <Progress
                    className="w-[10rem] md:w-[15rem]"
                    value={(data.totalRating.stars[2] / totalBuyer) * 100}
                  />
                  <span>({data.totalRating.stars[2]})</span>
                </div>
              </div>
              <div className="flex flex-col w-full gap-y-2">
                <div className="flex text-xs font-medium text-gray-600 items-center gap-x-1">
                  <IconStarFilled size={14} className="text-yellow-500" />
                  <span>2</span>
                  <Progress
                    className="w-[10rem] md:w-[15rem]"
                    value={(data.totalRating.stars[1] / totalBuyer) * 100}
                  />
                  <span>({data.totalRating.stars[1]})</span>
                </div>
                <div className="flex text-xs font-medium text-gray-600 items-center gap-x-1">
                  <IconStarFilled size={14} className="text-yellow-500" />
                  <span>1</span>
                  <Progress
                    className="w-[10rem] md:w-[15rem]"
                    value={(data.totalRating.stars[0] / totalBuyer) * 100}
                  />
                  <span>({data.totalRating.stars[0]})</span>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </section>
  );
}
