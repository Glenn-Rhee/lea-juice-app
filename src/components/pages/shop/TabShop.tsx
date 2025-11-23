"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Products from "./Products";
import { useRouter, useSearchParams } from "next/navigation";
import { DataProduct } from "@/types";

interface TabShopProps {
  data: DataProduct[];
}

export default function TabShop(props: TabShopProps) {
  const { data } = props;
  const [activeTab, setActiveTab] = useState("all");
  const [dataProduct, setDataProduct] = useState(data);
  const searchParams = useSearchParams();
  const search = searchParams.get("s");
  const router = useRouter();

  useEffect(() => {
    if (search) {
      router.push("/shop?s=" + search + "&category=" + activeTab);
    }
  }, [activeTab, search, router]);

  useEffect(() => {
    setDataProduct(() =>
      activeTab === "all"
        ? data
        : data.filter(
            (v) => v.category.category_name.toLowerCase() === activeTab
          )
    );
  }, [activeTab, data]);

  return (
    <div className="w-full mt-4">
      <div className="max-w-xl grid grid-cols-4 gap-x-2">
        <button
          className={cn(
            "transition-colors duration-300 cursor-pointer py-1 rounded-xl active:scale-95",
            activeTab === "all"
              ? "bg-orange-500 text-white"
              : "bg-white text-orange-600 border border-orange-500 hover:bg-gray-100"
          )}
          type="button"
          onClick={() => setActiveTab("all")}
        >
          All
        </button>
        <button
          className={cn(
            "transition-colors duration-300 cursor-pointer py-1 rounded-xl active:scale-95",
            activeTab === "juice"
              ? "bg-orange-500 text-white"
              : "bg-white text-orange-600 border border-orange-500 hover:bg-gray-100"
          )}
          type="button"
          onClick={() => setActiveTab("juice")}
        >
          Juice
        </button>
        <button
          className={cn(
            "transition-colors duration-300 cursor-pointer py-1 rounded-xl active:scale-95",
            activeTab === "salad"
              ? "bg-orange-500 text-white"
              : "bg-white text-orange-600 border border-orange-500 hover:bg-gray-100"
          )}
          type="button"
          onClick={() => setActiveTab("salad")}
        >
          Salad
        </button>
        <button
          className={cn(
            "transition-colors duration-300 cursor-pointer py-1 rounded-xl active:scale-95",
            activeTab === "fruit"
              ? "bg-orange-500 text-white"
              : "bg-white text-orange-600 border border-orange-500 hover:bg-gray-100"
          )}
          type="button"
          onClick={() => setActiveTab("fruit")}
        >
          Fruits
        </button>
      </div>

      {activeTab === "all" && <Products data={dataProduct} />}
      {activeTab === "juice" && <Products data={dataProduct} />}
      {activeTab === "salad" && <Products data={dataProduct} />}
      {activeTab === "fruit" && <Products data={dataProduct} />}
    </div>
  );
}
