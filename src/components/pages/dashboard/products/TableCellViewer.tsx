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
import { DataProduct } from "@/types";
import { Info } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function TableCellViewer({
  item,
  isForAction,
}: {
  item: DataProduct;
  isForAction?: boolean;
}) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      direction={isMobile ? "bottom" : "right"}
    >
      <DrawerTrigger
        asChild
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
          <Textarea
            className="mt-3"
            readOnly
            disabled
            value={item.description}
          />
        </div>
        <DrawerFooter>
          <DrawerClose className="cursor-pointer" asChild>
            <Button>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
