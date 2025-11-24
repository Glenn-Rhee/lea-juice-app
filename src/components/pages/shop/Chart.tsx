import { Separator } from "@/components/ui/separator";
import ChartItem from "./ChartItem";
import React from "react";
import { Cart } from "@/types";

interface ChartProps {
  dataCart: Cart[];
}

export default function Chart(props: ChartProps) {
  const { dataCart } = props;
  return (
    <div className="w-full max-h-screen overflow-scroll px-3 flex flex-col gap-y-3">
      {dataCart.map((d, i) => (
        <React.Fragment key={d.id}>
          <ChartItem data={d} />
          {i !== length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </div>
  );
}
