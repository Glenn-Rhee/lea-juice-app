import NextAuth, { AuthOptions } from "next-auth";
import { prisma } from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import Bcrypt from "@/lib/bcrypt";
import { CustomPrismaAdapter } from "@/lib/nextAuthAdapter";
import type { AdapterUser } from "next-auth/adapters";
import ResponseError from "@/error/ResponseError";

interface DataOauth {
  name: string;
  email: string;
  image: string;
  emailVerified: null;
  username: string;
  password: string;
}

export const authOptions: AuthOptions = {
  adapter: {
    ...CustomPrismaAdapter(),
    createUser: async (data: DataOauth) => {
      const createdUser = await prisma.user.create({
        data: {
          ...data,
          username: data.username ?? "",
          emailVerified: data.email,
        },
      });
      await prisma.userDetail.create({
        data: {
          userId: createdUser.id,
          address: "",
          phoneNumber: "",
          bio: "",
          city: "",
          gender: "UNKNOWN",
          postalCode: "",
          province: "",
        },
      });

      return createdUser;
    },
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENTID!,
      clientSecret: process.env.GOOGLE_CLIENTSECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<AdapterUser | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await prisma.user.findFirst({
            where: { email: credentials?.email },
          });

          if (!user || (!credentials?.email && !credentials?.password)) {
            throw new ResponseError(404, "Email is not registered!");
          }

          if (!user.password || user.password.trim() === "") {
            throw new ResponseError(
              401,
              "This account verified by account google. Please login using google account!"
            );
          }

          console.log(user);

          const isValid = await Bcrypt.comparePassword(
            credentials.password,
            user.password!
          );

          if (!isValid) {
            throw new ResponseError(401, "Password incorrect!");
          }

          return {
            id: user.id,
            name: user.name ?? null,
            image: user.image ?? null,
            role: user.role,
            email: user.email!,
            username: user.username ?? "",
            emailVerified: null,
          };
        } catch (error) {
          if (error instanceof ResponseError) {
            throw new Error(error.message);
          }

          throw new Error("An error occured!");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          id: user.id,
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
        id: token.id,
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
