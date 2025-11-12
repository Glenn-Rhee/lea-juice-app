"use client";
import { cn } from "@/lib/utils";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Searchbar() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const router = useRouter();

  async function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (value.trim() === "") {
        router.push("/shop");
      } else {
        router.push("/shop?s=" + value);
      }
    }
  }

  return (
    <>
      <input
        type="search"
        placeholder="Search.."
        value={value}
        onKeyUp={handleSearch}
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
        onClick={() => {
          setOpen((prev) => !prev);
        }}
        className="cursor-pointer text-stone-700 hover:text-slate-900 transition-colors"
      >
        <IconSearch />
      </button>
    </>
  );
}
