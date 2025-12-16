"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import z from "zod";
import { timeAgo } from "@/helper/timeAgo";
import ReviewValidation from "@/validation/review-validation";
import { cn } from "@/lib/utils";
import Loader from "@/components/icons/Loader";
import { DataReply, DataReview, ResponsePayload } from "@/types";
import ResponseError from "@/error/ResponseError";
import toast from "react-hot-toast";
import Image from "next/image";
import { IconStarFilled, IconUserFilled } from "@tabler/icons-react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TotalReview } from "./TableCellViewer";

interface ReviewSectionProps {
  review: DataReview & { isActive: boolean };
  setDataReview: React.Dispatch<React.SetStateAction<TotalReview | undefined>>;
}

export default function ReviewSection(props: ReviewSectionProps) {
  const { review, setDataReview } = props;
  const [reply, setReply] = useState<string>("");
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  async function sendReplyReview(review_id: string) {
    setLoading(true);
    try {
      const data: z.infer<typeof ReviewValidation.CREATEREPLYREVIEW> = {
        reply: reply.trim(),
        review_id,
        user_id: session?.user.id || "",
      };

      const res = await fetch("/api/review/reply", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        method: "POST",
      });

      const dataRes = (await res.json()) as ResponsePayload<DataReply>;
      if (dataRes.status === "failed") {
        throw new ResponseError(dataRes.code, dataRes.message);
      }

      console.log(dataRes.data);

      toast.success(dataRes.message);
      setDataReview((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          dataReview: prev.dataReview.map((dr) => {
            if (dr.id !== review_id) return dr;

            return {
              ...dr,
              reply: {
                ...dataRes.data,
              },
            };
          }),
        };
      });
    } catch (error) {
      if (error instanceof ResponseError) {
        toast.error(error.message);
      } else {
        toast.error("An error occured! Please try again later");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-y-2 mb-8">
      <div className="space-y-2">
        <div className="flex items-center gap-x-2">
          {review.imageUrl ? (
            <Image
              src={review.imageUrl}
              alt={"Profile Image " + review.name}
              width={30}
              height={30}
              className="object-cover rounded-full aspect-square"
            />
          ) : (
            <div className="aspect-square rounded-full shadow-md bg-orange-100 w-10 h-10 flex items-center justify-center">
              <IconUserFilled className="text-orange-800" size={20} />
            </div>
          )}
          <span>{review.name}</span>
        </div>
        <span className="flex items-center text-gray-300 font-semibold text-sm gap-x-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <IconStarFilled
              size={18}
              key={i}
              className={cn("text-gray-300", {
                "text-yellow-500": i + 1 <= review.rating,
              })}
            />
          ))}
          {timeAgo(review.createdAt)}
        </span>
        <p className="text-sm font-light">{review.comment}</p>
      </div>
      <div className="space-y-2">
        <button
          onClick={() =>
            setDataReview((prev) => {
              if (!prev) return prev;
              if (review.reply) {
                return {
                  ...prev,
                  dataReview: prev.dataReview.map((p) => ({
                    ...p,
                    isActive: p.id === review.id && !p.isActive,
                  })),
                };
              }
              return {
                ...prev,
                dataReview: prev.dataReview.map((p) => ({
                  ...p,
                  isActive: p.id === review.id,
                })),
              };
            })
          }
          className="text-blue-500 hover:bg-white/10 px-2 py-1 rounded-md cursor-pointer"
        >
          {review.reply ? (
            <div className="flex gap-x-2 items-center">
              {review.isActive ? (
                <ChevronUp size={19} />
              ) : (
                <ChevronDown size={19} />
              )}
              Show reply
            </div>
          ) : (
            "Reply"
          )}
        </button>
        {review.isActive &&
          (review.reply ? (
            <div className="space-y-2 ps-6">
              <div className="flex items-center gap-x-2">
                {review.reply.image_reply ? (
                  <Image
                    src={review.reply.image_reply}
                    alt={"Profile Image " + review.reply.username}
                    width={30}
                    height={30}
                    className="object-cover rounded-full aspect-square"
                  />
                ) : (
                  <div className="aspect-square rounded-full shadow-md bg-orange-100 w-10 h-10 flex items-center justify-center">
                    <IconUserFilled className="text-orange-800" size={20} />
                  </div>
                )}
                <span>{review.reply.username}</span>
                <span className="text-sm font-semibold text-gray-400">
                  {timeAgo(review.reply.created_at)}
                </span>
              </div>
              <span className="flex items-center text-gray-300 font-semibold text-sm gap-x-2"></span>
              <p className="text-sm font-light">{review.reply.comment}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-y-3 px-2">
              <input
                type="text"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                onKeyUp={(e) =>
                  e.key.toLowerCase() === "enter" && sendReplyReview(review.id)
                }
                placeholder="Type your reply..."
                className="w-full border-b placeholder:text-sm border-gray-500 bg-transparent outline-none pb-2 focus:outline-none"
              />
              <div className="flex items-center w-full justify-between">
                <button
                  disabled={loading}
                  onClick={() =>
                    setDataReview((prev) => {
                      if (!prev) return prev;

                      return {
                        ...prev,
                        dataReview: prev.dataReview.map((p) => ({
                          ...p,
                          isActive: false,
                        })),
                      };
                    })
                  }
                  className="cursor-pointer"
                >
                  Cancel
                </button>
                <Button
                  disabled={loading}
                  onClick={() => sendReplyReview(review.id)}
                  size={"sm"}
                  className="cursor-pointer w-[4rem]"
                >
                  {loading ? <Loader /> : "Send"}
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
