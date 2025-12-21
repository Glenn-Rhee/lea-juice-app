"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  IconDashboard,
  IconEdit,
  IconLogin,
  IconLogout,
  IconReceiptDollar,
  IconUser,
} from "@tabler/icons-react";
import { Session } from "next-auth";
import Link from "next/link";
import { Separator } from "./ui/separator";

interface UserProfileProps {
  token: Session | null;
  handleLogout: () => Promise<void>;
  disabled: boolean;
  handleClick?: () => void;
}

export interface UserDetail {
  username: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
}

export default function UserProfile(props: UserProfileProps) {
  const { token, handleLogout, disabled, handleClick } = props;
  const userData: UserDetail = {
    username: token ? token.user.username || "-" : "User Guest",
    fullName: token?.user?.name || "",
    email: token?.user?.email || "",
    phoneNumber: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
  };

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            onClick={handleClick}
            className="cursor-pointer text-orange-500 md:text-stone-700 md:hover:text-slate-900 transition-colors p-2 rounded-full hover:bg-gray-100"
          >
            <IconUser />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          <DropdownMenuLabel>
            <div className="py-3">
              <p className="text-sm font-semibold text-gray-900">
                {userData.username}
              </p>
              <p className="text-xs text-gray-500 truncate">{userData.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-slate-400" />
          {token ? (
            <>
              <DropdownMenuItem className="data-[highlighted]:bg-gray-300">
                <Link
                  className="text-stone-700 w-full flex items-center py-2 text-sm gap-x-3 cursor-pointer"
                  href={
                    token.user.role === "ADMIN"
                      ? "/dashboard/transactions"
                      : "/transaction"
                  }
                >
                  <IconReceiptDollar className="text-stone-700" />
                  Transaction
                </Link>
              </DropdownMenuItem>
              {token.user.role === "ADMIN" && (
                <DropdownMenuItem className="data-[highlighted]:bg-gray-300">
                  <Link
                    className="text-stone-700 w-full flex items-center py-2 text-sm gap-x-3 cursor-pointer"
                    href={"/dashboard"}
                  >
                    <IconDashboard className="text-stone-700" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                className="data-[highlighted]:bg-gray-300 cursor-pointer"
                onSelect={(e) => e.preventDefault()}
              >
                <Link
                  href={"/profile"}
                  className="text-stone-700 w-full flex items-center py-2 text-sm gap-x-3 cursor-pointer"
                >
                  <IconEdit size={16} className="text-stone-700" />
                  Edit Profile
                </Link>
              </DropdownMenuItem>

              <Separator className="bg-slate-400 my-2" />

              <DropdownMenuItem className="data-[highlighted]:bg-red-100 cursor-pointer">
                <button
                  onClick={handleLogout}
                  disabled={disabled}
                  className="w-full py-2 text-left text-sm text-red-600 cursor-pointer flex items-center gap-3 disabled:opacity-50"
                >
                  <IconLogout size={16} className="text-red-600" color="red" />
                  Logout
                </button>
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem className="data-[highlighted]:bg-gray-300 cursor-pointer">
              <Link
                className="text-stone-700 w-full flex items-center py-2 text-sm gap-x-3 cursor-pointer"
                href={"/auth/login"}
              >
                <IconLogin size={16} className="text-stone-700" />
                Login
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
