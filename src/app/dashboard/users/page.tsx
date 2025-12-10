import Error from "@/components/Error";
import TableUser from "@/components/pages/dashboard/user/TableUser";
import ResponseError from "@/error/ResponseError";
import { DataUserTable, ResponsePayload } from "@/types";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "List users purchased!",
  description: "The total of all users who have purchased.",
};
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://lea-juice-app.vercel.app"
    : "http://localhost:3000";

export default async function UserDashboardPage() {
  const cookieStore = await cookies();
  const token =
    cookieStore.get("__Secure-next-auth.session-token") ??
    cookieStore.get("next-auth.session-token");
  let dataUsers: DataUserTable[] = [];
  let errorMsg: { message: string; code: number } | null = null;
  try {
    const res = await fetch(baseUrl + "/api/user?get=*", {
      headers: {
        Authorization: `Bearer ${token?.value || ""}`,
      },
    });
    const dataRes = (await res.json()) as ResponsePayload<DataUserTable[]>;
    if (dataRes.status === "failed") {
      throw new ResponseError(dataRes.code, dataRes.message);
    }
    dataUsers = dataRes.data;
    errorMsg = null;
  } catch (error) {
    if (error instanceof ResponseError) {
      errorMsg = { code: error.code, message: error.message };
    } else {
      errorMsg = { code: 500, message: "An error occured!" };
    }
  }
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
          {errorMsg && !dataUsers ? (
            <Error code={errorMsg.code} message={errorMsg.message} />
          ) : (
            <>
              <div>
                <h1 className="text-3xl font-bold mb-2">Users</h1>
                <p className="text-muted-foreground">
                  Display user information clearly and neatly.
                </p>
              </div>
              <TableUser data={dataUsers} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
