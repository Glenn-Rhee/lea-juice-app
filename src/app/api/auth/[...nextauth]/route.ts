import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import Bcrypt from "@/lib/bcrypt";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findFirst({
          where: { email: credentials?.email },
        });

        if (!user || (!credentials?.email && !credentials?.password)) {
          return null;
        }

        const isValid = await Bcrypt.comparePassword(
          credentials.password,
          user.password
        );

        if (!isValid) return null;

        return user;
      },
    }),
  ],

  session: { strategy: "jwt" },
  pages: { signIn: "/shop" },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
