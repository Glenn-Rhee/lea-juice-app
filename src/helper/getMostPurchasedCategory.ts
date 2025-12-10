import { CATEGORY, STATUSORDER } from "../../generated/prisma";

export interface OrderUser {
  Detail_Order: DetailOrder[];
}

export interface DetailOrder {
  id: string;
  created_at: Date;
  product_id: string;
  status: STATUSORDER;
  order_id: string;
  quantity: number;
  total_price: number;
  payment_method: string;
  product: Product;
}

export interface Product {
  id: string;
  product_name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  category_id: string;
  category: Category;
}

export interface Category {
  id: string;
  category_name: CATEGORY;
}

export default function getMostPurchasedCategory(
  orders: OrderUser[]
): CATEGORY {
  const totals = orders.reduce((acc, order) => {
    order.Detail_Order.forEach((detail) => {
      const cat = detail.product.category.category_name;
      acc[cat] = (acc[cat] || 0) + detail.quantity;
    });

    return acc;
  }, {} as Record<string, number>);

  const most = Object.entries(totals).reduce((max, curr) => {
    return curr[1] > max[1] ? curr : max;
  });

  return most[0] as CATEGORY;
}
