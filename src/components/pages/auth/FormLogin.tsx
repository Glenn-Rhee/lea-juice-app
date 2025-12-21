"use client";
import Loader from "@/components/icons/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  IconAlertCircle,
  IconCheck,
  IconEye,
  IconEyeOff,
  IconLock,
  IconMail,
} from "@tabler/icons-react";
import LoginWithGoogle from "./LoginWithGoogle";
import { signIn } from "next-auth/react";
import Validation from "@/validation/validation";
import UserValidation from "@/validation/user-validation";
import { ZodError } from "zod";
import toast from "react-hot-toast";
import { ResponseNextAuth } from "@/types";
import ResponseError from "@/error/ResponseError";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FormLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) setError("");
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = Validation.validate(UserValidation.LOGIN, {
        email: formData.email,
        password: formData.password,
      });

      const response = (await signIn("credentials", {
        ...data,
        callbackUrl: "/shop",
        redirect: false,
      })) as ResponseNextAuth;

      if (!response.ok) {
        throw new ResponseError(
          response.status,
          response.error || "Login failed"
        );
      }

      router.push("/shop");
      router.refresh();
      setSuccess(true);
      toast.success("Login successfully!");
    } catch (error) {
      if (error instanceof ResponseError) {
        setError(error.message);
      } else if (error instanceof ZodError) {
        setError(error.issues[0].message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      setIsLoading(false);
    }
  };

  const handleLoginGoogle = async () => {
    setIsLoading(true);
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
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Success message */}
        {success && (
          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
            <IconCheck size={18} />
            <span>Login successful! Redirecting...</span>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            <IconAlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Email */}
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-sm font-medium text-black mb-2"
          >
            Email Address
          </Label>
          <div className="relative">
            <IconMail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-black"
              size={20}
            />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
              className="pl-10 h-11 rounded-xl font-medium border-2 border-black focus:border-yellow-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-black"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-black"
            >
              Password
            </Label>
          </div>
          <div className="relative">
            <IconLock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-black"
              size={20}
            />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              disabled={isLoading}
              className="pl-10 pr-10 h-11 text-stone-900 font-medium rounded-xl border-2 border-black focus:border-yellow-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
            >
              {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading || success}
          className="w-full h-11 rounded-xl font-semibold bg-black hover:bg-slate-800 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader />
              Signing in...
            </div>
          ) : success ? (
            <div className="flex items-center justify-center gap-2">
              <IconCheck size={18} />
              Success
            </div>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
      <LoginWithGoogle
        isLoading={isLoading}
        handleLoginGoogle={handleLoginGoogle}
      />
    </>
  );
}
