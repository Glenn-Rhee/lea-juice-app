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

    if (url.includes("/user") && !token) {
      return NextResponse.json<ResponsePayload>({
        code: 403,
        data: null,
        message: "Unathorized! You don't have any permission!",
        status: "failed",
      });
    }

    if (url.includes("/products")) {
      if (req.method !== "GET" && (!token || token.role === "USER")) {
        return NextResponse.json<ResponsePayload>({
          code: 403,
          data: null,
          message: "Forbidden! You don't have any permission!",
          status: "failed",
        });
      }
    }

    if (url.includes("/cart")) {
      if (!token) {
        return NextResponse.json<ResponsePayload>({
          code: 403,
          data: null,
          status: "failed",
          message: "Forbidden! You don't have an access!",
        });
      }

      if (token.role === "ADMIN") {
        return NextResponse.json<ResponsePayload>({
          code: 403,
          data: null,
          message: "Forbidden! Admin can't checkout product!",
          status: "failed",
        });
      }
    }

    if (url.includes("/review")) {
      if (req.method !== "GET" && !token) {
        return NextResponse.json<ResponsePayload>({
          code: 403,
          data: null,
          message: "Forbidden! You don't have any acces for this action!",
          status: "failed",
        });
      }
    }

    if (url.includes("/checkout") && !token) {
      return NextResponse.json<ResponsePayload>({
        code: 403,
        data: null,
        message: "Forbidden! You don't have any acces for this action!",
        status: "failed",
      });
    }
  } else {
    if (url.includes("/auth") && token) {
      return NextResponse.redirect(new URL("/shop", req.url));
    }

    if (url.includes("/dashboard")) {
      if (!token) return NextResponse.redirect(new URL("/shop", req.url));

      if (token.role === "USER")
        return NextResponse.redirect(new URL("/shop", req.url));
    }

    if (url.includes("/profile") && !token) {
      return NextResponse.redirect(new URL("/shop", req.url));
    }

    if (token?.role === "ADMIN" && url === "/transaction") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (url.includes("/transaction") && !token) {
      return NextResponse.redirect(new URL("/shop", req.url));
    }
  }
  return NextResponse.next();
}

export const matcher: MiddlewareConfig = {
  matcher: ["/:path"],
};
