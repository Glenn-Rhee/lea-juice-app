import { useUpdateStatusTransaction } from "@/lib/transaction-mutation";
import { STATUSORDER } from "../../../../../generated/prisma";
import Loader from "@/components/icons/Loader";
import { cn } from "@/lib/utils";

export default function MarkAsItem({
  status,
  children,
  id,
}: {
  status: STATUSORDER;
  children: React.ReactNode;
  id: string;
}) {
  const updateStatus = useUpdateStatusTransaction();
  return (
    <button
      className={cn(
        "flex items-center",
        updateStatus.isPending ? "justify-center w-full" : ""
      )}
      disabled={updateStatus.isPending}
      onClick={() => updateStatus.mutate({ id, status })}
    >
      {updateStatus.isPending ? <Loader /> : children}
    </button>
  );
}
