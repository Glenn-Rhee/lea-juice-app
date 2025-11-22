"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function DataTable<TData, TValue>(
  props: DataTableProps<TData, TValue>
) {
  const { columns, data } = props;
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  function getPaginationRange(current: number, total: number) {
    const delta = 2;
    const range = [];
    const left = Math.max(2, current - delta);
    const right = Math.min(total - 1, current + delta);

    range.push(1);

    if (left > 2) {
      range.push("...");
    }

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    if (right < total - 1) {
      range.push("...");
    }

    if (total > 1) {
      range.push(total);
    }

    return range;
  }

  const paginationRange = getPaginationRange(
    table.getState().pagination.pageIndex + 1,
    table.getPageCount()
  );

  return (
    <div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-orange-500 hover:bg-orange-600 hover:opacity-100">
            {table.getHeaderGroups().map((hg) => (
              <TableRow
                key={hg.id}
                className="hover:bg-orange-600 !opacity-100"
              >
                {hg.headers.map((header) => (
                  <TableHead className="text-white font-medium" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="">
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    "bg-transparent font-medium py-1 text-stone-800 hover:bg-white/20 data-[state=selected]:bg-slate-200/20 "
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-5">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No Results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center w-full justify-between px-2 space-x-2 py-4">
        <Button
          size={"sm"}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>

        <div className="space-x-2">
          {paginationRange.map((page, idx) =>
            page === "..." ? (
              <span key={idx} className="px-3 py-1 text-gray-500">
                ...
              </span>
            ) : (
              <button
                key={idx}
                onClick={() => table.setPageIndex(Number(page) - 1)}
                className={`
          px-3 py-1 border rounded-md cursor-pointer
          ${
            table.getState().pagination.pageIndex + 1 === page
              ? "bg-orange-600 text-white"
              : "border border-orange-500 text-orange-500"
          }
        `}
              >
                {page}
              </button>
            )
          )}
        </div>

        <Button
          size={"sm"}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
