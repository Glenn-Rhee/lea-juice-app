import { PatchUser } from "@/types";

interface AboutmeTabProps {
  data: PatchUser;
}

export default function AboutmeTab(props: AboutmeTabProps) {
  const { data } = props;
  return (
    <>
      <div className="w-full">
        <h6 className="font-medium text-gray-900 text-xl">Personal Identity</h6>
        <div className="w-full grid mt-4 grid-cols-2 gap-x-2 gap-y-4">
          <div className="flex flex-col">
            <span className="text-sm text-gray-400">Username</span>
            <span className="text-gray-700 font-medium">
              {data.username || "-"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-400">Fullname</span>
            <span className="text-gray-700 font-medium">
              {data.fullname || "-"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-400">Gender</span>
            <span className="text-gray-700 font-medium">{data.gender}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-400">Date of Birth</span>
            <span className="text-gray-700 font-medium">
              {data.dateOfBirth?.toLocaleDateString("id-ID") || "-"}
            </span>
          </div>
          <div className="flex flex-col col-span-2">
            <span className="text-sm text-gray-400">Bio</span>
            <span className="text-gray-700 font-medium text-justify">
              {data.bio || "-"}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full mt-8">
        <h6 className="font-semibold text-gray-900 text-xl">
          Shipping Address
        </h6>
        <div className="w-full grid mt-4 grid-cols-2 gap-x-2 gap-y-4">
          <div className="flex flex-col">
            <span className="text-sm text-gray-400">City</span>
            <span className="text-gray-700 font-medium">
              {data.city || "-"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-400">Province</span>
            <span className="text-gray-700 font-medium">
              {data.province || "-"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-400">Postal Code</span>
            <span className="text-gray-700 font-medium">
              {data.postalCode || "-"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
