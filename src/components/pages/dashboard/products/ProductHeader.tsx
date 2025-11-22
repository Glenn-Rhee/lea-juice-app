import { Button } from "@/components/ui/button";
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

export default function ProductHeader() {
  return (
    <div className="w-full grid grid-cols-3 gap-x-3">
      <div className="flex items-center gap-x-2 flex-1 col-span-2">
        <div className="flex items-center gap-x-1 h-full px-2 w-full bg-white/10 rounded-md">
          <button className="cursor-pointer">
            <SearchIcon size={20} />
          </button>
          <Input
            type="search"
            className="bg-transparent! border-none focus:ring-0 focus-visible:ring-0 focus:border-none"
          />
        </div>
        <Select>
          <SelectTrigger className="h-full w-[180px] px-3 py-1 bg-red-900 rounded-md">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              <SelectItem value="juice">Juice</SelectItem>
              <SelectItem value="fruit">Fruit</SelectItem>
              <SelectItem value="salad">Salad</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-full justify-end pe-4 items-center">
        <Button type="button" className="cursor-pointer">
          Add Product
        </Button>
      </div>
    </div>
  );
}
