"use client";
import Loader from "@/components/icons/Loader";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ResponseError from "@/error/ResponseError";
import { timeAgo } from "@/helper/timeAgo";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { DataProduct, DataReview, ResponsePayload, TotalRating } from "@/types";
import ReviewValidation from "@/validation/review-validation";
import { IconStarFilled, IconUserFilled } from "@tabler/icons-react";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import z from "zod";

interface TotalReview {
  totalRating: TotalRating;
  dataReview: (DataReview & { isActive: boolean })[];
  satisfiedTotal: number;
}

export default function TableCellViewer({
  item,
  isForAction,
}: {
  item: DataProduct;
  isForAction?: boolean;
}) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState<boolean>(false);
  const [dataReview, setDataReview] = useState<TotalReview>();
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState<string>("");
  const { data: session } = useSession();
  async function getReview() {
    setLoading(true);
    try {
      const res = await fetch("/api/review?product_id=" + item.id);
      const dataRes = (await res.json()) as ResponsePayload<TotalReview>;
      if (dataRes.status === "failed") {
        throw new ResponseError(dataRes.code, dataRes.message);
      }
      const dataReviewUser = dataRes.data.dataReview.map((d) => ({
        ...d,
        isActive: false,
      }));
      setDataReview({
        dataReview: dataReviewUser,
        satisfiedTotal: dataRes.data.satisfiedTotal,
        totalRating: dataRes.data.totalRating,
      });
      setOpen(true);
    } catch (error) {
      if (error instanceof ResponseError) {
        toast.error(error.message);
      } else {
        toast.error("An error occured while get review product!");
      }
    } finally {
      setLoading(false);
    }
  }

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

      const dataRes = (await res.json()) as ResponsePayload;
      if (dataRes.status === "failed") {
        throw new ResponseError(dataRes.code, dataRes.message);
      }

      toast.success(dataRes.message);
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
    <Drawer
      open={open}
      onOpenChange={setOpen}
      direction={isMobile ? "bottom" : "right"}
    >
      <DrawerTrigger
        asChild
        disabled={loading}
        onClick={(e) => {
          e.preventDefault();
          getReview();
        }}
        className="text-white cursor-pointer hover:underline"
      >
        {isForAction ? (
          <Button size={"icon"} className="bg-blue-400 hover:bg-blue-500">
            <Info />
          </Button>
        ) : (
          <button>{item.product_name}</button>
        )}
      </DrawerTrigger>
      <DrawerContent className="px-4 w-[180px]">
        <DrawerHeader>
          <DrawerTitle className="text-center">Products Detail</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-y-3 w-full mt-3 overflow-y-auto">
          <div className="mt-3 w-full flex items-center justify-center">
            <Image
              src={item.image_url}
              alt={item.product_name + " image"}
              height={200}
              width={100}
              className="w-full max-h-[12rem] object-cover max-w-[15rem]"
            />
          </div>
          <div className="flex items-center gap-x-3">
            <IconStarFilled className="text-yellow-500" />
            <span>{dataReview && dataReview.totalRating.avgRating}</span>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Product Id</Label>
            <Input readOnly disabled value={item.id} />
          </div>
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 w-full">
            <div className="flex flex-col gap-y-2">
              <Label>Product Name</Label>
              <Input readOnly disabled value={item.product_name} />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Price</Label>
              <Input readOnly disabled value={item.price} />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Stock</Label>
              <Input readOnly disabled value={item.stock} />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Category</Label>
              <Input readOnly disabled value={item.category.category_name} />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Total Purchased</Label>
              <Input readOnly disabled value={item.totalPurchased} />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Total Advantage</Label>
              <Input
                readOnly
                disabled
                value={"Rp" + item.advantage.toLocaleString("id-ID")}
              />
            </div>
          </div>
          <div className="flex flex-col mt-3 gap-y-2">
            <Label>Description</Label>
            <Textarea readOnly disabled value={item.description} />
          </div>
          <h4 className="text-center text-xl mt-3 mb-2">Reviews users</h4>
          {dataReview &&
            dataReview.dataReview.map((review) => (
              <React.Fragment key={review.id}>
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
                          <IconUserFilled
                            className="text-orange-800"
                            size={20}
                          />
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
                                <IconUserFilled
                                  className="text-orange-800"
                                  size={20}
                                />
                              </div>
                            )}
                            <span>{review.reply.username}</span>
                            <span className="text-sm font-semibold text-gray-400">
                              {timeAgo(review.reply.created_at)}
                            </span>
                          </div>
                          <span className="flex items-center text-gray-300 font-semibold text-sm gap-x-2"></span>
                          <p className="text-sm font-light">
                            {review.reply.comment}
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-y-3 px-2">
                          <input
                            type="text"
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            onKeyUp={(e) =>
                              e.key.toLowerCase() === "enter" &&
                              sendReplyReview(review.id)
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
              </React.Fragment>
            ))}
        </div>
        <DrawerFooter className="px-1">
          <DrawerClose className="cursor-pointer" asChild>
            <Button>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
