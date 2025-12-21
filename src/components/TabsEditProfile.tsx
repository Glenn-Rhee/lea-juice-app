import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

interface TabsEditProfileProps {
  tab: "personal" | "about";
  setTab: Dispatch<SetStateAction<"personal" | "about">>;
}
export default function TabsEditProfile(props: TabsEditProfileProps) {
  const { tab, setTab } = props;
  return (
    <div className="w-full grid grid-cols-2 gap-x-3 pb-4">
      <button
        onClick={() => {
          setTab("about");
        }}
        className={cn(
          "md:py-2 md:px-1 rounded-md cursor-pointer text-sm md:font-semibold",
          tab === "about"
            ? "bg-orange-500 text-white border-transparent"
            : "bg-transparent border border-orange-500 text-orange-600"
        )}
      >
        About me
      </button>
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
        Set Personal
      </button>
    </div>
  );
}
