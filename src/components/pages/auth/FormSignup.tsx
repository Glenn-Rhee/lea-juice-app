"use client";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ResponseError from "@/error/ResponseError";
import { DataUserAuth, ResponseNextAuth, ResponsePayload } from "@/types";
import UserValidation from "@/validation/user-validation";
import Validation from "@/validation/validation";
import {
  IconMail,
  IconLock,
  IconUser,
  IconCheck,
  IconAlertCircle,
} from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { ZodError } from "zod";
import LoginWithGoogle from "./LoginWithGoogle";

export default function FormSignup() {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [btnMsg, setBtnMsg] = useState("Creating account...");
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      const dataSignup = Validation.validate(UserValidation.REGISTER, formData);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataSignup),
      });

      const data = (await res.json()) as ResponsePayload<DataUserAuth>;
      if (data.status === "failed") {
        throw new ResponseError(data.code, data.message);
      }

      setBtnMsg("Logging you in...");

      const loginRes = (await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        callbackUrl: "/shop",
        redirect: false,
      })) as ResponseNextAuth;

      if (!loginRes.ok) {
        toast.error("Signup succeded but login failed. Please login manually.");
        router.push("/auth/login");
        return;
      }

      toast.success(data.message);
      router.push("/shop");
      router.refresh();
    } catch (err) {
      if (err instanceof ResponseError) {
        setMessage({ type: "error", text: err.message });
      } else if (err instanceof ZodError) {
        setMessage({ type: "error", text: err.issues[0].message });
      } else {
        setMessage({
          type: "error",
          text: "An unexpected error occurred. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  const handleLoginGoogle = async () => {
    try {
      const response = await signIn("google", { redirect: false });
      if (response && !response.ok) {
        throw new ResponseError(response.status, "Failed login with Google");
      }
    } catch (error) {
      if (error instanceof ResponseError) {
        toast.error(error.message);
      } else {
        toast.error("An error occured! Please try again.");
      }
    }
  };
  return (
    <>
      <CardContent className="px-8">
        {message && (
          <div
            className={`flex items-center gap-2 text-sm p-3 mb-4 rounded-xl border transition-all duration-200 ${
              message.type === "error"
                ? "bg-red-50 text-red-700 border-red-200"
                : "bg-green-50 text-green-700 border-green-200"
            }`}
          >
            {message.type === "error" ? (
              <IconAlertCircle size={18} />
            ) : (
              <IconCheck size={18} />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-black font-medium">
              Full Name
            </Label>
            <div className="relative">
              <IconUser
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-black"
              />
              <Input
                id="name"
                placeholder="Davy wibowo"
                className="pl-10 h-11 rounded-xl border-2 border-black  focus:border-yellow-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-black"
                value={formData.fullname}
                onChange={(e) =>
                  setFormData({ ...formData, fullname: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username" className="text-black font-medium">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Dfa Academy"
              className="h-11 rounded-xl border-2 border-black focus:border-yellow-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-black"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-black font-medium">
              Email Address
            </Label>
            <div className="relative">
              <IconMail
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-black"
              />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="pl-10 h-11 rounded-xl border-2 border-black focus:border-yellow-500 focus:ring-4transition-all text-black"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-black font-medium">
              Password
            </Label>
            <div className="relative">
              <IconLock
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-black"
              />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="pl-10 h-11 rounded-xl border-2 border-black focus:border-yellow-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-black"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-black font-medium">
              Confirm Password
            </Label>
            <div className="relative">
              <IconLock
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-black"
              />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter password"
                className="pl-10 h-11 rounded-xl border-2 border-black focus:border-yellow-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-black"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl font-semibold bg-black hover:bg-slate-800 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            {loading ? btnMsg : "Sign Up"}
          </Button>
        </form>

        <LoginWithGoogle handleLoginGoogle={handleLoginGoogle} />
      </CardContent>
    </>
  );
}
