import { create } from "zustand";
interface ProductStore {
  quantity: number;
  setQuantity: (v: number) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  quantity: 1,
  setQuantity: (v) => set({ quantity: v }),
}));
