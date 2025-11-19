import ProfileSection from "@/components/pages/profile/ProfileSection";
import SetProfileSection from "@/components/pages/profile/SetProfileSection";
import { DataUser, ResponsePayload } from "@/types";
import { Metadata } from "next";
import { cookies } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const token = cookieStore.get("next-auth.session-token");
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://lea-juice-app.vercel.app"
      : "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token?.value || ""}`,
    },
  });
  const dataUser = (await response.json()) as ResponsePayload<DataUser>;
  if (dataUser.status === "failed") {
    return {
      title: "Edit data user",
      description:
        "Edit and update your account profile information, including your full name, username, bio, and other personal data to ensure it is always accurate and up-to-date.",
    };
  }
  return {
    title: "Edit data " + dataUser.data.fullname,
    description:
      "Edit and update your account profile information, including your full name, username, bio, and other personal data to ensure it is always accurate and up-to-date.",
  };
}

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("next-auth.session-token");
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://lea-juice-app.vercel.app"
      : "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token?.value || ""}`,
    },
  });
  const dataUser = (await response.json()) as ResponsePayload<DataUser>;
  console.log("Data user profile page:", dataUser);
  return (
    <div className="pt-24 px-4 max-w-7xl mx-auto mb-8">
      <h1 className="text-center text-gray-900 font-bold text-4xl">
        Profile {dataUser.data.fullname}
      </h1>
      <div className="w-full flex flex-col md:flex-row gap-x-8 mt-8">
        <ProfileSection data={dataUser.data} />
        <SetProfileSection data={dataUser.data} />
      </div>
    </div>
  );
}
