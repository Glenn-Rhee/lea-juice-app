import ButtonShare from "@/components/pages/product/ButtonShare";
import ProductPurchaseBar from "@/components/pages/product/ProductPurchaseBar";
import BreadcrumbShop, { Link } from "@/components/pages/shop/BreadcrumbShop";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import Image from "next/image";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;

  return {
    title: `Product ${id}`,
  };
}

export default async function ProductPage({ params }: Props) {
  const id = (await params).id;
  const links: Link[] = [
    { href: "/", text: "Home" },
    { href: "/shop", text: "Shop" },
    { href: "/juice", text: "Juice" },
  ];

  return (
    <div className="pt-30 px-4 max-w-6xl mx-auto mb-8 flex gap-x-16">
      <Image
        src={"/foto jus pisang.png"}
        alt={`Product with id ${id}`}
        width={400}
        height={100}
        className="rounded-md shadow-xl"
      />
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <BreadcrumbShop links={links} pageTitle={`Product with id ${id}`} />
          <ButtonShare />
        </div>
        <div className="mt-4 flex flex-col gap-y-4">
          <h1 className="text-stone-800 font-bold text-3xl mt-4">
            Banana Smoothie
          </h1>
          <span className="text-orange-600 font-bold text-3xl">Rp20.000</span>
        </div>
        <Separator className="w-full my-3 bg-slate-900" />
        <ProductPurchaseBar />
        <div className="mt-16">
          <h4 className="text-stone-700 font-semibold text-2xl mt-4">
            Banana Smoothie
          </h4>
          <p className="text-gray-700 font-medium mt-3 text-justify">
            Banana Smoothie adalah minuman kental, dingin, dan menyegarkan yang
            dibuat dengan bahan dasar utama pisang yang dihaluskan. Minuman ini
            dibedakan dari &quot;jus&quot; biasa karena memiliki tekstur yang
            jauh lebih tebal, lembut, dan creamy, sebab seluruh serat dari buah
            ikut diolah, bukan hanya sarinya
          </p>
        </div>
      </div>
    </div>
  );
}
