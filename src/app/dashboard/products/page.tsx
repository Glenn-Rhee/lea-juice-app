import EmptyProduct from "@/components/pages/dashboard/products/EmptyProduct";
import ProductHeader from "@/components/pages/dashboard/products/ProductHeader";
import TableProduct from "@/components/pages/dashboard/products/TableProduct";

export default function ProductsDashboardPage() {
  const isEmpty = false;
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
          {isEmpty ? (
            <EmptyProduct />
          ) : (
            <>
              <ProductHeader />
              <TableProduct />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
