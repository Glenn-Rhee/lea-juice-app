import { cookies } from "next/headers";
import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { ResponsePayload } from "./types";

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const url = req.nextUrl.pathname;
  const tokenCookie = cookieStore.get("lea-xxx-juice");
  const token = tokenCookie ? tokenCookie.value : null;

  if (url.includes("/api")) {
    if (url.includes("/auth")) {
      if (req.method === "DELETE") {
        if (!token) {
          return NextResponse.json<ResponsePayload>({
            code: 401,
            message: "Oops! You already logout!",
            data: null,
            status: "failed",
          });
        }
      } else {
        if (token) {
          return NextResponse.json<ResponsePayload>({
            code: 403,
            message: "Oops! You already sign in",
            data: null,
            status: "failed",
          });
        }
      }
    }
  } else {
  }
  return NextResponse.next();
}

export const matcher: MiddlewareConfig = {
  matcher: ["/:path"],
};
