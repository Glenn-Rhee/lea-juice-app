import { testimonials } from "@/utils/testimonials";

export default function Testimonials() {
  return (
    <div className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="uppercase text-orange-500 text-sm tracking-widest font-medium">
            testimonials
          </span>
          <h2 className="text-6xl md:text-7xl font-bold text-stone-900 mt-4">
            Loved by Thousands
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <span className="text-yellow-400 text-xl mb-4">★★★★★</span>
              <p className="text-stone-600 mb-6 leading-relaxed">{t.comment}</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full mr-4" />
                <div className="flex flex-col">
                  <span className="font-semibold text-stone-900">{t.name}</span>
                  <span className="text-stone-400 text-sm">{t.city}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
