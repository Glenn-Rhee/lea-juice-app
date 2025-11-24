"use client";
import { cn } from "@/lib/utils";
import { useProductStore } from "@/store/product-store";

interface CounterProps {
  maxStock: number;
}

export default function Counter(props: CounterProps) {
  const { maxStock } = props;
  const { quantity, setQuantity } = useProductStore();

  return (
    <div className="flex items-center gap-x-4 text-sm py-1 font-semibold text-stone-800 bg-gray-200 px-2 rounded-sm">
      <button
        disabled={quantity === 1}
        onClick={() => {
          if (quantity > 1) setQuantity(quantity - 1);
        }}
        className={cn(
          "cursor-pointer px-2",
          quantity === 1 && "opacity-40 cursor-default"
        )}
      >
        -
      </button>
      <span className="w-[40px] text-center">{quantity}</span>
      <button
        disabled={quantity === maxStock}
        onClick={() => {
          if (quantity < maxStock) setQuantity(quantity + 1);
        }}
        className={cn(
          "cursor-pointer px-2",
          quantity === maxStock && "opacity-40 cursor-default"
        )}
      >
        +
      </button>
    </div>
  );
}
