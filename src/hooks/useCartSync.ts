import { useCartItems } from "@/lib/product-queries";
import { useProductStore } from "@/store/product-store";
import { useEffect } from "react";

export function useCartSync() {
  const { setItems } = useProductStore();
  const { data } = useCartItems();

  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data, setItems]);
}
