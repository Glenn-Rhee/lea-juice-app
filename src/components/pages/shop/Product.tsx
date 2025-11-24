"use client";
import Loader from "@/components/icons/Loader";
import ResponseError from "@/error/ResponseError";
import { cn } from "@/lib/utils";
import { DataProduct, ResponsePayload } from "@/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ProductProps {
  data: DataProduct;
}

export default function Product(props: ProductProps) {
  const { data } = props;
  const { data: session } = useSession();
  let isCooldown = false;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      if (isCooldown) {
        throw new ResponseError(
          401,
          "Please wait a moment before checkout again!"
        );
      }

      isCooldown = true;
      setTimeout(() => {
        isCooldown = false;
      }, 2000);

      if (!session) {
        throw new ResponseError(
          401,
          "Oops! Login first to checkout your juice!"
        );
      }

      if (session?.user.role === "ADMIN") {
        throw new ResponseError(403, "Oops! Admin can not checkout product!");
      }

      const response = await fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify({
          product_id: data.id,
          quantity: 1,
        }),
      });

      const dataResponse = (await response.json()) as ResponsePayload;
      if (dataResponse.status === "failed") {
        throw new ResponseError(dataResponse.code, dataResponse.message);
      }

      toast.success(dataResponse.message);
      router.refresh();
    } catch (error) {
      toast.dismiss();
      if (error instanceof ResponseError) {
        toast.error(error.message);
      } else {
        toast.error("An error occured! Please try again later");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="shadow-lg p-4 rounded-lg">
      <Link href={"/product/" + data.id}>
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
        disabled={loading}
        onClick={handleCheckout}
        className={cn(
          "w-full mt-4 bg-white border py-2 rounded-full transition-colors duration-300",
          {
            "cursor-pointer border-orange-600 hover:bg-orange-600 text-orange-500 hover:text-white":
              !loading,
            "cursor-not-allowed border-orange-400/40 text-gray-400": loading,
          }
        )}
      >
        {loading ? (
          <Loader className="text-gray-700 text-center mx-auto" />
        ) : (
          "Add to chart"
        )}
      </button>
    </div>
  );
}
