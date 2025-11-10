import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Metadata } from "next";
import FormLogin from "@/components/pages/auth/FormLogin";

export const metadata: Metadata = {
  title: "Sign In - Lea Juice App",
  description: "Sign in to your account on Lea Juice App",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-indigo-300/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-[30rem] h-[30rem] bg-purple-300/20 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative z-10">
        <Card className="border border-slate-200 shadow-xl backdrop-blur-xl bg-white/90 hover:shadow-2xl transition-all duration-300 rounded-2xl">
          <CardHeader className="text-center pt-8 pb-4">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-600 bg-clip-text text-transparent">
              Sign In
            </CardTitle>
            <CardDescription className="text-slate-600 mt-2">
              Welcome back! Please enter your credentials.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8">
            <FormLogin />
          </CardContent>

          <CardFooter className="px-8 pb-8">
            <div className="w-full text-center text-sm text-slate-600">
              <div className="h-px bg-slate-200 my-4" />
              Don’t have an account?{" "}
              <Link
                href="/auth/signup"
                className="font-semibold text-yellow-600 hover:text-yellow-700 hover:underline underline-offset-4"
              >
                Create one
              </Link>
            </div>
          </CardFooter>
        </Card>

        <p className="text-center text-sm text-slate-500 mt-8">
          DFA Academy © {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </div>
  );
}
