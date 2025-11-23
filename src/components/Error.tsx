import { cn } from "@/lib/utils";
import Image from "next/image";

interface ErrorProps {
  message: string;
  code: number;
  className?: string;
}

export default function Error(props: ErrorProps) {
  const { message, code, className } = props;
  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-y-2">
        <Image
          src={"/warning.png"}
          alt="Error icon image"
          width={250}
          height={200}
        />
        <h1 className={cn("text-4xl text-white font-bold", className)}>
          ERROR {code}!
        </h1>
        <p className={cn("text-white font-semibold text-xl", className)}>
          {message}
        </p>
      </div>
    </div>
  );
}
