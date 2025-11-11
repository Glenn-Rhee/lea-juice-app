"use client";
import { IconBrandWhatsapp, IconCopy, IconShare } from "@tabler/icons-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import FacebookIcon from "@/components/icons/FacebookIcon";
import TwitterIcon from "@/components/icons/TwitterIcon";

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

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(fullUrl);

      toast.success("Product copied successfully!");
    } catch (error) {
      console.error("Error sharing:", error);
      toast.error("Failed to share the product.");
    }
  }

  async function handleShare(platform: "facebook" | "twitter" | "whatsapp") {
    if (!fullUrl) return;
    let url = "";
    if (platform === "facebook") {
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        fullUrl
      )}`;
    } else if (platform === "twitter") {
      url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        fullUrl
      )}`;
    } else {
      url = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullUrl)}`;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  }
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer">
        <IconShare className="text-gray-500" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            Share to your friend
          </DialogTitle>
        </DialogHeader>
        <Separator className="bg-slate-800" />
        <div>
          <span className="font-medium text-stone-700">Share</span>
          <div className="flex items-center justify-center gap-x-10 mt-2">
            <button
              onClick={handleCopy}
              type="button"
              className="px-3 py-2 transition-colors duration-200 rounded-md hover:bg-gray-200 cursor-pointer"
            >
              <IconCopy />
            </button>
            <button
              type="button"
              onClick={() => {
                handleShare("facebook");
              }}
              className="px-3 py-2 transition-colors duration-200 rounded-md hover:bg-gray-200 cursor-pointer"
            >
              <FacebookIcon color="blue" />
            </button>
            <button
              type="button"
              onClick={() => {
                handleShare("twitter");
              }}
              className="px-3 py-2 transition-colors duration-200 rounded-md hover:bg-gray-200 cursor-pointer"
            >
              <TwitterIcon color="skyblue" />
            </button>
            <button
              type="button"
              onClick={() => {
                handleShare("whatsapp");
              }}
              className="px-3 py-2 transition-colors duration-200 rounded-md hover:bg-gray-200 cursor-pointer"
            >
              <IconBrandWhatsapp color="green" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
