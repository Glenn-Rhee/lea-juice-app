import { schema } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  IconCircleCheckFilled,
  IconClock,
  IconDotsVertical,
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
    cell: ({ row, table }) => {
      const updateData = table.options.meta?.updateData;
      const handleUpdate = (updatedTransaction: z.infer<typeof schema>) => {
        if (updateData) {
          // Update semua field yang berubah
          Object.keys(updatedTransaction).forEach((key) => {
            if (key !== "id") {
              updateData(
                row.index,
                key,
                updatedTransaction[key as keyof typeof updatedTransaction]
              );
            }
          });
        }
      };

      return <TableCellViewer item={row.original} onUpdate={handleUpdate} />;
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
      };

      const status = row.original.status.toLowerCase();
      const config =
        statusConfig[status as keyof typeof statusConfig] ||
        statusConfig.pending;
      const Icon = config.icon;

      return (
        <Badge variant={config.badgeVariant} className="px-1.5">
          <Icon className={`size-4 ${config.className}`} />
          {config.label}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const handleUpdate = (updatedTransaction: z.infer<typeof schema>) => {
        if (updateData) {
          // Update semua field yang berubah
          Object.keys(updatedTransaction).forEach((key) => {
            if (key !== "id") {
              updateData(
                row.index,
                key,
                updatedTransaction[key as keyof typeof updatedTransaction]
              );
            }
          });
        }
      };
      const updateData = table.options.meta?.updateData;

      const handleStatusChange = (newStatus: string) => {
        if (updateData) {
          updateData(row.index, "status", newStatus);
        }
      };

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
              <TableCellViewer
                isForAction
                item={row.original}
                onUpdate={handleUpdate}
              />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleStatusChange("completed")}>
              <IconCircleCheckFilled className="size-4 fill-green-500 mr-2" />
              Mark as Completed
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange("pending")}>
              <IconClock className="size-4 text-yellow-500 mr-2" />
              Mark as Pending
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => handleStatusChange("cancelled")}
            >
              <IconX className="size-4 mr-2" />
              Cancel Order
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
