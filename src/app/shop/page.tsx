import Error from "@/components/Error";
import EmptyProduct from "@/components/pages/dashboard/products/EmptyProduct";
import BreadcrumbShop from "@/components/pages/shop/BreadcrumbShop";
import Products from "@/components/pages/shop/Products";
import TabShop from "@/components/pages/shop/TabShop";
import ResponseError from "@/error/ResponseError";
import { cn } from "@/lib/utils";
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
  const search = (await searchParams).s;

  return {
    title: search ? "Search for " + search : "Our Juice, salad, and fruits",
    description: search
      ? "Our products are the best in the world"
      : "Description for product " + search,
  };
}

export default async function ShopePage({ searchParams }: Props) {
  const search = (await searchParams).s;
  const category = (await searchParams).category;
  const links = [{ href: "/", text: "Home" }];
  let dataProducts: DataProduct[] | null = null;
  let errorMessage: { message: string; code: number } | null = null;
  let bestSellerProducts: DataProduct[] | null = null;
  try {
    const response = await fetch(
      `${baseUrl}/api/products` +
        (search
          ? `?q=${search}${
              category ? `&c=${(category as string).toUpperCase()}` : ""
            }`
          : "")
    );
    const res = await fetch(baseUrl + "/api/products?best=true");
    const dataRes = (await res.json()) as ResponsePayload<DataProduct[]>;
    if (dataRes.status === "failed") {
      throw new ResponseError(dataRes.code, dataRes.message);
    }

    const dataResponse = (await response.json()) as ResponsePayload<
      DataProduct[]
    >;
    if (dataResponse.status === "failed") {
      throw new ResponseError(dataResponse.code, dataResponse.message);
    }

    bestSellerProducts = dataRes.data;
    dataProducts = dataResponse.data;
    errorMessage = null;
  } catch (error) {
    bestSellerProducts = null;
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

  return (
    <div className="pt-28 px-4 max-w-7xl mx-auto mb-8">
      {errorMessage ? (
        <Error
          className="text-stone-900"
          code={errorMessage.code}
          message={errorMessage.message}
        />
      ) : (
        dataProducts &&
        bestSellerProducts && (
          <>
            {!search && !category && bestSellerProducts.length > 0 && (
              <>
                <BreadcrumbShop links={links} pageTitle="Shop" />
                <h2 className="text-stone-800 font-semibold text-3xl mt-4">
                  Top Sellers
                </h2>
                <Products data={bestSellerProducts} />
              </>
            )}
            <h2
              className={cn(
                "text-stone-800 font-semibold text-3xl",
                search ? "" : "mt-4"
              )}
            >
              {search
                ? "Result for " + search
                : category
                ? "Result for category " + category
                : "Explore our juices"}
            </h2>
            {dataProducts.length === 0 ? (
              <EmptyProduct
                className="text-slate-900"
                goBack="/shop"
                message={`${search} is not found!`}
              />
            ) : (
              <TabShop data={dataProducts} />
            )}
          </>
        )
      )}
    </div>
  );
}
