import BreadcrumbShop from "@/components/pages/shop/BreadcrumbShop";
import Products from "@/components/pages/shop/Products";
import TabShop from "@/components/pages/shop/TabShop";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

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

  return (
    <div className="pt-28 px-4 max-w-7xl mx-auto mb-8">
      {!search && !category && (
        <>
          <BreadcrumbShop links={links} pageTitle="Shop" />
          <h2 className="text-stone-800 font-semibold text-3xl mt-4">
            Top Sellers
          </h2>
          <Products />
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
      <TabShop />
    </div>
  );
}
