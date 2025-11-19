"use client";
import TabsEditProfile from "@/components/TabsEditProfile";
import { useState } from "react";
import AboutmeTab from "./AboutmeTab";
import { DataUser } from "@/types";
import SetPersonalTab from "./SetPersonalTab";

interface SetProfileSectionProps {
  data: DataUser;
}

export default function SetProfileSection(props: SetProfileSectionProps) {
  const { data } = props;
  const [tab, setTab] = useState<"personal" | "about">("about");

  return (
    <div className="bg-white w-full rounded-2xl p-8 shadow-xl border-2 border-orange-100">
      <TabsEditProfile tab={tab} setTab={setTab} />
      {tab === "about" && <AboutmeTab data={data} />}
      {tab === "personal" && <SetPersonalTab data={data} />}
    </div>
  );
}
