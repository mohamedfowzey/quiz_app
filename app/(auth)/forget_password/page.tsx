'use client'
import CustomButton from "@/app/(components)/auth_components/custom_button_auth/CustomButton";
import CustomInput from "@/app/(components)/auth_components/custom_input/CustomInput";
import { validations } from "@/app/(components)/validationa";
import {  apiForgetPassword, ForgetPasswordData } from "@/app/api/authApi/Auth";
import {  Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";


export default function ForgetPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useRouter();
    const {register,handleSubmit,formState: {errors}} = useForm<ForgetPasswordData>({
        mode: "onChange",
        defaultValues: { email: "" },
    });
    const onsubmit = async (data: ForgetPasswordData)=>{
        setIsLoading(true);
        const res = await apiForgetPassword(data);
        toast.success(res.data?.message);
        setIsLoading(false);
        navigate.push('/reset_password');

    }
    return (
        <>
            <h2 className="text-Header mb-10 "> Forgot password</h2>
            <form onSubmit={handleSubmit(onsubmit)}>

            <CustomInput placeHolder={'Type your email'} type="email" StartIcon={Mail} labelText={'Email address'} {...register('email',validations.email)} aria-invalid={!!errors.email?.message}/>
            <p className="text-red-700 text-sm">{errors.email?.message}</p>
            <CustomButton headerText={"Send email "} type="submit" loading={isLoading}/>

            </form>
            
        </>
    )
}