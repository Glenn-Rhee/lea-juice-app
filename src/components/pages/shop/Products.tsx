import { DataProduct } from "@/types";
import Product from "./Product";

interface ProductsProps {
  data: DataProduct[];
}

export default function Products(props: ProductsProps) {
  const { data } = props;

  return (
    <div className="grid mt-2 mb-8 gap-x-4 gap-y-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {data.map((d, i) => (
        <Product data={d} key={i} />
      ))}
    </div>
  );
}
