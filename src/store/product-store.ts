import { Cart } from "@/types";
import { create } from "zustand";

interface ProductStore {
  items: Cart[];
  setItems: (v: Cart[]) => void;
  updateQty: (item_id: string, qty: number) => void;
  total: number;
}

export const useProductStore = create<ProductStore>((set) => ({
  items: [],
  setItems: (v) => set({ items: v }),
  total: 0,
  updateQty: (item_id, qty) =>
    set((state) => {
      const updated = state.items.map((item) =>
        item.id === item_id ? { ...item, quantity: qty } : item
      );

      const newTotal = updated.reduce(
        (acc, item) => acc + item.quantity * item.product.price,
        0
      );

      return {
        items: updated,
        total: newTotal,
      };
    }),
}));
