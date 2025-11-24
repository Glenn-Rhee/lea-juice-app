import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import EmptyChart from "./EmptyChart";
import Chart from "./Chart";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { Cart, ResponsePayload } from "@/types";
import ResponseError from "@/error/ResponseError";
import toast from "react-hot-toast";
import { useProductStore } from "@/store/product-store";

export default function SheetShop({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const { items, setItems, total } = useProductStore();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/cart", {
          method: "GET",
          credentials: "include",
        });

        const dataRes = (await res.json()) as ResponsePayload<Cart[]>;
        if (dataRes.status === "failed") {
          throw new ResponseError(dataRes.code, dataRes.message);
        }

        setItems(dataRes.data);
      } catch (error) {
        if (error instanceof ResponseError) {
          toast.error(error.message);
        } else {
          toast.error("An error occured!");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setItems]);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="bg-white">
        <SheetHeader>
          <SheetTitle className="text-xl text-stone-800">Juice Cart</SheetTitle>
          <Separator className="bg-slate-600" />
        </SheetHeader>

        {loading ? (
          <div className="h-full flex items-center justify-center flex-col">
            <span className="text-sm text-stone-900 font-medium">
              Loading data...
            </span>
          </div>
        ) : items.length === 0 ? (
          <EmptyChart />
        ) : (
          <Chart dataCart={items} />
        )}

        {items.length !== 0 && (
          <SheetFooter>
            <div className="w-full flex items-center justify-between">
              <span className="text-xl font-semibold text-stone-900">
                Sub total
              </span>
              <span className="font-medium text-gray-600">
                Rp {total.toLocaleString("id-ID")}
              </span>
            </div>
            <button
              type="submit"
              className="cursor-pointer w-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 text-white rounded-lg hover:opacity-90 active:scale-95 py-2"
            >
              Checkout
            </button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
