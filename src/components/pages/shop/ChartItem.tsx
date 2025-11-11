"use client";
import Counter from "@/components/Counter";
import { IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";

export default function ChartItem() {
  const stateQty = useState(1);

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
            {stateQty[0]} x Rp20.000
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between gap-y-2">
        <Counter stateQty={stateQty} />
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
