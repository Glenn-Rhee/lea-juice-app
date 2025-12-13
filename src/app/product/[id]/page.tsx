import Error from "@/components/Error";
import ButtonShare from "@/components/pages/product/ButtonShare";
import CommentSection from "@/components/pages/product/CommentSection";
import ProductPurchaseBar from "@/components/pages/product/ProductPurchaseBar";
import SummaryReviewCard from "@/components/pages/product/SummaryReviewCard";
import BreadcrumbShop, { Link } from "@/components/pages/shop/BreadcrumbShop";
import { Separator } from "@/components/ui/separator";
import ResponseError from "@/error/ResponseError";
import { DataProduct, ResponsePayload } from "@/types";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";

type Props = {
  params: Promise<{ id: string }>;
};

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://lea-juice-app.vercel.app"
    : "http://localhost:3000";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cookieStore = await cookies();
  const token =
    cookieStore.get("__Secure-next-auth.session-token") ??
    cookieStore.get("next-auth.session-token");

  const id = (await params).id;
  const response = await fetch(baseUrl + "/api/products?id=" + id, {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token?.value || ""}`,
    },
  });

  const dataResponse = (await response.json()) as ResponsePayload<DataProduct>;
  if (dataResponse.status === "failed") {
    return {
      title:
        dataResponse.code === 404
          ? "Product is not found!"
          : "Something went wrong",
      description:
        dataResponse.code === 404
          ? "We couldn't find a product with this ID. Please check and try again."
          : "An unexpected error occurred while retrieving the product.",
    };
  }

  return {
    title: `Detail product ${dataResponse.data.product_name}`,
    description: `Explore complete and detailed information about ${dataResponse.data.product_name}`,
  };
}

export default async function ProductPage({ params }: Props) {
  const id = (await params).id;
  const cookieStore = await cookies();
  const token =
    cookieStore.get("__Secure-next-auth.session-token") ??
    cookieStore.get("next-auth.session-token");

  let dataProduct: DataProduct | null = null;
  let errorMessage: { message: string; code: number } | null = null;
  try {
    const response = await fetch(baseUrl + "/api/products?id=" + id, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token?.value || ""}`,
      },
    });

    const dataResponse =
      (await response.json()) as ResponsePayload<DataProduct>;
    if (dataResponse.status === "failed") {
      throw new ResponseError(dataResponse.code, dataResponse.message);
    }

    dataProduct = dataResponse.data;
  } catch (error) {
    if (error instanceof ResponseError) {
      errorMessage = {
        code: error.code,
        message: error.message,
      };
    } else {
      errorMessage = {
        message: "An unexpected error occurred. Please try again later.",
        code: 500,
      };
    }
  }

  const links: Link[] = [
    { href: "/", text: "Home" },
    { href: "/shop", text: "Shop" },
    {
      href: "/shop?category=juice",
      text: dataProduct ? dataProduct.category.category_name : "all",
    },
  ];

  return (
    <div>
      <div className="pt-30 px-4 max-w-6xl mx-auto mb-8 md:flex gap-x-16">
        {errorMessage && !dataProduct ? (
          <Error
            code={errorMessage.code}
            message={errorMessage.message}
            className="text-stone-900"
          />
        ) : (
          dataProduct && (
            <>
              <div className="flex w-full items-center justify-between md:hidden mb-3">
                <BreadcrumbShop
                  links={links}
                  pageTitle={dataProduct.product_name}
                />
                <ButtonShare />
              </div>
              <Image
                src={dataProduct.image_url}
                alt={`Product image ${dataProduct.product_name}`}
                width={400}
                height={100}
                className="object-cover rounded-md w-[30rem] h-[30rem] shadow-md"
              />
              <div className="w-full">
                <div className="md:flex w-full items-center justify-between hidden">
                  <BreadcrumbShop
                    links={links}
                    pageTitle={dataProduct.product_name}
                  />
                  <ButtonShare />
                </div>
                <div className="mt-4 flex flex-col gap-y-4">
                  <h1 className="text-stone-800 font-bold text-3xl mt-4">
                    {dataProduct.product_name}
                  </h1>
                  <span className="text-orange-600 font-bold text-3xl">
                    Rp{dataProduct.price.toLocaleString("id-ID")}
                  </span>
                </div>
                <Separator className="w-full my-3 bg-slate-900" />
                <ProductPurchaseBar data={dataProduct} />
                <div className="mt-16">
                  <h4 className="text-stone-700 font-semibold text-2xl mt-4">
                    {dataProduct.product_name}
                  </h4>
                  <p className="text-gray-700 font-medium mt-3 text-justify">
                    {dataProduct.description}
                  </p>
                </div>
              </div>
            </>
          )
        )}
      </div>
      {dataProduct && (
        <>
          <SummaryReviewCard product_id={dataProduct.id} />
          <CommentSection
            token={token}
            imageUser={dataProduct.imageUrlUser}
            product_id={dataProduct.id}
          />
        </>
      )}
    </div>
  );
}
