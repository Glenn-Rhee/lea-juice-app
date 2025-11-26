import { TransactionDashboard } from "@/types";

export const handleExportExcel = async (
  filteredTransactions: TransactionDashboard[],
  totalAmount: number
) => {
  // Dynamically import xlsx
  const XLSX = await import("xlsx");

  // Prepare data for export
  const exportData = filteredTransactions.map((trx, index) => ({
    No: index + 1,
    "Transaction ID": trx.transactionId,
    Product: trx.product,
    "Jenis Product": trx.productType,
    "Nama Pembeli": trx.customerName,
    Quantity: trx.quantity,
    Amount: trx.amount,
    Date: new Date(trx.date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    Status: trx.status.charAt(0).toUpperCase() + trx.status.slice(1),
  }));

  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(exportData);

  // Set column widths
  const colWidths = [
    { wch: 5 }, // No
    { wch: 15 }, // Transaction ID
    { wch: 25 }, // Product
    { wch: 15 }, // Jenis Product
    { wch: 20 }, // Nama Pembeli
    { wch: 10 }, // Quantity
    { wch: 15 }, // Amount
    { wch: 18 }, // Date
    { wch: 12 }, // Status
  ];
  ws["!cols"] = colWidths;

  // Style header row (row 1)
  const range = XLSX.utils.decode_range(ws["!ref"] || "A1");
  for (let C = range.s.c; C <= range.e.c; ++C) {
    const address = XLSX.utils.encode_col(C) + "1";
    if (!ws[address]) continue;
    ws[address].s = {
      font: { bold: true, color: { rgb: "FFFFFF" }, sz: 12 },
      fill: { fgColor: { rgb: "4472C4" } },
      alignment: { horizontal: "center", vertical: "center" },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    };
  }

  // Format Amount column as currency
  for (let R = range.s.r + 1; R <= range.e.r; ++R) {
    // Format Amount (column G/index 6)
    const amountCell = ws[XLSX.utils.encode_cell({ r: R, c: 6 })];
    if (amountCell && typeof amountCell.v === "number") {
      amountCell.z = "Rp #,##0";
    }

    // Add borders to all cells
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
      if (!ws[cellAddress]) continue;
      ws[cellAddress].s = {
        ...ws[cellAddress].s,
        border: {
          top: { style: "thin", color: { rgb: "D3D3D3" } },
          bottom: { style: "thin", color: { rgb: "D3D3D3" } },
          left: { style: "thin", color: { rgb: "D3D3D3" } },
          right: { style: "thin", color: { rgb: "D3D3D3" } },
        },
        alignment: { vertical: "center" },
      };
    }

    // Center align for No, Quantity, Status
    const noCell = ws[XLSX.utils.encode_cell({ r: R, c: 0 })];
    const qtyCell = ws[XLSX.utils.encode_cell({ r: R, c: 5 })];
    const statusCell = ws[XLSX.utils.encode_cell({ r: R, c: 8 })];

    if (noCell)
      noCell.s = {
        ...noCell.s,
        alignment: { horizontal: "center", vertical: "center" },
      };
    if (qtyCell)
      qtyCell.s = {
        ...qtyCell.s,
        alignment: { horizontal: "center", vertical: "center" },
      };
    if (statusCell)
      statusCell.s = {
        ...statusCell.s,
        alignment: { horizontal: "center", vertical: "center" },
      };

    // Right align for Amount
    if (amountCell)
      amountCell.s = {
        ...amountCell.s,
        alignment: { horizontal: "right", vertical: "center" },
      };
  }

  // Add summary row
  const summaryRowIndex = range.e.r + 2;
  ws[XLSX.utils.encode_cell({ r: summaryRowIndex, c: 5 })] = {
    v: "TOTAL:",
    s: {
      font: { bold: true },
      alignment: { horizontal: "right", vertical: "center" },
    },
  };
  ws[XLSX.utils.encode_cell({ r: summaryRowIndex, c: 6 })] = {
    v: totalAmount,
    z: "Rp #,##0",
    s: {
      font: { bold: true, color: { rgb: "4472C4" } },
      alignment: { horizontal: "right", vertical: "center" },
      fill: { fgColor: { rgb: "E7E6E6" } },
    },
  };

  // Update range to include summary
  ws["!ref"] = XLSX.utils.encode_range({
    s: { r: 0, c: 0 },
    e: { r: summaryRowIndex, c: range.e.c },
  });

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, "Transactions");

  // Generate filename with current date
  const filename = `Transactions_${
    new Date().toISOString().split("T")[0]
  }.xlsx`;

  // Save file
  XLSX.writeFile(wb, filename);
};
