import { Progress } from "@/components/ui/progress";
import { IconStarFilled } from "@tabler/icons-react";

export default function SummaryReviewCard() {
  return (
    <section className="max-w-6xl w-full mx-auto space-y-4 my-8 px-4 mb-8">
      <h4 className="text-stone-900 font-semibold text-2xl">Buyer reviews</h4>
      <div className="bg-gradient-to-b from-white flex justify-around via-orange-50 to-orange-100 border border-gray-300 rounded-sm py-5 px-8">
        <div className="space-y-3 w-full">
          <div className="flex items-end gap-x-3 text-stone-900 font-semibold text-xl">
            <IconStarFilled className="text-yellow-500" />
            <span>
              4.9<sub>/50</sub>
            </span>
          </div>
          <span className="text-stone-900">98% pembeli merasa puas</span>
        </div>
        <div className="flex flex-col w-full gap-y-2">
          <div className="flex text-xs font-medium text-gray-600 items-center gap-x-1">
            <IconStarFilled size={14} className="text-yellow-500" />
            <span>5</span>
            <Progress className="w-[15rem]" value={98} />
            <span>(57)</span>
          </div>
          <div className="flex text-xs font-medium text-gray-600 items-center gap-x-1">
            <IconStarFilled size={14} className="text-yellow-500" />
            <span>4</span>
            <Progress className="w-[15rem]" value={1} />
            <span>(1)</span>
          </div>
          <div className="flex text-xs font-medium text-gray-600 items-center gap-x-1">
            <IconStarFilled size={14} className="text-yellow-500" />
            <span>3</span>
            <Progress className="w-[15rem]" value={1} />
            <span>(1)</span>
          </div>
        </div>
        <div className="flex flex-col w-full gap-y-2">
          <div className="flex text-xs font-medium text-gray-600 items-center gap-x-1">
            <IconStarFilled size={14} className="text-yellow-500" />
            <span>2</span>
            <Progress className="w-[15rem]" value={0} />
            <span>(0)</span>
          </div>
          <div className="flex text-xs font-medium text-gray-600 items-center gap-x-1">
            <IconStarFilled size={14} className="text-yellow-500" />
            <span>1</span>
            <Progress className="w-[15rem]" value={0} />
            <span>(0)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
