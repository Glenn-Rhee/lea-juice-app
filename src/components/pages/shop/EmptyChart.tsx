import { IconShoppingCart } from "@tabler/icons-react";

export default function EmptyChart() {
  return (
    <div className="h-full flex items-center justify-center flex-col">
      <IconShoppingCart className="text-stone-700" size={70} />
      <span className="text-slate-900 font-semibold text-lg">
        No Products yet.
      </span>
    </div>
  );
}
