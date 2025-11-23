"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchIcon } from "lucide-react";
import DialogProduct from "./DialogProduct";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/components/icons/Loader";
import { CATEGORY } from "../../../../../generated/prisma";

export default function ProductHeader() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const CATEGORIES = ["JUICE", "FRUIT", "SALAD"] as const;
  const c = searchParams.get("c") as CATEGORY | null;
  const [category, setCategory] = useState<CATEGORY>(
    c
      ? CATEGORIES.includes(c)
        ? (c.toUpperCase() as CATEGORY)
        : "JUICE"
      : "JUICE"
  );
  const router = useRouter();

  useEffect(() => {
    setLoading(false);
  }, [searchParams]);

  function handleSearch() {
    setLoading(true);
    if (value.trim() === "") {
      router.push("/dashboard/products");
    } else {
      router.push(`/dashboard/products?q=${value}&c=${category}`);
    }
  }

  return (
    <div className="w-full grid grid-cols-3 gap-x-3">
      <div className="flex items-center gap-x-2 flex-1 col-span-2">
        <div className="flex items-center gap-x-1 h-full px-2 w-full bg-white/10 rounded-md">
          <button
            disabled={loading}
            onClick={handleSearch}
            type="button"
            className="cursor-pointer"
          >
            {loading ? <Loader /> : <SearchIcon size={20} />}
          </button>
          <Input
            value={value}
            disabled={loading}
            onKeyUp={(e) => e.key === "Enter" && handleSearch()}
            onChange={(e) => setValue(e.target.value)}
            type="search"
            placeholder="Search by product name"
            className="bg-transparent! border-none focus:ring-0 focus-visible:ring-0 focus:border-none"
          />
        </div>
        <Select
          value={category}
          onValueChange={(v: CATEGORY) => setCategory(v)}
        >
          <SelectTrigger className="h-full w-[180px] px-3 py-1 bg-red-900 rounded-md">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              <SelectItem value="JUICE">Juice</SelectItem>
              <SelectItem value="FRUIT">Fruit</SelectItem>
              <SelectItem value="SALAD">Salad</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-full justify-end pe-4 items-center">
        <DialogProduct />
      </div>
    </div>
  );
}
