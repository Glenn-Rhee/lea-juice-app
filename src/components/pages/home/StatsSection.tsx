export default function StatsSection() {
  return (
    <section className="py-24 px-6 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <span className="text-stone-500 text-sm tracking-wider mt-2">
              ORGANIC
            </span>
          </div>
          <div className="stat-item">
            <div className="stat-number">50K+</div>
            <span className="text-stone-500 text-sm tracking-wider mt-2">
              Customers
            </span>
          </div>
          <div className="stat-item">
            <div className="stat-number">15+</div>
            <span className="text-stone-500 text-sm tracking-wider mt-2">
              Flavors
            </span>
          </div>
          <div className="stat-item">
            <div className="stat-number">4.9★</div>
            <span className="text-stone-500 text-sm tracking-wider mt-2">
              Rating
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
