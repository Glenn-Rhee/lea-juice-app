import Error from "@/components/Error";
import EmptyProduct from "@/components/pages/dashboard/products/EmptyProduct";
import ProductHeader from "@/components/pages/dashboard/products/ProductHeader";
import TableProduct from "@/components/pages/dashboard/products/TableProduct";
import ResponseError from "@/error/ResponseError";
import { DataProduct, ResponsePayload } from "@/types";
import { Metadata } from "next";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://lea-juice-app.vercel.app"
    : "http://localhost:3000";

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const query = (await searchParams).q;
  const c = (await searchParams).c;

  const response = await fetch(
    `${baseUrl}/api/products` +
      (query ? `?q=${query}${c ? `&c=${c}` : ""}` : "")
  );
  const dataProducts = (await response.json()) as ResponsePayload<
    DataProduct[]
  >;

  if (dataProducts.status === "failed") {
    return {
      title: "Error getting products",
      description:
        "There was an error retrieving the products. Please try again later.",
    };
  }

  return {
    title: query ? `Result for ${query}` : "Dashboard Products",
    description:
      "Manage and oversee your product listings, including adding new products, updating existing ones, and monitoring inventory levels to ensure optimal stock availability.",
  };
}

export default async function ProductsDashboardPage({ searchParams }: Props) {
  const query = (await searchParams).q;
  const c = (await searchParams).c;
  let dataProducts: DataProduct[] | null = null;
  let errorMessage: { message: string; code: number } | null = null;
  try {
    const response = await fetch(
      `${baseUrl}/api/products` +
        (query ? `?q=${query}${c ? `&c=${c}` : ""}` : "")
    );
    const dataResponse = (await response.json()) as ResponsePayload<
      DataProduct[]
    >;
    if (dataResponse.status === "failed") {
      throw new ResponseError(dataResponse.code, dataResponse.message);
    }
    dataProducts = dataResponse.data;
    errorMessage = null;
  } catch (error) {
    if (error instanceof ResponseError) {
      errorMessage = {
        message: error.message,
        code: error.code,
      };
    } else {
      errorMessage = {
        message: "An unexpected error occurred. Please try again later.",
        code: 500,
      };
    }

    dataProducts = null;
  }

  const isEmpty = dataProducts?.length === 0;
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
          {errorMessage && !dataProducts ? (
            <Error code={errorMessage.code} message={errorMessage.message} />
          ) : isEmpty && !errorMessage ? (
            <EmptyProduct
              message={query ? query + " is not found" : "Product still empty"}
            />
          ) : (
            <>
              <ProductHeader />
              <TableProduct products={dataProducts!} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
