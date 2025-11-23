"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DataProduct } from "@/types";

export const columns: ColumnDef<DataProduct>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        className="border border-white data-[state=checked]:border-white data-[state=checked]:border-[1px]"
        aria-label="Select All"
        onCheckedChange={(val) => table.toggleAllPageRowsSelected(!!val)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(val) => row.toggleSelected(!!val)}
        aria-label="Select row"
        className="border border-black"
      />
    ),
  },
  {
    accessorKey: "id",
    header: "Product ID",
    cell: ({ row }) => (
      <span className="text-white font-medium">
        {row.original.id.slice(0, 8)}
      </span>
    ),
  },
  {
    accessorKey: "product_name",
    header: ({ column }) => (
      <button
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Product Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <span className="text-white font-medium">
        {row.original.product_name}
      </span>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <button
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Price
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      return (
        <span className="text-white font-medium">
          Rp{row.original.price.toLocaleString("id-ID")}
        </span>
      );
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <button
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Stock
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <span className="text-white font-medium">{row.original.stock}</span>
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <button
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Category
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <span className="text-white font-medium">
        {row.original.category.category_name}
      </span>
    ),
  },
  {
    accessorKey: "image_url",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={row.original.image_url}
        alt={`${row.original.product_name} image`}
        width={50}
        height={50}
        className="aspect-square object-cover rounded-full"
      />
    ),
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 cursor-pointer w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4 text-white" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem className="text-red-500 hover:data-[highlighted]:bg-red-100 font-medium hover:data-[highlighted]:text-red-500">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
