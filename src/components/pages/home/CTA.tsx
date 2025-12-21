import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-18 px-6 bg-gradient-to-br from-orange-400 to-amber-500">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-8">
          Start Your Wellness Journey
        </h2>
        <p className="text-white/90 text-lg md:text-xl mb-8 md:mb-12">
          Subscribe and get 20% off your first order
        </p>
        <Link
          href={"/shop"}
          className="bg-stone-900 text-white px-6 py-2 md:px-8 md:py-4 text-lg md:text-2xl rounded-full font-semibold hover:bg-stone-800 transition-all duration-300"
        >
          Try Now
        </Link>
      </div>
    </section>
  );
}
