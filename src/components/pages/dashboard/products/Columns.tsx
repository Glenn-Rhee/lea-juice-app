"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DataProduct } from "@/types";
import DialogProduct from "./DialogProduct";
import z from "zod";
import ProductValidation from "@/validation/product-validation";
import { IconEdit } from "@tabler/icons-react";
import DeleteProduct from "./DeleteProduct";

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
    cell: ({ row }) => {
      const data: z.infer<typeof ProductValidation.PRODUCT> = {
        ...row.original,
        category: row.original.category.category_name,
      };

      return (
        <div className="flex items-center gap-x-3">
          <DialogProduct
            httpMethod="PATCH"
            dataProduct={data}
            idProduct={row.original.id}
          >
            <Button
              size={"icon"}
              variant={"outline"}
              className="cursor-pointer"
            >
              <IconEdit className="text-white" />
            </Button>
          </DialogProduct>
          <DeleteProduct id={row.original.id} />
        </div>
      );
    },
  },
];
