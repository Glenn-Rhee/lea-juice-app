import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Separator } from "@/components/ui/separator";
import { DataUser } from "@/types";
import {
  IconLocation,
  IconMail,
  IconPhone,
  IconUserFilled,
} from "@tabler/icons-react";
import { getServerSession } from "next-auth";
import Image from "next/image";

interface ProfileSectionProps {
  data: DataUser;
}

export default async function ProfileSection(props: ProfileSectionProps) {
  const { data } = props;
  const session = await getServerSession(authOptions);

  return (
    <div className="bg-white max-w-md w-full rounded-2xl p-8 shadow-xl border-2 border-orange-100">
      <div className="w-full flex items-center flex-col justify-center">
        {data.image === "" ? (
          <div className="aspect-square rounded-full shadow-md bg-orange-100 w-32 h-32 flex items-center justify-center">
            <IconUserFilled className="text-orange-800" size={80} />
          </div>
        ) : (
          <Image
            src={data.image}
            alt="Profile Ariel Rizki"
            width={150}
            height={100}
            className="aspect-square object-cover rounded-full"
          />
        )}
        <div className="flex flex-col w-full items-center mt-2">
          <span className="font-semibold text-2xl text-gray-800">
            {data.fullname || "-"}
          </span>
          <span className="text-sm font-medium text-gray-500">
            {session?.user.id?.slice(0, 8)} | {session?.user.role}
          </span>
        </div>
      </div>
      <Separator className="my-4 bg-gray-300" />
      <div className="space-y-6 w-full">
        <h6 className="font-semibold text-xl text-gray-900">Contact</h6>
        <div className="flex items-center gap-x-6">
          <div className="w-10 text-orange-600 h-10 aspect-square flex items-center justify-center rounded-full bg-orange-100">
            <IconPhone />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Phone Number</span>
            <span className="text-gray-900 font-medium">
              {data.phoneNumber || "-"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-x-6">
          <div className="w-10 text-orange-600 h-10 aspect-square flex items-center justify-center rounded-full bg-orange-100">
            <IconMail />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Email</span>
            <span className="text-gray-900 font-medium">
              {session?.user.email}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-x-6">
          <div className="w-10 text-orange-600 h-10 aspect-square flex items-center justify-center rounded-full bg-orange-100">
            <IconLocation />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Current Address</span>
            <span className="text-gray-900 font-medium">
              {data.address || "-"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
