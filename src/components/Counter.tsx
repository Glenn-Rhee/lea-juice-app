"use client";
import { useUpdateCartQuantity } from "@/lib/product-mutation";
import { cn } from "@/lib/utils";
import { useProductStore } from "@/store/product-store";
import { Cart } from "@/types";
import { Dispatch, SetStateAction } from "react";

interface CounterProps {
  maxStock: number;
  stateQty: [number, Dispatch<SetStateAction<number>>];
  dataCart?: Cart;
}

export default function Counter(props: CounterProps) {
  const { maxStock, dataCart } = props;
  const [quantity, setQuantity] = props.stateQty;
  const updateQty = useUpdateCartQuantity();
  const { updateQty: updateQuantity } = useProductStore();

  return (
    <div className="flex items-center gap-x-4 text-sm py-1 font-semibold text-stone-800 bg-gray-200 px-2 rounded-sm">
      <button
        disabled={updateQty.isPending || quantity === 1}
        onClick={() => {
          if (quantity > 1) {
            const newQty = quantity - 1;
            setQuantity(newQty);
            if (dataCart) {
              updateQuantity(dataCart.id, newQty);
              updateQty.mutate({
                item_id: dataCart.id,
                quantity: newQty,
              });
            }
          }
        }}
        className={cn(
          "cursor-pointer px-2",
          (updateQty.isPending || quantity === 1) && "opacity-40 cursor-default"
        )}
      >
        -
      </button>
      <span className="w-[40px] text-center">{quantity}</span>
      <button
        disabled={updateQty.isPending || quantity === maxStock}
        onClick={async () => {
          if (quantity < maxStock) {
            const newQty = quantity + 1;
            setQuantity(newQty);
            if (dataCart) {
              updateQuantity(dataCart.id, newQty);
              updateQty.mutate({
                item_id: dataCart.id,
                quantity: newQty,
              });
            }
          }
        }}
        className={cn(
          "cursor-pointer px-2",
          (updateQty.isPending || quantity === maxStock) &&
            "opacity-40 cursor-default"
        )}
      >
        +
      </button>
    </div>
  );
}
