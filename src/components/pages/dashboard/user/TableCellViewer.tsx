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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";
import { DataUserTable } from "@/types";
import { Info } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function TableCellViewer({ item }: { item: DataUserTable }) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState<boolean>(false);
  const date = new Date(item.lastPurchaseDate);
  const dateOfDay = date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      direction={isMobile ? "bottom" : "right"}
    >
      <DrawerTrigger asChild>
        <Button
          size={"sm"}
          className="cursor-pointer font-medium bg-blue-500 hover:bg-blue-600"
        >
          <Info />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="px-4 w-[180px]">
        <DrawerHeader>
          <DrawerTitle className="text-center">Users Detail</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-y-3 w-full mt-3 overflow-y-auto">
          <Image
            src={item.image}
            alt={`Profile pictur ${item.username}`}
            width={200}
            height={200}
            className="aspect-square object-cover mx-auto rounded-full border mt-3"
          />
          <div className="flex flex-col gap-y-2">
            <Label>User Id</Label>
            <Input readOnly disabled value={item.id} />
          </div>
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 w-full">
            <div className="flex flex-col gap-y-2">
              <Label>Username</Label>
              <Input readOnly disabled value={item.username} />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Name</Label>
              <Input readOnly disabled value={item.name} />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Email</Label>
              <Input readOnly disabled value={item.email} />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Phone Number</Label>
              <Input readOnly disabled value={item.phoneNumber} />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Total Orders</Label>
              <Input readOnly disabled value={item.totalOrders} />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Total Spending</Label>
              <Input
                readOnly
                disabled
                value={"Rp" + item.totalSpending.toLocaleString("id-ID")}
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-2 mt-3">
            <Label>Last Purchase Date</Label>
            <span className="text-sm font-light">{dateOfDay}</span>
          </div>
          <Separator className="bg-gray-600" />
          <Textarea className="mt-3" readOnly disabled value={item.address} />
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 w-full mt-3">
            <div className="flex flex-col gap-y-2">
              <Label>Gender</Label>
              <Input readOnly disabled value={item.gender} />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>City</Label>
              <Input readOnly disabled value={item.city} />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Province</Label>
              <Input readOnly disabled value={item.province} />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Postal Code</Label>
              <Input readOnly disabled value={item.postalCode} />
            </div>
          </div>
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
