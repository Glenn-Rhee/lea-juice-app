import { DataProduct } from "@/types";
import DataTable from "../../transaction/DataTable";
import { columns } from "./Columns";

interface TableProductProps {
  products: DataProduct[];
}

export default function TableProduct(props: TableProductProps) {
  const { products } = props;
  
  return (
    <div className="mt-4">
      <DataTable columns={columns} data={products} />
    </div>
  );
}
