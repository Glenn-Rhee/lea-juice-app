"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Session } from "next-auth";

interface NavbarProps {
  token: Session | null;
}

export default function Navbar(props: NavbarProps) {
  const { token } = props;
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
        <div className="space-x-2">
          <Link
            href={"/shop"}
            className="bg-gradient-to-r cursor-pointer from-orange-400 to-orange-500 text-white px-8 py-[11px] rounded-full font-medium text-sm hover:shadow-lg transition-all duration-300"
          >
            Shop Now
          </Link>
          {token ? (
            <Button
              variant={"destructive"}
              className="cursor-pointer rounded-full px-8 py-5"
            >
              Logout
            </Button>
          ) : (
            <Link
              href={"/auth/login"}
              className="border border-orange-500 cursor-pointer text-orange-500 px-8 py-[11px] rounded-full font-medium text-sm hover:border-transparent hover:bg-orange-500 hover:text-white transition-all duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
