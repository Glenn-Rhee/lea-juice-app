"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Session } from "next-auth";
import { useState } from "react";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { IconSearch, IconShoppingCart, IconUser } from "@tabler/icons-react";
import SheetShop from "./pages/shop/SheetShop";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

interface NavbarProps {
  token: Session | null;
}

export default function Navbar(props: NavbarProps) {
  const { token } = props;
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  if (pathname.includes("/auth")) return null;

  async function handleLogout() {
    setLoading(true);
    try {
      await signOut();
      toast.success("Logout successfully!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("An error while logout! Please try again later!");
      } else {
        toast.error("An error occured!");
      }
    } finally {
      setLoading(false);
    }
  }

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
            width={80}
            height={80}
          />
        </Link>
        <div className="hidden md:flex space-x-12 text-sm text-stone-700">
          <Link
            href={
              pathname.includes("/shop") || pathname.includes("/product")
                ? "/"
                : "#home"
            }
            className="nav-link"
          >
            HOME
          </Link>
          <Link
            href={
              pathname.includes("/shop") || pathname.includes("/product")
                ? "/shop"
                : "#collection"
            }
            className="nav-link"
          >
            COLLECTION
          </Link>
          {pathname.includes("/shop") || pathname.includes("/product") ? (
            <Link href={"/store"} className="nav-link">
              STORE
            </Link>
          ) : (
            <>
              <Link href="#story" className="nav-link">
                OUR STORY
              </Link>
              <Link href="#testimonials" className="nav-link">
                REVIEWS
              </Link>
            </>
          )}
        </div>
        <div className="space-x-2">
          {!pathname.includes("/shop") && !pathname.includes("/product") ? (
            <>
              <Link
                href={"/shop"}
                className="bg-gradient-to-r cursor-pointer from-orange-400 to-orange-500 text-white px-8 py-[11px] rounded-full font-medium text-sm hover:shadow-lg transition-all duration-300"
              >
                Shop Now
              </Link>
              {token ? (
                <Button
                  variant={"destructive"}
                  type="button"
                  onClick={handleLogout}
                  disabled={loading}
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
            </>
          ) : (
            <div className="relative flex items-center gap-x-3">
              <input
                type="search"
                placeholder="Search.."
                className={cn(
                  "bg-transparent border border-orange-500 transition-all px-3 py-1.5 text-sm outline-none me-2 absolute top-1/2 -translate-y-1/2 right-[100%] duration-300 rounded-sm w-full",
                  open
                    ? "w-40 md:w-56 translate-x-0"
                    : "w-0 opacity-0 pointer-events-none"
                )}
              />
              <button
                onClick={() => {
                  setOpen((prev) => !prev);
                }}
                className="cursor-pointer text-stone-700 hover:text-slate-900 transition-colors"
              >
                <IconSearch />
              </button>
              <button className="cursor-pointer text-stone-700 hover:text-slate-900 transition-colors">
                <IconUser />
              </button>
              <SheetShop>
                <button className="cursor-pointer relative text-stone-700 hover:text-slate-900 transition-colors">
                  <IconShoppingCart />
                  <span className="w-6 h-6 text-xs font-medium text-white flex items-center justify-center rounded-full absolute -top-2 -right-3 bg-orange-600 aspect-square">
                    9+
                  </span>
                </button>
              </SheetShop>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
