"use client";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Session } from "next-auth";
import { Button } from "./ui/button";
import Searchbar from "./Searchbar";
import UserProfile from "./UserProfile";
import { handleLogout } from "./Navbar";
import SheetShop from "./pages/shop/SheetShop";
import { IconShoppingCart } from "@tabler/icons-react";
import { useCartItems } from "@/lib/product-queries";

interface NavbarMobileProps {
  token: Session | null;
}

export default function NavbarMobile({ token }: NavbarMobileProps) {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data, isLoading } = useCartItems();

  useEffect(() => {
    if (active) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [active]);

  return (
    <div className="flex md:hidden items-center gap-x-2">
      {pathname !== "/" && <Searchbar />}
      <button
        onClick={() => setActive((prev) => !prev)}
        className="block relative z-[99999] md:hidden text-primary hover:text-primary/80"
        type="button"
      >
        {active ? <X /> : <Menu />}
      </button>
      <motion.div
        initial={{
          x: 400,
          opacity: 0,
        }}
        variants={{
          open: {
            x: 0,
            opacity: 1,
          },
          closed: {
            x: 400,
            opacity: 0,
          },
        }}
        animate={active ? "open" : "closed"}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
        className="fixed top-0 right-0 flex flex-col justify-between bottom-0 z-50 bg-orange-100/90 w-[12rem] h-screen md:hidden"
      >
        <ul className="flex flex-col h-full w-full justify-center items-center gap-y-4 text-primary font-medium text-xl">
          <li>
            <Link
              onClick={() => setActive(false)}
              className="active:underline"
              href={pathname !== "/" ? "/" : "#home"}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setActive(false)}
              className="active:underline"
              href={pathname !== "/" ? "/shop" : "#collection"}
            >
              {pathname !== "/" ? "Shop" : "Collection"}
            </Link>
          </li>
          {pathname !== "/" ? (
            <li>
              <Link
                onClick={() => setActive(false)}
                href={"/store"}
                className="active:underline"
              >
                Store
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link
                  onClick={() => setActive(false)}
                  href={"#story"}
                  className="active:underline"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setActive(false)}
                  href={"#testimonials"}
                  className="active:underline"
                >
                  Reviews
                </Link>
              </li>
            </>
          )}
          <Link
            onClick={() => setActive(false)}
            className="active:underline"
            href={pathname !== "/" ? "/shop" : "#collection"}
          >
            {pathname !== "/" ? "Shop" : "Collection"}
          </Link>
        </ul>
        <div className="flex items-center justify-center gap-x-2 mb-8">
          {pathname === "/" ? (
            <>
              <Link
                onClick={() => setActive(false)}
                href={"/shop"}
                className="bg-gradient-to-r cursor-pointer from-orange-400 to-orange-500 text-white px-4 py-2 rounded-lg font-semibold text-sm"
              >
                Shop Now
              </Link>
              {token ? (
                <Button
                  variant={"destructive"}
                  type="button"
                  className="text-sm font-semibold px-4 py-3"
                >
                  Logout
                </Button>
              ) : (
                <Link
                  onClick={() => setActive(false)}
                  href={"/auth/login"}
                  className="border me-2 border-orange-500 text-orange-500 px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  Login
                </Link>
              )}
            </>
          ) : (
            <div
              onClick={() => setActive(false)}
              className="flex items-center gap-x-3"
            >
              <UserProfile
                disabled={loading}
                token={token}
                handleLogout={() => handleLogout(setLoading)}
              />
              {token?.user.role === "USER" && (
                <SheetShop>
                  <button className="relative text-orange-500">
                    <IconShoppingCart />
                    {!isLoading && data ? (
                      data.length > 9 ? (
                        <span className="w-6 h-6 text-xs font-medium text-white flex items-center justify-center rounded-full absolute -top-2 -right-3 bg-orange-600 aspect-square">
                          9+
                        </span>
                      ) : (
                        <span className="w-6 h-6 text-xs font-medium text-white flex items-center justify-center rounded-full absolute -top-2 -right-3 bg-orange-600 aspect-square">
                          {data.length}
                        </span>
                      )
                    ) : null}
                  </button>
                </SheetShop>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
