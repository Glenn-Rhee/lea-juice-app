import { columns, Transaction } from "@/components/pages/transaction/Columns";
import DataTable from "@/components/pages/transaction/DataTable";

export default function TransactionPage() {
  const data: Transaction[] = [
    {
      id: "1",
      productName: "Product A",
      amount: 100,
      quantity: 2,
      date: new Date("2024-01-01"),
      status: "PENDING",
    },
    {
      id: "2",
      productName: "Product B",
      amount: 200,
      quantity: 4,
      date: new Date("2024-01-02"),
      status: "PROCESSING",
    },
    {
      id: "3",
      productName: "Product C",
      amount: 150,
      quantity: 1,
      date: new Date("2024-01-04"),
      status: "SHIPPED",
    },
    {
      id: "4",
      productName: "Product D",
      amount: 300,
      quantity: 3,
      date: new Date("2024-01-07"),
      status: "COMPLETED",
    },
    {
      id: "5",
      productName: "Product E",
      amount: 120,
      quantity: 2,
      date: new Date("2024-01-08"),
      status: "CANCELLED",
    },
    {
      id: "6",
      productName: "Product F",
      amount: 450,
      quantity: 5,
      date: new Date("2024-01-10"),
      status: "SHIPPED",
    },
    {
      id: "7",
      productName: "Product G",
      amount: 80,
      quantity: 1,
      date: new Date("2024-01-12"),
      status: "COMPLETED",
    },
  ];

  return (
    <div className="pt-24 px-4 max-w-7xl mx-auto mb-8 bg-gray-100">
      <h1 className="text-center font-bold text-4xl text-slate-900 mb-6">
        Transaction History
      </h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
