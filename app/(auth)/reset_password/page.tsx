'use client'
import CustomButton from "@/app/(components)/auth_components/custom_button_auth/CustomButton"
import CustomInput from "@/app/(components)/auth_components/custom_input/CustomInput"
import { validations } from "@/app/(components)/validationa";
import { apiReset, ResetPasswordData } from "@/app/api/authApi/Auth";
import axios from "axios";
import { Mail } from "lucide-react"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ResetPassword(){
    const [loading,setLoading] = useState(false);
    const {register, handleSubmit, formState: {errors},getValues} = useForm<ResetPasswordData>({mode:'onChange'});
    const submit = async (data:ResetPasswordData)=>{
        setLoading(true);
        try {
            const res = await apiReset(data);
            toast.success(res.data?.message);
        } catch (err) {
            if(axios.isAxiosError(err)){
            const message = err?.response?.data?.message || 'Something went wrong';
            toast.error(message);
        }
        else{
            toast.error('Something went wrong');
        }
    }
    finally {
        setLoading(false);
    }
}

    return(
        <>
         <h2 className="text-Header mb-10 "> Reset password</h2>
            <form onSubmit={handleSubmit(submit)}>

            <CustomInput aria-invalid = {!!errors.email} placeHolder={'Type your email'} type="email" StartIcon={Mail} labelText={'Your email address'} {...register("email", validations.email)} />
            <p className="text-red-500">{errors.email?.message}</p>
            <CustomInput aria-invalid = {!!errors.otp} placeHolder={'Choose your otp'} type="text" StartIcon={Mail} labelText={'OTP'} {...register("otp", validations.otp)} />
            <p className="text-red-500">{errors.otp?.message}</p>
            <CustomInput aria-invalid = {!!errors.password} placeHolder={'Type your password'} type="password" StartIcon={Mail} labelText={'Password'} {...register("password", validations.password)} />
            <p className="text-red-500">{errors.password?.message}</p>
            <CustomInput aria-invalid = {!!errors.confirmPassword} placeHolder={'Type your confirm password'} type="password" StartIcon={Mail} labelText={'Confirm Password'} {...register("confirmPassword", {...validations.confirmPassword,validate: value => value === getValues('password') || 'Passwords do not match'})} />
            <p className="text-red-500">{errors.confirmPassword?.message}</p>
            <CustomButton headerText={" Reset "} loading={loading} type='submit'/>
            </form>
        </>
    )
}