import Product from "./Product";

interface ProductsProps {
  stock?: number;
}

export default function Products(props: ProductsProps) {
  const { stock } = props;

  return (
    <div className="grid mt-2 mb-8 gap-x-4 gap-y-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: stock || 6 }).map((_, i) => (
        <Product key={i} />
      ))}
    </div>
  );
}
