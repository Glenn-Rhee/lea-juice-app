"use client";
import Counter from "@/components/Counter";
import Loader from "@/components/icons/Loader";
import ResponseError from "@/error/ResponseError";
import { useCreateCart } from "@/lib/product-mutation";
import { cn } from "@/lib/utils";
import { DataProduct } from "@/types";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

interface ProductPurchaseBarProps {
  data: DataProduct;
}

export default function ProductPurchaseBar(props: ProductPurchaseBarProps) {
  const { data } = props;
  const { data: session } = useSession();
  const [qty, setQty] = useState(1);

  let isCooldown = false;
  const createCart = useCreateCart();

  async function handleCheckout() {
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

      createCart.mutate({ product_id: data.id, quantity: qty });
    } catch (error) {
      toast.dismiss();
      if (error instanceof ResponseError) {
        toast.error(error.message);
      } else {
        toast.error("An error occured! Please try again later");
      }
    }
  }

  return (
    <div className="flex items-center gap-x-3">
      {data.stock === 0 ? (
        <span className="text-red-500 font-medium text-lg not-[]:bg-white">
          Sold out
        </span>
      ) : (
        <>
          <span className="text-gray-600 font-medium">Quantity</span>
          <Counter stateQty={[qty, setQty]} maxStock={data.stock} />
          <button
            type="button"
            onClick={handleCheckout}
            className={cn(
              "px-4 py-1 border w-[10rem] transition-colors duration-200 rounded-xl",
              {
                "border-orange-600 cursor-pointer text-orange-500 hover:border-transparent hover:bg-orange-600 hover:text-white":
                  !createCart.isPending,
                "cursor-not-allowed border-orange-400/40 text-gray-400":
                  createCart.isPending,
              }
            )}
          >
            {createCart.isPending ? (
              <Loader className="text-gray-700 text-center mx-auto" />
            ) : (
              "Add to chart"
            )}
          </button>
        </>
      )}
    </div>
  );
}
