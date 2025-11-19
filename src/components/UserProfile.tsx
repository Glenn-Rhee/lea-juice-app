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
  const { token, handleLogout, disabled } = props;
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
          <button className="cursor-pointer text-stone-700 hover:text-slate-900 transition-colors p-2 rounded-full hover:bg-gray-100">
            <IconUser />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <div className="py-3">
              <p className="text-sm font-semibold text-gray-900">
                {userData.username}
              </p>
              <p className="text-xs text-gray-500 truncate">{userData.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {token ? (
            <>
              <DropdownMenuItem>
                <Link
                  className="text-gray-700 w-full flex items-center py-2 text-sm gap-x-3 cursor-pointer"
                  href={"/transaction"}
                >
                  <IconReceiptDollar />
                  Transaction
                </Link>
              </DropdownMenuItem>
              {token.user.role === "ADMIN" && (
                <DropdownMenuItem>
                  <Link
                    className="text-gray-700 w-full flex items-center py-2 text-sm gap-x-3 cursor-pointer"
                    href={"/dashboard"}
                  >
                    <IconDashboard />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Link
                  href={"/profile"}
                  className="w-full py-2 text-left text-sm text-gray-700 flex items-center gap-3"
                >
                  <IconEdit size={16} />
                  Edit Profile
                </Link>
              </DropdownMenuItem>

              <Separator className="bg-slate-400" />

              <DropdownMenuItem className="hover:bg-red-50">
                <button
                  onClick={handleLogout}
                  disabled={disabled}
                  className="w-full py-2 text-left text-sm text-red-600  flex items-center gap-3 disabled:opacity-50"
                >
                  <IconLogout size={16} className="text-red-600" color="red" />
                  Logout
                </button>
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem>
              <Link
                className="w-full py-2 text-left text-sm flex items-center gap-3 disabled:opacity-50"
                href={"/auth/login"}
              >
                <IconLogin size={16} />
                Login
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
