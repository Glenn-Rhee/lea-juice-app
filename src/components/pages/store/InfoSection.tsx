export default function InfoSection() {
  return (
    <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg border-2 border-orange-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Why Visit <span className="text-orange-500">Lea Juice?</span>
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="text-center p-6 bg-orange-50 rounded-xl">
          <div className="text-4xl mb-3">🍊</div>
          <h3 className="font-bold text-lg text-gray-900 mb-2">
            Fresh Ingredients
          </h3>
          <p className="text-sm text-gray-600">
            We use only the freshest fruits picked daily to ensure the best
            quality juice
          </p>
        </div>
        <div className="text-center p-6 bg-orange-50 rounded-xl">
          <div className="text-4xl mb-3">💚</div>
          <h3 className="font-bold text-lg text-gray-900 mb-2">100% Natural</h3>
          <p className="text-sm text-gray-600">
            No added sugar, no preservatives, no artificial flavors - just pure
            goodness
          </p>
        </div>
        <div className="text-center p-6 bg-orange-50 rounded-xl">
          <div className="text-4xl mb-3">⚡</div>
          <h3 className="font-bold text-lg text-gray-900 mb-2">
            Made to Order
          </h3>
          <p className="text-sm text-gray-600">
            Every juice is freshly made when you order to preserve maximum
            nutrients
          </p>
        </div>
      </div>
    </div>
  );
}
