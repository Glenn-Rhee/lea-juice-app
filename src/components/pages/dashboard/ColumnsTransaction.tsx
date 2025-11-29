import { schema } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import {
  IconCircleCheckFilled,
  IconClock,
  IconRefresh,
  IconTruck,
  IconX,
} from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import z from "zod";

export const columnsTransaction: ColumnDef<z.infer<typeof schema>>[] = [
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
    cell: ({ row }) => <span>{row.original.product}</span>,
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
        <Badge variant={config.badgeVariant} className="px-1.5">
          <Icon className={`size-4 ${config.className}`} />
          {config.label}
        </Badge>
      );
    },
  },
];
