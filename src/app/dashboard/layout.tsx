import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DataUser, ResponsePayload } from "@/types";
import { cookies } from "next/headers";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://lea-juice-app.vercel.app"
    : "http://localhost:3000";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token =
    cookieStore.get("__Secure-next-auth.session-token") ??
    cookieStore.get("next-auth.session-token");
  const res = await fetch(baseUrl + "/api/user", {
    headers: {
      Authorization: `Bearer ${token?.value || ""}`,
    },
  });
  const dataRes = (await res.json()) as ResponsePayload<DataUser>;

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar dataUser={dataRes.data} variant="inset" />
      <SidebarInset>
        <SiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
