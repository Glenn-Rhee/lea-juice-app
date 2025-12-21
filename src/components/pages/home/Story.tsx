import Image from "next/image";

export default function Story() {
  return (
    <section
      id="story"
      className="py-32 px-6 bg-gradient-to-br from-orange-50 to-amber-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-orange-500 text-sm tracking-widest font-medium">
              OUR PHILOSOPHY
            </span>
            <h2 className="text-5xl md:text-6xl font-bold text-stone-900 mt-4 mb-8">
              Crafted with <br />{" "}
              <span className="text-[#ff8c42]">Intention</span>
            </h2>
            <p className="text-stone-600 text-base md:text-lg leading-relaxed mb-8">
              Every bottle begins with a simple promise: to deliver
              nature&apos;s finest ingredients in their purest form. We partner
              with organic farms, cold-press within hours of harvest, and never
              compromise on quality.
            </p>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 text-xl flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold text-stone-900 mb-1">
                    Cold-Pressed Excellence
                  </h4>
                  <p className="text-stone-500 text-sm">
                    Maximum nutrients preserved through gentle extraction
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 text-xl flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold text-stone-900 mb-1">
                    Organic & Sustainable
                  </h4>
                  <p className="text-stone-500 text-sm">
                    Certified organic ingredients from ethical farms
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 text-xl flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold text-stone-900 mb-1">
                    Nothing Artificial
                  </h4>
                  <p className="text-stone-500 text-sm">
                    Zero preservatives, additives, or refined sugars
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="aspect-square bg-gradient-to-br from-orange-100 to-amber-100 rounded-3xl flex items-center justify-center overflow-hidden">
              <Image
                src={"/jus-mangga.png"}
                alt="Our Juice"
                className="w-full h-full rounded-2xl object-cover object-left"
                fill
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
