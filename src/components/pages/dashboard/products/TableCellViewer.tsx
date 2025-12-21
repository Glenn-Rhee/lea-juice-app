"use client";
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
import { useIsMobile } from "@/hooks/use-mobile";
import { DataProduct, DataReview, TotalRating } from "@/types";
import { IconStarFilled } from "@tabler/icons-react";
import { Info } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ReviewSection from "./ReviewSection";
import { useGetReviewReply } from "@/lib/review-queries";
import { Skeleton } from "@/components/ui/skeleton";

export interface TotalReview {
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
  const [activeProductId, setActiveProduct] = useState(item.id);
  const { data, isFetching, refetch, isPending } =
    useGetReviewReply(activeProductId);

  useEffect(() => {
    if (open && activeProductId) {
      refetch();
    }
  }, [open, activeProductId, refetch]);

  useEffect(() => {
    setDataReview(data);
  }, [data]);

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      direction={isMobile ? "bottom" : "right"}
    >
      <DrawerTrigger
        asChild
        disabled={isFetching}
        onClick={(e) => {
          e.preventDefault();
          setActiveProduct(item.id);
          setOpen(true);
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
      <DrawerContent className="px-4 focus:border-none focus:outline-0 md:w-[180px]">
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
            {isPending ? (
              <Skeleton className="w-[2rem] h-[1rem] bg-gray-700"></Skeleton>
            ) : (
              <span>{dataReview && dataReview.totalRating.avgRating}</span>
            )}
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
          {dataReview && (
              <h4 className="text-center text-xl mt-3 mb-2">Reviews users</h4>
            ) &&
            dataReview.dataReview.map((review) => (
              <ReviewSection
                setDataReview={setDataReview}
                review={review}
                key={review.id}
              />
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
