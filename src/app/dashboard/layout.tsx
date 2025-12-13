import { AppSidebar } from "@/components/app-sidebar";
import Error from "@/components/Error";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ResponseError from "@/error/ResponseError";
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
  let dataUser: DataUser | null = null;
  let errMsg: { code: number; message: string } | null = null;
  try {
    const res = await fetch(baseUrl + "/api/user", {
      headers: {
        Authorization: `Bearer ${token?.value || ""}`,
      },
    });
    const dataRes = (await res.json()) as ResponsePayload<DataUser>;
    if (dataRes.status === "failed") {
      throw new ResponseError(dataRes.code, dataRes.message);
    }
    dataUser = dataRes.data;
    errMsg = null;
  } catch (error) {
    dataUser = null;
    if (error instanceof ResponseError) {
      errMsg = { code: error.code, message: error.message };
    } else {
      errMsg = {
        code: 500,
        message: "An error occured! Please try again later",
      };
    }
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      {errMsg && !dataUser ? (
        <Error
          className="text-slate-900"
          code={errMsg.code}
          message={errMsg.message}
        />
      ) : (
        dataUser && (
          <>
            <AppSidebar dataUser={dataUser} variant="inset" />
            <SidebarInset>
              <SiteHeader />
              {children}
            </SidebarInset>
          </>
        )
      )}
    </SidebarProvider>
  );
}
