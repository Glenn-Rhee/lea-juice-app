import { productsHighlight } from "@/utils/products-highlight";
import Image from "next/image";

export default function Collection() {
  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-orange-500 text-sm tracking-widest font-medium">
            Premium Collection
          </span>
          <h2 className="text-6xl md:text-7xl font-bold text-stone-900 mt-4 mb-6">
            Signature Blends
          </h2>
          <p className="text-stone-500 text-lg max-w-2xl mx-auto">
            Each bottle is a masterpiece of taste, crafted with passion and
            precision
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {productsHighlight.map((p, i) => (
            <div key={i} className="product-card-premium">
              <div className="product-image-wrapper">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  className="product-bottle w-full h-full object-cover object-left"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="uppercase text-orange-500 text-xs tracking-widest font-medium">
                    {p.category}
                  </span>
                  <span className="text-yellow-400">★★★★★</span>
                </div>
                <h3 className="text-3xl font-bold text-stone-900 mb-3">
                  {p.title}
                </h3>
                <p className="text-stone-500 mb-6 leading-relaxed text-sm">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
