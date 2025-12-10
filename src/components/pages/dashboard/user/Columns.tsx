"use client";
import { DataUserTable } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import TableCellViewer from "./TableCellViewer";

export const columnsUser: ColumnDef<DataUserTable>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.id.slice(0, 8)}</span>
    ),
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.username}</span>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.email}</span>
    ),
  },
  {
    accessorKey: "totalOrders",
    header: "Total Orders",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.totalOrders}</span>
    ),
  },
  {
    accessorKey: "totalSpending",
    header: "Total Spending",
    cell: ({ row }) => (
      <span className="font-medium">
        Rp{row.original.totalSpending.toLocaleString("id-ID")}
      </span>
    ),
  },
  {
    accessorKey: "lastPurchaseDate",
    header: "Last Purchase Date",
    cell: ({ row }) => {
      const date = new Date(row.original.lastPurchaseDate);
      const dateOfDay = date.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      return <span className="font-medium">{dateOfDay}</span>;
    },
  },
  {
    accessorKey: "image",
    header: "Image User",
    cell: ({ row }) => {
      return (
        <Image
          src={row.original.image}
          alt={`Profile pictur ${row.original.username}`}
          width={40}
          height={40}
          className="aspect-square object-cover rounded-full border"
        />
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Action",
    cell: ({ row }) => <TableCellViewer item={row.original} />,
  },
];
