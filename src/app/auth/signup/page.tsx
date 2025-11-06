import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import FormSignup from "@/components/pages/auth/FormSignup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - Lea Juice App",
  description: "Create a new account on Lea Juice App",
};

export default async function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-indigo-300/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-[30rem] h-[30rem] bg-purple-300/20 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative z-10">
        <Card className="border border-slate-200 shadow-xl backdrop-blur-xl bg-white/90 hover:shadow-2xl transition-all duration-300 rounded-2xl">
          <CardHeader className="text-center pt-8 pb-4">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent">
              Create Account
            </CardTitle>
            <CardDescription className="text-slate-600 mt-2">
              Join us today — it only takes a few seconds!
            </CardDescription>
          </CardHeader>

          <FormSignup  />

          <CardFooter className="px-8 pb-8 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="ml-1 font-semibold text-yellow-600 hover:text-yellow-400 hover:underline underline-offset-4"
            >
              Log in
            </Link>
          </CardFooter>
        </Card>

        <p className="text-center text-sm text-slate-500 mt-8">
          DFA Academy © {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </div>
  );
}
