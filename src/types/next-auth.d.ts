import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      id?: string | undefined;
      username?: string | undefined;
      role?: "ADMIN" | "USER" | null;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string | undefined;
    username?: string | undefined;
    role?: "ADMIN" | "USER" | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string | undefined;
    username?: string | undefined;
    role?: "ADMIN" | "USER" | null;
  }
}
