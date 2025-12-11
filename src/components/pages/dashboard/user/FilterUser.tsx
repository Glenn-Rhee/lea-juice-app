"use client";
import { Button } from "@/components/ui/button";
import { Download, Search } from "lucide-react";
import { useState } from "react";

interface FilterUserProps {
  filterUser: (filter: string) => void;
}

export default function FilterUser(props: FilterUserProps) {
  const { filterUser } = props;
  const [value, setValue] = useState<string>("");
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3">
      <div className="flex-1 relative">
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
          placeholder="Find username, name, or email user..."
          className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
        />
      </div>
      <Button
        onClick={() => filterUser(value.trim())}
        className="py-5 w-[8rem] cursor-pointer rounded-lg"
      >
        Search
      </Button>
      <Button
        variant={"ghost"}
        className="py-5 w-[7rem] flex rounded-lg cursor-pointer border"
      >
        <Download className="h-4 w-4" />
        Export
      </Button>
    </div>
  );
}
