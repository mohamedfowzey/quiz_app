'use client'
import AuthTabs from "@/app/(components)/auth_components/AuthTabs/AuthTabs";
import CustomButton from "@/app/(components)/auth_components/custom_button_auth/CustomButton";
import CustomInput from "@/app/(components)/auth_components/custom_input/CustomInput";
import { apiLogin, LoginData } from "@/app/api/authApi/Auth";
import axios from "axios";
import { Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Login() {

  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();
  const [loading, setLoading] = useState(false);

  const postLogin = async (data: LoginData) => {

    try {
      setLoading(true)
      let response = await apiLogin(data);
      console.log(response);
      
      toast.success(response?.data?.message, { position: "top-center" })

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // هنا TypeScript عارف إن error هو AxiosError
        const message = error.response?.data?.message ;
        toast.error(message, { position: "top-center" });
      } else {
        // لو الايرور مش من Axios (مثلاً مشكلة في الكود نفسه)
        toast.error("Network error. Please check your connection");
      }
    }

  };

  return (
    <>
      <AuthTabs />
      <form onSubmit={handleSubmit(postLogin)}>
        <CustomInput
          placeHolder={"Type your email"}
          type="email"
          StartIcon={Mail}
          {...register("email", { required: true })}
          labelText={"Registered email address"}
        />
        {errors.email && <p className="text-rose-800  mb-2 text-sm ">Registered email address Required</p>}

        <CustomInput
          placeHolder={"Type your password"}
          type="password"
          StartIcon={Mail}
          {...register("password", { required: true })}
          labelText={"Password"}
        />
        {errors.password && <p className="text-rose-800  text-sm ">Password Required</p>}

        <CustomButton type="submit" headerText={" Sign In "} />
      </form>
    </>
  );
}