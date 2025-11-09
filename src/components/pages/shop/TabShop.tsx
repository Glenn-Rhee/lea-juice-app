"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Products from "./Products";

export default function TabShop() {
  const [activeTab, setActiveTab] = useState("all");

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
            activeTab === "fruits"
              ? "bg-orange-500 text-white"
              : "bg-white text-orange-600 border border-orange-500 hover:bg-gray-100"
          )}
          type="button"
          onClick={() => setActiveTab("fruits")}
        >
          Fruits
        </button>
      </div>

      {activeTab === "all" && <Products />}
      {activeTab === "juice" && <Products stock={10} />}
      {activeTab === "salad" && <Products stock={4} />}
      {activeTab === "fruits" && <Products stock={13} />}
    </div>
  );
}
