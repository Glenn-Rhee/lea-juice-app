import Error from "@/components/Error";
import { columns, Transaction } from "@/components/pages/transaction/Columns";
import DataTable from "@/components/pages/transaction/DataTable";
import ResponseError from "@/error/ResponseError";
import { ResponsePayload } from "@/types";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://lea-juice-app.vercel.app"
    : "http://localhost:3000";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const token =
    cookieStore.get("__Secure-next-auth.session-token") ??
    cookieStore.get("next-auth.session-token");

  try {
    const response = await fetch(`${baseUrl}/api/transaction`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token?.value || ""}`,
      },
    });

    const dataTransaction = (await response.json()) as ResponsePayload;
    if (dataTransaction.status === "failed") {
      throw new ResponseError(dataTransaction.code, dataTransaction.message);
    }

    return {
      title: "Detail transaction",
      description: "You can see your detail transaction you made!",
    };
  } catch (error) {
    if (error instanceof ResponseError) {
      return {
        title: error.message,
      };
    }

    return {
      title: "An error occured!",
    };
  }
}

export default async function TransactionPage() {
  const cookieStore = await cookies();
  const token =
    cookieStore.get("__Secure-next-auth.session-token") ??
    cookieStore.get("next-auth.session-token");
  let dataTransaction: Transaction[] = [];
  let errorMsg: { message: string; code: number } | null = null;
  try {
    const response = await fetch(`${baseUrl}/api/transaction`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token?.value || ""}`,
      },
    });

    const dataResponse = (await response.json()) as ResponsePayload<
      Transaction[]
    >;
    if (dataResponse.status === "failed") {
      throw new ResponseError(dataResponse.code, dataResponse.message);
    }

    dataTransaction = dataResponse.data;
  } catch (error) {
    if (error instanceof ResponseError) {
      errorMsg = {
        code: error.code,
        message: error.message,
      };
    } else {
      errorMsg = {
        code: 500,
        message: "An error occured while get transaction!",
      };
    }
  }

  return (
    <div className="pt-24 px-4 max-w-7xl mx-auto mb-8 bg-gray-100">
      {errorMsg ? (
        <Error
          code={errorMsg.code}
          message={errorMsg.message}
          className="text-stone-900"
        />
      ) : dataTransaction.length === 0 ? (
        <div className="w-full h-[80vh] flex flex-col items-center justify-center">
          <Image
            src={"/empty-cart.png"}
            alt="Empty cart image"
            width={200}
            height={200}
          />

          <h1 className="text-3xl font-bold text-stone-900">
            Transaction still empty!
          </h1>
          <Link
            href={"/shop"}
            className="text-xl font-medium text-stone-800 hover:underline"
          >
            Let&apos;s try add to chart
          </Link>
        </div>
      ) : (
        <>
          <h1 className="text-center font-bold text-4xl text-slate-900 mb-6">
            Transaction History
          </h1>
          <DataTable columns={columns} data={dataTransaction} />
        </>
      )}
    </div>
  );
}
