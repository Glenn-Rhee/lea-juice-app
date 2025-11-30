import { schema } from "@/components/data-table";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";
import z from "zod";
import { STATUSORDER } from "../../../../generated/prisma";
import {
  IconCircleCheckFilled,
  IconClock,
  IconRefresh,
  IconTruck,
  IconX,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/helper/formatDate";
import { Badge } from "@/components/ui/badge";
import Loader from "@/components/icons/Loader";
import { useUpdateStatusTransaction } from "@/lib/transaction-mutation";

export default function TableCellViewer({
  item,
  isForAction,
}: {
  item: z.infer<typeof schema>;
  isForAction?: boolean;
}) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const updateStatus = useUpdateStatusTransaction();
  const [status, setStatus] = useState<STATUSORDER>(item.status);
  useEffect(() => {
    if (!updateStatus.isPending) {
      setOpen(false);
    }
  }, [updateStatus.isPending]);
  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      direction={isMobile ? "bottom" : "right"}
    >
      <DrawerTrigger asChild>
        <Button
          variant="link"
          className={cn("text-foreground w-fit px-0 text-left", {
            "w-full h-full flex items-center justify-start": isForAction,
          })}
        >
          {isForAction ? "View Detail" : item.product}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>Transaction Details</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="transactionId">Transaction ID</Label>
              <Input
                id="transactionId"
                defaultValue={item.transactionId}
                disabled
              />
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="product">Product</Label>
              <Input id="product" value={item.product} disabled />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="productType">Jenis Product</Label>
                <Select value={item.productType} disabled>
                  <SelectTrigger id="productType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="JUICE">Juice</SelectItem>
                    <SelectItem value="FRUIT">Fruit</SelectItem>
                    <SelectItem value="SALAD">Salad</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={status}
                  onValueChange={(value) => setStatus(value as STATUSORDER)}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="COMPLETED">
                      <div className="flex items-center gap-2">
                        <IconCircleCheckFilled className="size-4 fill-green-500" />
                        Completed
                      </div>
                    </SelectItem>
                    <SelectItem value="PENDING">
                      <div className="flex items-center gap-2">
                        <IconClock className="size-4 text-yellow-500" />
                        Pending
                      </div>
                    </SelectItem>
                    <SelectItem value="CANCELLED">
                      <div className="flex items-center gap-2">
                        <IconX className="size-4 text-red-500" />
                        Cancelled
                      </div>
                    </SelectItem>
                    <SelectItem value="SHIPPED">
                      <div className="flex items-center gap-2">
                        <IconTruck className="size-4 text-blue-500" />
                        Shipped
                      </div>
                    </SelectItem>
                    <SelectItem value="PROCESSING">
                      <div className="flex items-center gap-2">
                        <IconRefresh className="size-4 text-orange-500" />
                        Processing
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="customerName">Nama Pembeli</Label>
              <Input id="customerName" disabled value={item.customerName} />
              <div className="grid grid-cols-2 gap-4">
                <div className="w-full">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    disabled
                    className="mt-3"
                    value={item.phoneNumber || ""}
                  />
                </div>
                <div className="w-full">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    disabled
                    className="mt-3"
                    value={item.city || ""}
                  />
                </div>
                <div className="w-full">
                  <Label htmlFor="province">Province</Label>
                  <Input
                    id="province"
                    disabled
                    className="mt-3"
                    value={item.province || ""}
                  />
                </div>
                <div className="w-full">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    disabled
                    className="mt-3"
                    value={item.postalCode || ""}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  disabled
                  type="number"
                  value={item.quantity}
                />
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  defaultValue={new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(item.amount)}
                  disabled
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="date">Date</Label>
              <span>{formatDate(item.date)}</span>
            </div>

            <h4 className="mt-8 font-medium text-lg">Payment Details</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-y-3">
                <Label>Status Payment</Label>
                <Badge>{item.statusPayment}</Badge>
              </div>
              <div className="flex flex-col gap-y-3">
                <Label>Paid at</Label>
                <span className="text-justify">{formatDate(item.paidAt)}</span>
              </div>
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button
            onClick={() => updateStatus.mutate({ id: item.id, status })}
            disabled={updateStatus.isPending}
          >
            {updateStatus.isPending ? <Loader /> : "Save Changes"}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
