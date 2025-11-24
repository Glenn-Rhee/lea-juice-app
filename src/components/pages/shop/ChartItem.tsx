"use client";
import Counter from "@/components/Counter";
import { Cart } from "@/types";
import { IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";

interface ChartItemProps {
  data: Cart;
}

export default function ChartItem(props: ChartItemProps) {
  const { data } = props;
  const [qty, setQty] = useState(data.quantity);

  return (
    <div className="flex justify-between w-full">
      <div className="flex gap-x-2">
        <Image
          src={data.product.image_url}
          alt={data.product.product_name}
          width={60}
          height={200}
          className="rounded-md object-cover aspect-square"
        />
        <div className="">
          <h6 className="text-lg font-semibold text-stone-800">
            {data.product.product_name}
          </h6>
          <span className="text-sm font-medium text-gray-400">
            {qty} x Rp{data.product.price.toLocaleString("id-ID")}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between gap-y-2">
        <Counter
          dataCart={data}
          maxStock={data.product.stock}
          stateQty={[qty, setQty]}
        />
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
