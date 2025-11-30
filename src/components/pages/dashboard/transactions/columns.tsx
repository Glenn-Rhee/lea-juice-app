import { schema } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  IconCircleCheckFilled,
  IconClock,
  IconDotsVertical,
  IconRefresh,
  IconTruck,
  IconX,
} from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import z from "zod";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TableCellViewer from "../TableCellViewer";
import DragHandle from "../DragHandle";
import MarkAsItem from "./MarkAsItem";

export const columnsTransaction: ColumnDef<z.infer<typeof schema>>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.original.transactionId.slice(0, 8)}
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => {
      return <TableCellViewer item={row.original} />;
    },
  },
  {
    accessorKey: "productType",
    header: "Jenis Product",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.productType}
      </Badge>
    ),
  },
  {
    accessorKey: "customerName",
    header: "Nama Pembeli",
    cell: ({ row }) => (
      <div className="min-w-32">{row.original.customerName}</div>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(row.original.amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-center">Qty</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.quantity}x</div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.original.date);
      const formatted = date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      return <div className="min-w-24">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusConfig = {
        completed: {
          label: "Completed",
          icon: IconCircleCheckFilled,
          className: "fill-green-500 dark:fill-green-400",
          badgeVariant: "default" as const,
        },
        pending: {
          label: "Pending",
          icon: IconClock,
          className: "text-yellow-500",
          badgeVariant: "outline" as const,
        },
        cancelled: {
          label: "Cancelled",
          icon: IconX,
          className: "text-red-500",
          badgeVariant: "destructive" as const,
        },
        shipped: {
          label: "Shipped",
          icon: IconTruck,
          className: "text-blue-500",
          badgeVariant: "outline" as const,
        },
        processing: {
          label: "Processing",
          icon: IconRefresh,
          className: "text-orange-500",
          badgeVariant: "outline" as const,
        },
      };

      const status = row.original.status.toLowerCase();
      const config =
        statusConfig[status as keyof typeof statusConfig] ||
        statusConfig.pending;
      const Icon = config.icon;

      return (
        <Badge variant={config.badgeVariant} className="px-2">
          <Icon className={`size-4 ${config.className}`} />
          {config.label}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
              size="icon"
            >
              <IconDotsVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem onClick={(e) => e.preventDefault()}>
              <TableCellViewer isForAction item={row.original} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={(e) => e.preventDefault()}>
              <MarkAsItem id={row.original.id} status={"COMPLETED"}>
                <IconCircleCheckFilled className="size-4 fill-green-500 mr-2" />
                Mark as Completed
              </MarkAsItem>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => e.preventDefault()}>
              <MarkAsItem id={row.original.id} status={"PROCESSING"}>
                <IconRefresh className="size-4 text-orange-500 mr-2" />
                Mark as Processing
              </MarkAsItem>
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onClick={(e) => e.preventDefault()}
            >
              <MarkAsItem id={row.original.id} status={"CANCELLED"}>
                <IconX className="size-4 mr-2" />
                Cancel Order
              </MarkAsItem>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
