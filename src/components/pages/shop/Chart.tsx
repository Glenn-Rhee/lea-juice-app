import { Separator } from "@/components/ui/separator";
import ChartItem from "./ChartItem";

const data = [
  {
    id: 1,
    name: "Mango Delight",
    quantity: 2,
    price: 12000,
  },
  {
    id: 2,
    name: "Juice Alpukat",
    quantity: 1,
    price: 20000,
  },
  {
    id: 3,
    name: "Strawberry Bliss",
    quantity: 3,
    price: 15000,
  },
  {
    id: 4,
    name: "Banana Smoothie",
    quantity: 1,
    price: 18000,
  },
  {
    id: 5,
    name: "Green Detox",
    quantity: 2,
    price: 17000,
  },
  {
    id: 6,
    name: "Orange Sunrise",
    quantity: 1,
    price: 14000,
  },
  {
    id: 7,
    name: "Pineapple Fresh",
    quantity: 4,
    price: 16000,
  },
  {
    id: 8,
    name: "Watermelon Chill",
    quantity: 1,
    price: 13000,
  },
  {
    id: 9,
    name: "Blueberry Spark",
    quantity: 2,
    price: 19000,
  },
  {
    id: 10,
    name: "Apple Fusion",
    quantity: 1,
    price: 15000,
  },
];

export default function Chart() {
  const length = 8;
  return (
    <div className="w-full max-h-screen overflow-scroll px-3 flex flex-col gap-y-3">
      {data.map((d, i) => (
        <>
          <ChartItem key={d.id} />
          {i !== length - 1 && <Separator />}
        </>
      ))}
    </div>
  );
}
