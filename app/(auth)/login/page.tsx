"use client";
import AuthTabs from "@/app/(components)/auth_components/AuthTabs/AuthTabs";
import CustomButton from "@/app/(components)/auth_components/custom_button_auth/CustomButton";
import CustomInput from "@/app/(components)/auth_components/custom_input/CustomInput";
import { apiLogin, LoginData } from "@/app/api/authApi/Auth";
import axios from "axios";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const postLogin = async (data: LoginData) => {
    try {
      setLoading(true);
      const response = await apiLogin(data);

      Cookies.set("auth_token", response.data.data.accessToken, {
        expires: 7,
        sameSite: "strict",
      });

      Cookies.set("role", response.data.data.profile.role, {
        expires: 7,
        sameSite: "strict",
      });

      router.push(
        response.data.data.profile.role === "Instructor"
          ? "/instructor/dashboard"
          : "/learner/dashboard",
      );
      toast.success(response.data.message, {
        position: "top-center",
      });
      setLoading(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message, {
          position: "top-center",
        });
      } else {
        toast.error("Network error");
      }
    }
    setLoading(false);
  };

  return (
    <>
      <AuthTabs />
      <form onSubmit={handleSubmit(postLogin)} className="w-full">
        <CustomInput
          placeHolder={"Type your email"}
          type="email"
          StartIcon={Mail}
          {...register("email", { required: true })}
          labelText={"Registered email address"}
        />
        {errors.email && (
          <p className="text-rose-800 mb-2 text-sm ">
            Registered email address Required
          </p>
        )}

        <CustomInput
          placeHolder={"Type your password"}
          type="password"
          StartIcon={Mail}
          {...register("password", { required: true })}
          labelText={"Password"}
        />
        {errors.password && (
          <p className="text-rose-800 text-sm mb-4">Password Required</p>
        )}

        <div className="flex items-center  justify-end">
          <p className="text-gray-300 text-sm font-light">
            Forgot password?{" "}
            <Link
              href="/forget_password"
              className="text-[#C5FF41] hover:underline font-normal transition-all"
            >
              click here
            </Link>
          </p>
        </div>
        <CustomButton  type="submit" headerText={" Sign In "} loading={loading}   />
      </form>
    </>
  );
}
