import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import TableTransaction from "@/components/pages/dashboard/TableTransaction";
import { Metadata } from "next";
import { DataStatistic, ResponsePayload } from "@/types";
import ResponseError from "@/error/ResponseError";
import Error from "@/components/Error";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Dashboard page",
  description: "Lea Juice sales summary",
};

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://lea-juice-app.vercel.app"
    : "http://localhost:3000";

export default async function dashboardPage() {
  const cookieStore = await cookies();
  const token =
    cookieStore.get("__Secure-next-auth.session-token") ??
    cookieStore.get("next-auth.session-token");

  let errormsg: { code: number; message: string } | null = null;
  let dataStatistic: DataStatistic | null = null;
  try {
    const res = await fetch(baseUrl + "/api/statistic", {
      headers: {
        Authorization: `Bearer ${token?.value || ""}`,
      },
    });
    const dataRes = (await res.json()) as ResponsePayload<DataStatistic>;
    if (dataRes.status === "failed") {
      throw new ResponseError(dataRes.code, dataRes.message);
    }

    dataStatistic = dataRes.data;
    errormsg = null;
  } catch (error) {
    if (error instanceof ResponseError) {
      errormsg = {
        code: error.code,
        message: error.message,
      };
    } else {
      errormsg = {
        code: 500,
        message: "An error occured! Please try again later!",
      };
    }
  }
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        {errormsg && !dataStatistic ? (
          <Error code={errormsg.code} message={errormsg.message} />
        ) : (
          dataStatistic && (
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards
                dataTotalRevenu={dataStatistic.dataTotalRevenue}
                dataNewOrder={dataStatistic.dataNewOrder}
                dataBestSeller={dataStatistic.dataBestSeller}
                dataProductLowStock={dataStatistic.dataProductLowStock}
              />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive
                  dataTotalRevenue={dataStatistic.dataTotalRevenue}
                />
              </div>
              <TableTransaction />
            </div>
          )
        )}
      </div>
    </div>
  );
}
