"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { IconStarFilled, IconUserFilled } from "@tabler/icons-react";
import { useState } from "react";

const data = [
  {
    name: "Glenn Rhee",
    commentAt: "7 Month Ago",
    stars: 5,
  },
  {
    name: "Glenn Rhee",
    commentAt: "7 Month Ago",
    stars: 4,
  },
  {
    name: "Glenn Rhee",
    commentAt: "7 Month Ago",
    stars: 3,
  },
  {
    name: "Glenn Rhee",
    commentAt: "7 Month Ago",
    stars: 2,
  },
  {
    name: "Glenn Rhee",
    commentAt: "7 Month Ago",
    stars: 1,
  },
];
export default function CommentSesction() {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  async function handleComment() {
    console.log("Comment: ", comment);
    console.log("Rating: ", rating);
  }
  return (
    <section className="max-w-6xl w-full mx-auto mt-8 flex gap-x-4 px-4 mb-8">
      <div className="w-full flex-1 h-fit sticky top-[6rem] bg-white border px-4 py-3 border-gray-300 rounded-sm shadow-sm">
        <h4 className="text-stone-900 font-semibold text-xl">Filter Reviews</h4>
        <Separator className="bg-stone-700/40 my-3" />
        <h4 className="text-stone-900 font-medium text-lg">Rating</h4>
        <ul className="flex flex-col gap-y-4 mt-2">
          <li className="flex items-center gap-x-2">
            <Checkbox id="5" className="border border-gray-500 w-5 h-5" />
            <Label htmlFor="5" className="text-gray-600 text-lg font-semibold">
              <IconStarFilled className="text-yellow-500" size={20} /> 5
            </Label>
          </li>
          <li className="flex items-center gap-x-2">
            <Checkbox id="4" className="border border-gray-500 w-5 h-5" />
            <Label htmlFor="4" className="text-gray-600 text-lg font-semibold">
              <IconStarFilled className="text-yellow-500" size={20} /> 4
            </Label>
          </li>
          <li className="flex items-center gap-x-2">
            <Checkbox id="3" className="border border-gray-500 w-5 h-5" />
            <Label htmlFor="3" className="text-gray-600 text-lg font-semibold">
              <IconStarFilled className="text-yellow-500" size={20} /> 3
            </Label>
          </li>
          <li className="flex items-center gap-x-2">
            <Checkbox id="2" className="border border-gray-500 w-5 h-5" />
            <Label htmlFor="2" className="text-gray-600 text-lg font-semibold">
              <IconStarFilled className="text-yellow-500" size={20} /> 2
            </Label>
          </li>
          <li className="flex items-center gap-x-2">
            <Checkbox id="1" className="border border-gray-500 w-5 h-5" />
            <Label htmlFor="1" className="text-gray-600 text-lg font-semibold">
              <IconStarFilled className="text-yellow-500" size={20} /> 1
            </Label>
          </li>
        </ul>
      </div>
      <div className="flex-3 w-full flex flex-col gap-y-7 ps-4">
        <div className="w-full pb-3 flex items-center gap-x-4">
          <div className="aspect-square rounded-full shadow-md bg-orange-100 w-10 h-10 flex items-center justify-center">
            <IconUserFilled className="text-orange-800" size={20} />
          </div>
          <div className="flex flex-col gap-y-2 w-full">
            <input
              type="text"
              value={comment}
              onKeyUp={(e) =>
                e.key.toLowerCase() === "enter" && handleComment()
              }
              onChange={(e) => setComment(e.target.value)}
              className="border-b border-gray-500/40 w-full placeholder:text-stone-500 transition-colors text-stone-800 pb-2 placeholder:text-sm focus:border-b focus:outline-none focus:border-gray-600/70"
              placeholder="Add your comment..."
            />
            <div className="flex items-center w-full justify-between gap-x-2">
              <div className="flex items-center gap-x-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRating(i + 1)}
                  >
                    <IconStarFilled
                      size={18}
                      className={cn(
                        "transition-colors duration-200 cursor-pointer text-gray-500",
                        {
                          "text-gray-500": rating === 0,
                          "text-yellow-500": i + 1 <= rating,
                        }
                      )}
                    />
                  </button>
                ))}
              </div>
              <Button
                onClick={handleComment}
                type="submit"
                className="cursor-pointer"
                size={"sm"}
              >
                Comment
              </Button>
            </div>
          </div>
        </div>
        {data.map((d, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center gap-x-2">
              <div className="aspect-square rounded-full shadow-md bg-orange-100 w-10 h-10 flex items-center justify-center">
                <IconUserFilled className="text-orange-800" size={20} />
              </div>
              <span className="text-stone-900 font-semibold">Glenn Rhee</span>
            </div>
            <span className="flex items-center text-gray-600 font-semibold text-sm gap-x-2 mt-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <IconStarFilled size={18} key={i} className="text-yellow-500" />
              ))}
              7 bulan lalu
            </span>
            <p className="mt-4 text-gray-700 font-medium text-sm">
              Rasa jus nya jeruk banget enak banget euy. Recomennded deh!
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
