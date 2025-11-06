import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { ResponsePayload } from "./types";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (url.includes("/api")) {
    if (url.includes("/auth/signup")) {
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
    if (url.includes("/auth") && token) {
      return NextResponse.redirect(new URL("/shop", req.url));
    }
  }
  return NextResponse.next();
}

export const matcher: MiddlewareConfig = {
  matcher: ["/:path"],
};
