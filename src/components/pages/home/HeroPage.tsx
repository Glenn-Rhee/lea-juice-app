import Image from "next/image";

export default function HeroPage() {
  return (
    <section className="w-screen h-screen relative bg-gradient-to-br from-[#fef3e200] via-[#fae6d07c] to-[#f8dcc8]">
      <div className="w-[500px] h-[500px] gradient-orb -top-[10%] -left-[10%] bg-[#ff8c42]" />
      <div className="w-[400px] h-[400px] gradient-orb -top-[10%] -left-[10%] bg-[#ffa726] delay-[-10s]" />
      <div className="particle left-[20%] delay-0" />
      <div className="particle left-[40%] delay-[3s]" />
      <div className="particle left-[80%] delay-[9s]" />
      <div className="particle left-[30%] delay-[12s]" />

      <div
        className="bottle-container parallax-element left-[15%] top-[25%]"
        data-speed="0.3s"
      >
        <Image
          src="/satu.png"
          width={150}
          height={300}
          alt="Orange Juice"
          className="bottle-left"
        />
      </div>
      <div
        className="bottle-container parallax-element -translate-x-1/2 left-[50%] top-[15%]"
        data-speed="0.5s"
      >
        <Image
          src="/satu.png"
          width={150}
          height={300}
          alt="Orange Juice"
          className="bottle-main"
        />
      </div>
      <div
        className="bottle-container parallax-element right-[15%] top-[30%]"
        data-speed="0.4s"
      >
        <Image
          src="/satu.png"
          width={150}
          height={300}
          alt="Orange Juice"
          className="bottle-right"
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="text-center px-6 max-w-4xl">
          <div className="mb-6 reveal" />
          <h1 className="text-7xl md:text-9xl font-bold text-stone-900 mb-6 delay-[0.1s]">
            Pure Taste <br /> <span className="text-[#e4842b]">Pure Life</span>
          </h1>
          <p className="text-stone-600 text-xl md:text-2xl mb-12 font-light delay-[0.2s]">
            Handcrafted wellness in every bottle
          </p>
          <button className="btn-premium cursor-pointer pointer-events-auto delay-[0.3s]">
            Explore Collection
          </button>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center z-10">
        <div className="w-px h-20 bg-gradient-to-b from-orange-400 to-transparent mx-auto" />
      </div>
    </section>
  );
}
