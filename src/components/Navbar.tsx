"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  if (pathname.includes("/auth")) return null;
  return (
    <nav className="fixed w-full z-50 px-8 " id="navbar">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          href={"/"}
          className="serif-font text-3xl font-bold text-stone-900"
        >
          <Image
            src={"/logojus2.png"}
            alt="Lea Juice Logo"
            width={100}
            height={100}
          />
        </Link>
        <div className="hidden md:flex space-x-12 text-sm text-stone-700">
          <a href="#home" className="nav-link">
            HOME
          </a>
          <a href="#collection" className="nav-link">
            COLLECTION
          </a>
          <a href="#story" className="nav-link">
            OUR STORY
          </a>
          <a href="#testimonials" className="nav-link">
            REVIEWS
          </a>
        </div>
        <button className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-8 py-3 rounded-full font-medium text-sm hover:shadow-lg transition-all duration-300">
          Shop Now
        </button>
      </div>
    </nav>
  );
}
