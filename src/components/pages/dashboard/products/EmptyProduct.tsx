"use client";
import Image from "next/image";
import DialogProduct from "./DialogProduct";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function EmptyProduct({
  message,
  className,
  goBack,
}: {
  message: string;
  className?: string;
  goBack?: string;
}) {
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
        <h1 className={cn("text-4xl text-white font-bold", className)}>
          Whoop!
        </h1>
        <p className={cn("text-white font-medium text-xl", className)}>
          {message}
        </p>
        {message.includes("not found") ? (
          <Button
            className="cursor-pointer"
            onClick={() => router.push(goBack || "/dashboard/products")}
          >
            Go Back
          </Button>
        ) : (
          <DialogProduct httpMethod="POST">
            <Button type="button" className="cursor-pointer">
              Add Product
            </Button>
          </DialogProduct>
        )}
      </div>
    </div>
  );
}
