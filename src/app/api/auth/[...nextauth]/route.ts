import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import Bcrypt from "@/lib/bcrypt";

export const authOptions: AuthOptions = {
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
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("cihuy:", token);
        token = {
          ...token,
          sub: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          username: user.username,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        name: token.name,
        email: token.email,
        role: token.role,
        username: token.username,
      };

      return session;
    },
  },

  session: { strategy: "jwt" },
  pages: { signIn: "/shop" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
