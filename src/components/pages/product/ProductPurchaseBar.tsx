"use client";
import Counter from "@/components/Counter";
import { useState } from "react";

export default function ProductPurchaseBar() {
  const stateQty = useState(1);

  return (
    <div className="flex items-center gap-x-3">
      <span className="text-gray-600 font-light">Quantity</span>
      <Counter stateQty={stateQty} />
      <button className="px-4 py-1 border border-orange-600 cursor-pointer text-orange-500 hover:border-transparent hover:bg-orange-600 hover:text-white transition-colors duration-200 rounded-xl">
        Add to cart
      </button>
    </div>
  );
}
