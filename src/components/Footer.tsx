"use client";

import { usePathname } from "next/navigation";
import FacebookIcon from "./icons/FacebookIcon";
import InstagramIcon from "./icons/InstagramIcon";
import TwitterIcon from "./icons/TwitterIcon";

export default function Footer() {
  const pathname = usePathname();

  if (pathname.includes("/auth")) return null;
  return (
    <footer className="py-10 px-6 bg-stone-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <span className="text-3xl font-bold uppercase text-white mb-4">
              Lea <span className="text-[#ff8c42]">Juice</span>
            </span>
            <div className="flex space-x-4 mt-1">
              <a
                href=""
                className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center text-white hover:bg-orange-500 transition-colors"
              >
                <FacebookIcon />
              </a>
              <a
                href=""
                className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center text-white hover:bg-orange-500 transition-colors"
              >
                <InstagramIcon />
              </a>
              <a
                href=""
                className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center text-white hover:bg-orange-500 transition-colors"
              >
                <TwitterIcon />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wider text-sm">
              QUICK LINKS
            </h4>
            <ul className="space-y-3 text-stone-400 text-sm">
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Our Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Store Locator
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wider text-sm">
              CONTACT
            </h4>
            <ul className="space-y-3 text-stone-400 text-sm">
              <li>📍 Jakarta, Indonesia</li>
              <li>📞 +62 812-3456-7890</li>
              <li>📧 hello@leajuice.id</li>
              <li>🕐 Mon - Sat: 8AM - 8PM</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-800 pt-8 text-center text-stone-500 text-sm">
          <p>
            © 2025 LEA Juice. All rights reserved. Crafted with ❤️ in Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
