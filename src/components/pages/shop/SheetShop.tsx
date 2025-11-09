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

export default function SheetShop({ children }: { children: React.ReactNode }) {
  const isEmpty = false;
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-xl">Juice Cart</SheetTitle>
          <Separator className="bg-slate-600" />
        </SheetHeader>
        {isEmpty ? <EmptyChart /> : <Chart />}

        {!isEmpty && (
          <SheetFooter>
            <div className="w-full flex items-center justify-between">
              <span className="text-xl font-semibold text-stone-900">
                Sub total
              </span>
              <span className="font-medium text-gray-600">Rp 100.000</span>
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
