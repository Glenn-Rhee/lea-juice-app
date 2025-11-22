import DataTable from "../../transaction/DataTable";
import { columns, Product } from "./Columns";

export default function TableProduct() {
  const products: Product[] = [
    {
      id: "1",
      product_name: "Orange Juice Fresh",
      price: 15000,
      stock: 20,
      image_url: "/jus-naga.png",
      category: "JUICE",
    },
    {
      id: "2",
      product_name: "Apple Juice Premium",
      price: 18000,
      stock: 15,
      image_url: "/jus-naga.png",
      category: "JUICE",
    },
    {
      id: "3",
      product_name: "Banana Smoothie",
      price: 20000,
      stock: 10,
      image_url: "/jus-naga.png",
      category: "JUICE",
    },
    {
      id: "4",
      product_name: "Fresh Apple",
      price: 8000,
      stock: 30,
      image_url: "/jus-naga.png",
      category: "FRUIT",
    },
    {
      id: "5",
      product_name: "Sweet Mango",
      price: 12000,
      stock: 25,
      image_url: "/jus-naga.png",
      category: "FRUIT",
    },
    {
      id: "6",
      product_name: "Red Grapes",
      price: 25000,
      stock: 18,
      image_url: "/jus-naga.png",
      category: "FRUIT",
    },
    {
      id: "7",
      product_name: "Tropical Fruit Salad",
      price: 22000,
      stock: 12,
      image_url: "/jus-naga.png",
      category: "SALAD",
    },
    {
      id: "8",
      product_name: "Green Salad Bowl",
      price: 20000,
      stock: 14,
      image_url: "/jus-naga.png",
      category: "SALAD",
    },
    {
      id: "9",
      product_name: "Mixed Berry Salad",
      price: 26000,
      stock: 9,
      image_url: "/jus-naga.png",
      category: "SALAD",
    },
    {
      id: "10",
      product_name: "Pineapple Juice",
      price: 17000,
      stock: 16,
      image_url: "/jus-naga.png",
      category: "JUICE",
    },
  ];

  return (
    <div className="mt-4">
      <DataTable columns={columns} data={products} />
    </div>
  );
}
