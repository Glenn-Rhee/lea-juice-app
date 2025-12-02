"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { timeAgo } from "@/helper/timeAgo";
import { useComment } from "@/lib/review-mutation";
import { useReviews } from "@/lib/review-queries";
import { cn } from "@/lib/utils";
import { DataReview } from "@/types";
import { IconStarFilled, IconUserFilled } from "@tabler/icons-react";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CommentSectionProps {
  product_id: string;
  token: RequestCookie | undefined;
  imageUser: string | null;
}
export default function CommentSection(props: CommentSectionProps) {
  const { product_id, token, imageUser } = props;
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const { data, isLoading } = useReviews(product_id);
  const commentUser = useComment();
  const [reviews, setReviews] = useState<DataReview[]>([]);
  const [filter, setFilter] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  useEffect(() => {
    if (data) {
      setReviews(data.dataReview);
    }
  }, [data]);

  useEffect(() => {
    const activeFilters = Object.entries(filter)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, isActive]) => isActive)
      .map(([rating]) => Number(rating));

    if (activeFilters.length === 0) {
      setReviews(data ? data.dataReview : []);
      return;
    }

    if (data) {
      const filtered = data.dataReview.filter((r) =>
        activeFilters.includes(r.rating)
      );
      setReviews(filtered);
    }
  }, [filter, data]);

  return (
    <section className="max-w-6xl w-full mx-auto mt-8 flex gap-x-4 px-4 mb-8">
      <div className="w-full flex-1 h-fit sticky top-[6rem] bg-white border px-4 py-3 border-gray-300 rounded-sm shadow-sm">
        <h4 className="text-stone-900 font-semibold text-xl">Filter Reviews</h4>
        <Separator className="bg-stone-700/40 my-3" />
        <h4 className="text-stone-900 font-medium text-lg">Rating</h4>
        <ul className="flex flex-col gap-y-4 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i} className="flex items-center gap-x-2">
              <Checkbox
                id={(i + 1).toString()}
                onCheckedChange={(e) => {
                  setFilter((prev) => ({
                    ...prev,
                    [i + 1]: e,
                  }));
                }}
                className="border border-gray-500 w-5 h-5"
              />
              <Label
                htmlFor={(i + 1).toString()}
                className="text-gray-600 text-lg font-semibold"
              >
                <IconStarFilled className="text-yellow-500" size={20} /> {i + 1}
              </Label>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-3 w-full flex flex-col gap-y-7 ps-4">
        <div className="w-full pb-3 flex items-center gap-x-4">
          {imageUser ? (
            <Image
              src={imageUser}
              alt={`Profile image user`}
              width={40}
              height={40}
              className="aspect-square rounded-full object-cover"
            />
          ) : (
            <div className="aspect-square rounded-full shadow-md bg-orange-100 w-10 h-10 flex items-center justify-center">
              <IconUserFilled className="text-orange-800" size={20} />
            </div>
          )}
          <div className="flex flex-col gap-y-2 w-full">
            <input
              type="text"
              value={comment}
              onKeyUp={(e) =>
                e.key.toLowerCase() === "enter" &&
                commentUser.mutate({ comment, product_id, rating, token })
              }
              onChange={(e) => setComment(e.target.value)}
              className="border-b border-gray-500/40 w-full placeholder:text-stone-500 transition-colors text-stone-800 pb-2 placeholder:text-sm focus:border-b focus:outline-none focus:border-gray-600/70"
              placeholder="Add your comment..."
            />
            <div className="flex items-center w-full justify-between gap-x-2">
              <div className="flex items-center gap-x-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRating(i + 1)}
                  >
                    <IconStarFilled
                      size={18}
                      className={cn(
                        "transition-colors duration-200 cursor-pointer text-gray-500",
                        {
                          "text-gray-500": rating === 0,
                          "text-yellow-500": i + 1 <= rating,
                        }
                      )}
                    />
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-x-3">
                {(rating > 0 || comment.length > 0) && (
                  <button
                    onClick={() => {
                      setRating(0);
                      setComment("");
                    }}
                    className="bg-transparent h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-stone-800 cursor-pointer hover:bg-gray-300 "
                  >
                    Cancel
                  </button>
                )}
                <Button
                  disabled={commentUser.isPending}
                  onClick={() =>
                    commentUser.mutate({ comment, product_id, rating, token })
                  }
                  type="submit"
                  className="cursor-pointer"
                  size={"sm"}
                >
                  Comment
                </Button>
              </div>
            </div>
          </div>
        </div>
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center gap-x-2">
                <Skeleton className="aspect-square rounded-full w-10 h-10 bg-gray-300" />
                <Skeleton className="h-3 bg-gray-300 rounded-xs w-[10rem]" />
              </div>
              <Skeleton className="mt-4 bg-gray-300 w-[13rem] h-3" />
              <Skeleton className="mt-4 bg-gray-300 w-[20rem] h-3" />
            </div>
          ))
        ) : data && reviews.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <Image
              src={"/comment.png"}
              alt="Empty cart image"
              width={200}
              height={200}
            />
            <h1 className="text-2xl font-bold text-stone-900">
              Review still empty!
            </h1>
          </div>
        ) : (
          data &&
          reviews
            .sort((a, b) => b.rating - a.rating)
            .map((d, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center gap-x-2">
                  {d.imageUrl ? (
                    <Image
                      src={d.imageUrl}
                      alt={`Profile image ${d.name}`}
                      width={40}
                      height={40}
                      className="aspect-square rounded-full object-cover"
                    />
                  ) : (
                    <div className="aspect-square rounded-full shadow-md bg-orange-100 w-10 h-10 flex items-center justify-center">
                      <IconUserFilled className="text-orange-800" size={20} />
                    </div>
                  )}
                  <span className="text-stone-900 font-semibold">{d.name}</span>
                </div>
                <span className="flex items-center text-gray-600 font-semibold text-sm gap-x-2 mt-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IconStarFilled
                      size={18}
                      key={i}
                      className={cn("text-gray-500", {
                        "text-yellow-500": i + 1 <= d.rating,
                      })}
                    />
                  ))}
                  {timeAgo(d.createdAt)}
                </span>
                <p className="mt-4 text-gray-700 font-medium text-sm">
                  {d.comment}
                </p>
              </div>
            ))
        )}
      </div>
    </section>
  );
}
