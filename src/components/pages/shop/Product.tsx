import Image from "next/image";
import Link from "next/link";

export default function Product() {
  return (
    <div className="shadow-lg px-4 pt-2 pb-4 rounded-lg">
      <Link href={"/juice/1"}>
        <Image
          src={"/foto jus alpukat.png"}
          alt="Jus Alpukat"
          width={312}
          height={712}
        />
        <div className="mt-4">
          <h6 className="font-semibold text-stone-900 text-xl">Jus Alpukat</h6>
          <span className="text-stone-400 text-sm font-medium">Rp20.000</span>
        </div>
      </Link>
      <button className="w-full mt-4 bg-white border py-2 rounded-full cursor-pointer border-orange-600 hover:bg-orange-600 text-orange-500 hover:text-white transition-colors duration-300">
        Add to chart
      </button>
    </div>
  );
}
