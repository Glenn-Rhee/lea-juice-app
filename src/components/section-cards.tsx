import {
  IconTrendingUp,
  IconClock,
  IconPackage,
  IconStar,
  IconAlertTriangle,
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <CardDescription>Total Penjualan Hari Ini</CardDescription>
            <Badge variant="outline" className="shrink-0">
              <IconTrendingUp className="size-3" />
              +18.2%
            </Badge>
          </div>
          <CardTitle className="text-3xl font-semibold tabular-nums @[250px]/card:text-4xl mt-2">
            Rp 2.450.000
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm pt-2">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Naik dari kemarin <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">125 transaksi berhasil</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <CardDescription>Pesanan Baru</CardDescription>
            <Badge variant="outline" className="shrink-0">
              <IconClock className="size-3" />
              12 Pending
            </Badge>
          </div>
          <CardTitle className="text-3xl font-semibold tabular-nums @[250px]/card:text-4xl mt-7 text-center">
            47
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm pt-2">
          <div className="line-clamp-1 flex gap-2 font-medium">
            35 pesanan diproses <IconPackage className="size-4" />
          </div>
          <div className="text-muted-foreground">Perlu konfirmasi segera</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <CardDescription>Produk Terlaris</CardDescription>
            <Badge variant="outline" className="shrink-0">
              <IconTrendingUp className="size-3" />
              85 Sold
            </Badge>
          </div>
          <CardTitle className="text-3xl font-semibold tabular-nums @[250px]/card:text-4xl mt-7 text-center">
            Lemon Mints
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm pt-2">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Best seller minggu ini{" "}
            <IconStar className="size-4 fill-yellow-400 text-yellow-400" />
          </div>
          <div className="text-muted-foreground">Stok tersisa 23 botol</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <CardDescription>Stok Menipis</CardDescription>
            <Badge variant="destructive" className="shrink-0">
              <IconTrendingUp className="size-3" />
              Urgent
            </Badge>
          </div>
          <CardTitle className="text-3xl font-semibold tabular-nums @[250px]/card:text-4xl mt-7 text-center">
            8 Produk
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Perlu restock segera <IconAlertTriangle className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Orange Blast, Apple Fresh, dll
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
