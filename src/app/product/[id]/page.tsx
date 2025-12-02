import Error from "@/components/Error";
import ButtonShare from "@/components/pages/product/ButtonShare";
import ProductPurchaseBar from "@/components/pages/product/ProductPurchaseBar";
import BreadcrumbShop, { Link } from "@/components/pages/shop/BreadcrumbShop";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import ResponseError from "@/error/ResponseError";
import { DataProduct, ResponsePayload } from "@/types";
import { IconStarFilled, IconUserFilled } from "@tabler/icons-react";
import { Metadata } from "next";
import Image from "next/image";

type Props = {
  params: Promise<{ id: string }>;
};

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://lea-juice-app.vercel.app"
    : "http://localhost:3000";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;
  const response = await fetch(baseUrl + "/api/products?id=" + id, {
    credentials: "include",
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

  let dataProduct: DataProduct | null = null;
  let errorMessage: { message: string; code: number } | null = null;
  try {
    const response = await fetch(baseUrl + "/api/products?id=" + id, {
      credentials: "include",
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
  const data = [
    {
      name: "Glenn Rhee",
      commentAt: "7 Month Ago",
      stars: 5,
    },
    {
      name: "Glenn Rhee",
      commentAt: "7 Month Ago",
      stars: 4,
    },
    {
      name: "Glenn Rhee",
      commentAt: "7 Month Ago",
      stars: 3,
    },
    {
      name: "Glenn Rhee",
      commentAt: "7 Month Ago",
      stars: 2,
    },
    {
      name: "Glenn Rhee",
      commentAt: "7 Month Ago",
      stars: 1,
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
      <section className="max-w-6xl w-full mx-auto space-y-4 my-8 px-4 mb-8">
        <h4 className="text-stone-900 font-semibold text-2xl">Buyer reviews</h4>
        <div className="bg-gradient-to-b from-white flex justify-around via-orange-50 to-orange-100 border border-gray-300 rounded-sm py-5 px-8">
          <div className="space-y-3 w-full">
            <div className="flex items-end gap-x-3 text-stone-900 font-semibold text-xl">
              <IconStarFilled className="text-yellow-500" />
              <span>
                4.9<sub>/50</sub>
              </span>
            </div>
            <span className="text-stone-900">98% pembeli merasa puas</span>
          </div>
          <div className="flex flex-col w-full gap-y-2">
            <div className="flex text-xs font-medium text-gray-600 items-center gap-x-1">
              <IconStarFilled size={14} className="text-yellow-500" />
              <span>5</span>
              <Progress className="w-[15rem]" value={98} />
              <span>(57)</span>
            </div>
            <div className="flex text-xs font-medium text-gray-600 items-center gap-x-1">
              <IconStarFilled size={14} className="text-yellow-500" />
              <span>4</span>
              <Progress className="w-[15rem]" value={1} />
              <span>(1)</span>
            </div>
            <div className="flex text-xs font-medium text-gray-600 items-center gap-x-1">
              <IconStarFilled size={14} className="text-yellow-500" />
              <span>3</span>
              <Progress className="w-[15rem]" value={1} />
              <span>(1)</span>
            </div>
          </div>
          <div className="flex flex-col w-full gap-y-2">
            <div className="flex text-xs font-medium text-gray-600 items-center gap-x-1">
              <IconStarFilled size={14} className="text-yellow-500" />
              <span>2</span>
              <Progress className="w-[15rem]" value={0} />
              <span>(0)</span>
            </div>
            <div className="flex text-xs font-medium text-gray-600 items-center gap-x-1">
              <IconStarFilled size={14} className="text-yellow-500" />
              <span>1</span>
              <Progress className="w-[15rem]" value={0} />
              <span>(0)</span>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-6xl w-full mx-auto mt-8 flex gap-x-4 px-4 mb-8">
        <div className="w-full flex-1 h-fit sticky top-[6rem] bg-white border px-4 py-3 border-gray-300 rounded-sm shadow-sm">
          <h4 className="text-stone-900 font-semibold text-xl">
            Filter Ulasan
          </h4>
          <Separator className="bg-stone-700/40 my-3" />
          <h4 className="text-stone-900 font-medium text-lg">Rating</h4>
          <ul className="flex flex-col gap-y-4 mt-2">
            <li className="flex items-center gap-x-2">
              <Checkbox id="5" className="border border-gray-500 w-5 h-5" />
              <Label
                htmlFor="5"
                className="text-gray-600 text-lg font-semibold"
              >
                <IconStarFilled className="text-yellow-500" size={20} /> 5
              </Label>
            </li>
            <li className="flex items-center gap-x-2">
              <Checkbox id="4" className="border border-gray-500 w-5 h-5" />
              <Label
                htmlFor="4"
                className="text-gray-600 text-lg font-semibold"
              >
                <IconStarFilled className="text-yellow-500" size={20} /> 4
              </Label>
            </li>
            <li className="flex items-center gap-x-2">
              <Checkbox id="3" className="border border-gray-500 w-5 h-5" />
              <Label
                htmlFor="3"
                className="text-gray-600 text-lg font-semibold"
              >
                <IconStarFilled className="text-yellow-500" size={20} /> 3
              </Label>
            </li>
            <li className="flex items-center gap-x-2">
              <Checkbox id="2" className="border border-gray-500 w-5 h-5" />
              <Label
                htmlFor="2"
                className="text-gray-600 text-lg font-semibold"
              >
                <IconStarFilled className="text-yellow-500" size={20} /> 2
              </Label>
            </li>
            <li className="flex items-center gap-x-2">
              <Checkbox id="1" className="border border-gray-500 w-5 h-5" />
              <Label
                htmlFor="1"
                className="text-gray-600 text-lg font-semibold"
              >
                <IconStarFilled className="text-yellow-500" size={20} /> 1
              </Label>
            </li>
          </ul>
        </div>
        <div className="flex-3 w-full flex flex-col gap-y-7 ps-4">
          <div className="w-full pb-3 flex items-center gap-x-4">
            <div className="aspect-square rounded-full shadow-md bg-orange-100 w-10 h-10 flex items-center justify-center">
              <IconUserFilled className="text-orange-800" size={20} />
            </div>
            <div className="flex flex-col gap-y-2 w-full">
              <input
                type="text"
                className="border-b border-gray-500/40 w-full placeholder:text-stone-500 transition-colors text-stone-800 pb-2 placeholder:text-sm focus:border-b focus:outline-none focus:border-gray-600/70"
                placeholder="Add your comment..."
              />
              <div className="flex items-center w-full justify-between gap-x-2">
                <div className="flex items-center gap-x-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IconStarFilled
                      size={18}
                      key={i}
                      className="text-gray-500 transition-colors duration-200 hover:text-yellow-500 cursor-pointer"
                    />
                  ))}
                </div>
                <Button className="cursor-pointer" size={"sm"}>
                  Comment
                </Button>
              </div>
            </div>
          </div>
          {data.map((d, i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center gap-x-2">
                <div className="aspect-square rounded-full shadow-md bg-orange-100 w-10 h-10 flex items-center justify-center">
                  <IconUserFilled className="text-orange-800" size={20} />
                </div>
                <span className="text-stone-900 font-semibold">Glenn Rhee</span>
              </div>
              <span className="flex items-center text-gray-600 font-semibold text-sm gap-x-2 mt-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStarFilled
                    size={18}
                    key={i}
                    className="text-yellow-500"
                  />
                ))}
                7 bulan lalu
              </span>
              <p className="mt-4 text-gray-700 font-medium text-sm">
                Rasa jus nya jeruk banget enak banget euy. Recomennded deh!
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
