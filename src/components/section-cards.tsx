import {
  IconTrendingUp,
  IconClock,
  IconPackage,
  IconStar,
  IconAlertTriangle,
  IconTrendingDown,
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DataBestSeller,
  DataNewOrder,
  DataProductLowStock,
  DataTotalRevenue,
} from "@/types";
import { getPercentRevenue } from "@/helper/getPercentRevenue";
import Link from "next/link";

interface SectionCardsProps {
  dataTotalRevenu: DataTotalRevenue;
  dataNewOrder: DataNewOrder;
  dataBestSeller: DataBestSeller;
  dataProductLowStock: DataProductLowStock;
}

export function SectionCards(props: SectionCardsProps) {
  const { dataTotalRevenu, dataNewOrder, dataBestSeller, dataProductLowStock } =
    props;
  const totalToday = dataTotalRevenu.today.reduce(
    (prev, curr) => prev + curr.total_price,
    0
  );
  const totalYesterday = dataTotalRevenu.yesterday.reduce(
    (prev, curr) => prev + curr.total_price,
    0
  );

  const revenueSummary = getPercentRevenue(totalToday, totalYesterday);
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <CardDescription>Total Penjualan Hari Ini</CardDescription>
            <Badge variant="outline" className="shrink-0">
              {revenueSummary.type === "increase" ? (
                <IconTrendingUp className="size-4" />
              ) : revenueSummary.type === "decrease" ? (
                <IconTrendingDown className="size-4" />
              ) : (
                ""
              )}
              {(revenueSummary.type === "increase"
                ? "+"
                : revenueSummary.type === "decrease"
                ? "-"
                : "") + revenueSummary.percent.toFixed(1)}
              %
            </Badge>
          </div>
          <CardTitle className="text-3xl font-semibold tabular-nums @[250px]/card:text-4xl mt-2">
            Rp {totalToday.toLocaleString("id-ID")}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm pt-2">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {revenueSummary.type === "increase"
              ? "Naik"
              : revenueSummary.type === "decrease"
              ? "Turun"
              : "Stable"}{" "}
            dari kemarin{" "}
            {revenueSummary.type === "increase" ? (
              <IconTrendingUp className="size-4" />
            ) : revenueSummary.type === "decrease" ? (
              <IconTrendingDown className="size-4" />
            ) : (
              ""
            )}
          </div>
          <div className="text-muted-foreground">
            {dataTotalRevenu.today.length} transaksi berhasil
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <Link href={"/dashboard/transactions"} className="@container/card">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <CardDescription>Pesanan Baru</CardDescription>
              <Badge variant="outline" className="shrink-0">
                <IconClock className="size-3" />
                {dataNewOrder.pending} Pending
              </Badge>
            </div>
            <CardTitle className="text-3xl font-semibold tabular-nums @[250px]/card:text-4xl mt-7 text-center">
              {dataNewOrder.total}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm pt-2">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {dataNewOrder.process} pesanan diproses{" "}
              <IconPackage className="size-4" />
            </div>
            <div className="text-muted-foreground">Perlu konfirmasi segera</div>
          </CardFooter>
        </Link>
      </Card>

      <Card className="@container/card">
        <Link href={"/dashboard/products"} className="@container/card">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <CardDescription>Produk Terlaris</CardDescription>
              <Badge variant="outline" className="shrink-0">
                <IconTrendingUp className="size-3" />
                {dataBestSeller.sold} Sold
              </Badge>
            </div>
            <CardTitle className="text-xl font-semibold tabular-nums mt-7 text-center">
              {dataBestSeller.productName}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm pt-2">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Best seller minggu ini{" "}
              <IconStar className="size-4 fill-yellow-400 text-yellow-400" />
            </div>
            <div className="text-muted-foreground">
              Stok tersisa {dataBestSeller.stock}
            </div>
          </CardFooter>
        </Link>
      </Card>

      <Card className="@container/card">
        <Link href={"/dashboard/products"} className="@container/card">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              {dataProductLowStock.products.length === 0 ? (
                <CardDescription>Stok Product Aman</CardDescription>
              ) : (
                <>
                  <CardDescription>Stok Menipis</CardDescription>
                  <Badge variant="destructive" className="shrink-0">
                    <IconTrendingUp className="size-3" />
                    Urgent
                  </Badge>
                </>
              )}
            </div>
            <CardTitle className="text-xl font-semibold tabular-nums mt-7 text-center">
              {dataProductLowStock.totalProduct} Produk
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            {dataProductLowStock.products.length > 0 ? (
              <span className="line-clamp-1 flex gap-2 font-medium">
                Perlu restock segera <IconAlertTriangle className="size-4" />
              </span>
            ) : (
              <span className="line-clamp-1 flex gap-2 font-medium">
                Semua product dalam stock aman
              </span>
            )}
            <div className="text-muted-foreground flex items-center">
              {dataProductLowStock.products.map((product) => (
                <span key={product.id}>{product.product_name} </span>
              ))}
            </div>
          </CardFooter>
        </Link>
      </Card>
    </div>
  );
}
