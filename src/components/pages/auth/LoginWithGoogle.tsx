import GoogleIcon from "@/components/icons/GoogleIcon";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface LoginWithGoogleProps {
  handleLoginGoogle: () => void;
  isLoading: boolean;
}

export default function LoginWithGoogle(props: LoginWithGoogleProps) {
  const { handleLoginGoogle, isLoading } = props;
  return (
    <>
      <div className="grid grid-cols-[1fr_20px_1fr] items-center mt-4 gap-x-3">
        <Separator className="w-[50px] bg-black/80" />
        <span className="text-sm text-slate-500 font-medium">OR</span>
        <Separator className="w-1/2 bg-black/80" />
      </div>
      <button
        disabled={isLoading}
        onClick={handleLoginGoogle}
        className={cn(
          "w-full cursor-pointer hover:bg-gray-200 transition-colors duration-200 bg-white border px-3 py-3 border-black rounded-md mt-5 relative",
          isLoading ? "opacity-60 cursor-not-allowed" : ""
        )}
      >
        <GoogleIcon className="absolute top-1/2 -translate-y-1/2" />
        <span className="font-semibold text-slate-900 text-center">
          Continue with Google
        </span>
      </button>
    </>
  );
}
