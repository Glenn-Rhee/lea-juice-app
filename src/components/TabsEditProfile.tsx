import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

interface TabsEditProfileProps {
  tab: "personal" | "address";
  setTab: Dispatch<SetStateAction<"personal" | "address">>;
}
export default function TabsEditProfile(props: TabsEditProfileProps) {
  const { tab, setTab } = props;
  return (
    <div className="w-full grid grid-cols-2 gap-x-3 border-b pb-4 border-slate-600">
      <button
        onClick={() => {
          setTab("personal");
        }}
        className={cn(
          "py-2 px-1 rounded-md cursor-pointer text-sm md:font-semibold",
          tab === "personal"
            ? "bg-orange-500 text-white border-transparent"
            : "bg-transparent border border-orange-500 text-orange-600"
        )}
      >
        Personal Information
      </button>
      <button
        onClick={() => {
          setTab("address");
        }}
        className={cn(
          "py-2 px-1 rounded-md cursor-pointer text-sm md:font-semibold",
          tab === "address"
            ? "bg-orange-500 text-white border-transparent"
            : "bg-transparent border border-orange-500 text-orange-600"
        )}
      >
        Address
      </button>
    </div>
  );
}
