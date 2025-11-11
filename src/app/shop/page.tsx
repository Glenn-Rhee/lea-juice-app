import BreadcrumbShop from "@/components/pages/shop/BreadcrumbShop";
import Products from "@/components/pages/shop/Products";
import TabShop from "@/components/pages/shop/TabShop";

export default function ShopePage() {
  const links = [{ href: "/", text: "Home" }];
  return (
    <div className="pt-28 px-4 max-w-7xl mx-auto mb-8">
      <BreadcrumbShop links={links} pageTitle="Shop" />
      <h2 className="text-stone-800 font-semibold text-3xl mt-4">
        Top Sellers
      </h2>
      <Products />
      <h2 className="text-stone-800 font-semibold text-3xl mt-4">
        Explore our Juices
      </h2>
      <TabShop />
    </div>
  );
}
