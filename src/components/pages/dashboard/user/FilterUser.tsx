"use client";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";

interface FilterUserProps {
  filterUser: (filter: string) => void;
}

export default function FilterUser(props: FilterUserProps) {
  const { filterUser } = props;
  const [value, setValue] = useState<string>("");
  return (
    <div className="flex flex-row items-center gap-3 mt-4">
      <div className="md:flex-1 w-[20rem] relative">
        <Search
          onClick={() => filterUser(value.trim())}
          className="absolute left-3 top-3 h-5 w-5 text-muted-foreground"
        />
        <input
          value={value}
          onKeyUp={(e) =>
            e.key.toLowerCase() === "enter" && filterUser(value.trim())
          }
          onChange={(e) => setValue(e.target.value)}
          type="search"
          placeholder="Find username, email, id, total order, and total spending"
          className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
        />
      </div>
      <Button
        onClick={() => filterUser(value.trim())}
        className="py-5 md:w-[8rem] cursor-pointer rounded-lg"
      >
        Search
      </Button>
    </div>
  );
}
