"use client";
import Image from "next/image";
import DialogProduct from "./DialogProduct";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function EmptyProduct({ message }: { message: string }) {
  const router = useRouter();
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
        <p className="text-white font-medium text-xl">{message}</p>
        {message.includes("not found") ? (
          <Button
            className="cursor-pointer"
            onClick={() => router.push("/dashboard/products")}
          >
            Go Back
          </Button>
        ) : (
          <DialogProduct />
        )}
      </div>
    </div>
  );
}
