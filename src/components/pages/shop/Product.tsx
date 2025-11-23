"use client";
import { DataProduct } from "@/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

interface ProductProps {
  data: DataProduct;
}

export default function Product(props: ProductProps) {
  const { data } = props;
  const { data: session } = useSession();

  async function handleCheckout() {
    if (!session) {
      toast.dismiss();
      toast.error("Oops! Login first to checkout your juice!");
    }
  }

  return (
    <div className="shadow-lg p-4 rounded-lg">
      <Link href={"/product/1"}>
        <Image
          src={data.image_url}
          alt={data.product_name}
          width={100}
          height={100}
          className="object-cover w-60 h-60 mx-auto rounded-md"
        />
        <div className="mt-4">
          <h6 className="font-semibold text-stone-900 text-xl">
            {data.product_name}
          </h6>
          <span className="text-stone-400 text-sm font-medium">
            Rp{data.price.toLocaleString("id-ID")}
          </span>
        </div>
      </Link>
      <button
        onClick={handleCheckout}
        className="w-full mt-4 bg-white border py-2 rounded-full cursor-pointer border-orange-600 hover:bg-orange-600 text-orange-500 hover:text-white transition-colors duration-300"
      >
        Add to chart
      </button>
    </div>
  );
}
