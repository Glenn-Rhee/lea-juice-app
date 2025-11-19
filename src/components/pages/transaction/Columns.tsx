"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { STATUSORDER } from "../../../../generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
export type Transaction = {
  id: string;
  productName: string;
  amount: number;
  quantity: number;
  date: Date;
  status: STATUSORDER;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        className="border border-black"
        onCheckedChange={(val) => table.toggleAllPageRowsSelected(!!val)}
        aria-label="Select All"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="border border-black"
        checked={row.getIsSelected()}
        onCheckedChange={(val) => row.toggleSelected(!!val)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "id",
    header: "Transaction ID",
  },
  {
    accessorKey: "productName",
    header: ({ column }) => (
      <button
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Product Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </button>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <button
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Amount
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </button>
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <button
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Quantity
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </button>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <button
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <span>{row.original.date.toLocaleDateString("id-ID")}</span>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <button
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status Transaction
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      switch (status) {
        case "PENDING":
          return <Badge className="bg-yellow-600">{row.original.status}</Badge>;
        case "PROCESSING":
          return <Badge className="bg-orange-600">{row.original.status}</Badge>;
        case "SHIPPED":
          return <Badge className="bg-blue-600">{row.original.status}</Badge>;
        case "CANCELLED":
          return <Badge className="bg-red-600">{row.original.status}</Badge>;
        default:
          return <Badge className="bg-green-600">{row.original.status}</Badge>;
      }
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 cursor-pointer w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={async () => {
              await navigator.clipboard.writeText(row.original.id);
              toast.dismiss();
              toast.success("Payment ID copied to clipboard");
            }}
          >
            Copy payment ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>View Product</DropdownMenuItem>
          <DropdownMenuItem>View payment details</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
