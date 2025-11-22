import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function EmptyProduct() {
  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-y-2">
        <Image
          src={"/product-empty.png"}
          alt="Product empty image"
          width={250}
          height={200}
        />
        <h1 className="text-4xl text-white font-bold">Whoop!</h1>
        <p className="text-white font-medium text-xl">Product still empty</p>
        <Button className="font-medium">Add product</Button>
      </div>
    </div>
  );
}
