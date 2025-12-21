"use client";
import { cn } from "@/lib/utils";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Loader from "./icons/Loader";

export default function Searchbar() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const loading = isPending;
  async function handleSearch() {
    startTransition(() => {
      if (value.trim() === "") {
        router.push("/shop");
      } else {
        router.push("/shop?s=" + value);
      }
    });
  }

  return (
    <>
      <input
        disabled={loading}
        type="search"
        placeholder="Search.."
        value={value}
        onKeyUp={(e) => e.key === "Enter" && handleSearch()}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className={cn(
          "bg-transparent border text-stone-800 border-orange-500 transition-all px-3 py-1.5 text-sm outline-none me-2 absolute top-1/2 -translate-y-1/2 right-[100%] duration-300 rounded-sm w-full",
          open
            ? "w-40 md:w-xs translate-x-0"
            : "w-0 opacity-0 pointer-events-none"
        )}
      />
      <button
        disabled={loading}
        onClick={() => {
          console.log("cihuy");
          if (value.trim() === "") {
            setOpen((prev) => !prev);
          } else {
            handleSearch();
          }
        }}
        className="cursor-pointer text-stone-700 hover:text-slate-900 transition-colors"
      >
        {loading ? <Loader className="text-slate-900" /> : <IconSearch />}
      </button>
    </>
  );
}
