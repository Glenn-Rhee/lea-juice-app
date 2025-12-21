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
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/components/icons/Loader";
import { CATEGORY } from "../../../../../generated/prisma";
import { Button } from "@/components/ui/button";

export default function ProductHeader() {
  const [value, setValue] = useState("");
  const [isPending, startTransition] = useTransition();
  const loading = isPending;
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

  function handleSearch() {
    startTransition(() => {
      if (value.trim() === "") {
        router.push("/dashboard/products");
      } else {
        router.push(`/dashboard/products?q=${value}&c=${category}`);
      }
    });
  }

  return (
    <div className="w-full flex justify-between items-center md:grid grid-cols-3 gap-x-3">
      <div className="flex items-center gap-x-2 flex-1 w-full md:col-span-2">
        <div className="flex items-center gap-x-1 h-full w-full px-2 bg-white/10 rounded-md">
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
          <SelectTrigger className="h-full w-[150px] md:w-[180px] px-3 py-1 rounded-md">
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
      <div className="flex md:w-full justify-end pe-4 items-center">
        <DialogProduct httpMethod="POST">
          <Button type="button" className="cursor-pointer">
            Add <span className="hidden md:inline">Product</span>
          </Button>
        </DialogProduct>
      </div>
    </div>
  );
}
