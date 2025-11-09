"use client";
import { cn } from "@/lib/utils";
import { IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";

export default function ChartItem() {
  const [qty, setQty] = useState(1);

  return (
    <div className="flex justify-between w-full">
      <div className="flex gap-x-2">
        <Image
          src={"/foto jus alpukat.png"}
          alt="Alpukat juice"
          width={50}
          height={100}
          className="rounded-md"
        />
        <div className="">
          <h6 className="text-lg font-semibold text-stone-800">
            Juice Alpukat
          </h6>
          <span className="text-sm font-medium text-gray-400">
            {qty} x Rp20.000
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between gap-y-2">
        <div className="flex items-center gap-x-4 text-sm py-1 font-semibold text-stone-800 bg-gray-200 px-2 rounded-sm">
          <button
            onClick={() => {
              if (qty > 1) setQty((prev) => prev - 1);
            }}
            className={cn(
              "cursor-pointer px-2",
              qty === 1 && "opacity-40 cursor-default"
            )}
          >
            -
          </button>
          <span className="w-[40px] text-center">{qty}</span>
          <button
            onClick={() => {
              setQty((prev) => prev + 1);
            }}
            className="cursor-pointer px-2"
          >
            +
          </button>
        </div>
        <button
          type="button"
          className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md"
        >
          <IconTrash className="text-red-500" />
        </button>
      </div>
    </div>
  );
}
