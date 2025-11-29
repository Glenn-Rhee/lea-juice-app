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
import { useState } from "react";
import z from "zod";
import { STATUSORDER } from "../../../../generated/prisma";
import {
  IconCircleCheckFilled,
  IconClock,
  IconRefresh,
  IconTruck,
  IconX,
} from "@tabler/icons-react";

export default function TableCellViewer({
  item,
  onUpdate,
}: {
  item: z.infer<typeof schema>;
  onUpdate?: (transaction: z.infer<typeof schema>) => void;
}) {
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState(item);
  const handleSave = () => {
    if (onUpdate) {
      onUpdate(formData);
    }
  };

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.product}
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
              <Input id="product" value={formData.product} disabled />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="productType">Jenis Product</Label>
                <Select value={formData.productType} disabled>
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
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value as STATUSORDER })
                  }
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
              <Input id="customerName" disabled value={formData.customerName} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  disabled
                  type="number"
                  value={formData.quantity}
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
              <Input
                id="date"
                type="date"
                disabled
                value={new Date(formData.date).toISOString().split("T")[0]}
              />
            </div>
          </form>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button onClick={handleSave}>Save Changes</Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
