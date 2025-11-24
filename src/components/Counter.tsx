"use client";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

interface CounterProps {
  stateQty: [number, Dispatch<SetStateAction<number>>];
  maxStock: number;
}

export default function Counter(props: CounterProps) {
  const { maxStock } = props;
  const [qty, setQty] = props.stateQty;

  return (
    <div className="flex items-center gap-x-4 text-sm py-1 font-semibold text-stone-800 bg-gray-200 px-2 rounded-sm">
      <button
        disabled={qty === 1}
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
        disabled={qty === maxStock}
        onClick={() => {
          if (qty < maxStock) setQty((prev) => prev + 1);
        }}
        className={cn(
          "cursor-pointer px-2",
          qty === maxStock && "opacity-40 cursor-default"
        )}
      >
        +
      </button>
    </div>
  );
}
