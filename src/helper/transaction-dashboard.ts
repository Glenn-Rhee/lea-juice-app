import { TransactionDashboard } from "@/types";
import { STATUSORDER } from "../../generated/prisma";

export const filterTransaction = (
  transactions: TransactionDashboard[],
  searchTerm: string,
  selectedStatus: "all" | STATUSORDER
) => {
  const filtered =
    transactions &&
    transactions.filter((trx: TransactionDashboard) => {
      const matchesSearch =
        trx.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trx.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trx.product.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        selectedStatus === "all" || trx.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });

  return filtered;
};
