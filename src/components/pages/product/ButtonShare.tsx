"use client";
import { IconShare } from "@tabler/icons-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ButtonShare() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [fullUrl, setFullUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = searchParams.toString();
      const currUrl = `${window.location.origin}${pathname}${
        params ? `${params}` : ""
      }`;
      setFullUrl(currUrl);
    }
  }, [pathname, searchParams]);

  async function handleShare() {
    try {
      await navigator.share({
        text: "Check out this product!",
        url: fullUrl,
      });

      toast.success("Product shared successfully!");
    } catch (error) {
      console.error("Error sharing:", error);
      toast.error("Failed to share the product.");
    }
  }
  return (
    <button
      onClick={handleShare}
      className="px-2 py-1 cursor-pointer hover:bg-gray-100 rounded-md"
    >
      <IconShare className="text-gray-500" />
    </button>
  );
}
