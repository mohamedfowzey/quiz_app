'use client'
import AuthTabs from "@/app/(components)/auth_components/AuthTabs/AuthTabs";
import CustomButton from "@/app/(components)/auth_components/custom_button_auth/CustomButton";
import CustomInput from "@/app/(components)/auth_components/custom_input/CustomInput";
import { validations } from "@/app/(components)/validationa";
import { apiRegister } from "@/app/api/authApi/Auth";
import axios from "axios";
import { Mail, User } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
interface RegisterData{
  first_name: string
  last_name: string
  email: string
  password: string
  role: 'Instructor' | 'Student' | ''
}
export default function Register() {

  const [loading, setLoading] = useState(false);
  const {register,handleSubmit,formState:errors,control} = useForm<RegisterData>({mode:'onChange',defaultValues:{role:'',first_name:'',last_name:'',email:'',password:''}});
  
  const onSubmit = async(data:RegisterData)=>{
    try{
      setLoading(true);
      const res = await apiRegister(data);
      toast.success(res.data?.message)
      redirect('/login')
    }
    catch(error:unknown){
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data?.message);
      }
      setLoading(false);
    }
  }

  return (
    <>
      <AuthTabs/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-2">
          <div>

          <CustomInput 
          aria-invalid = {!!errors.errors.first_name?.message}
          placeHolder="type your first name"
          type="text"
          StartIcon={User}
          labelText="first name"
          {...register('first_name',validations.oneWordName)}
          />
        <p className="text-sm text-red-600">{errors.errors.first_name?.message}</p>
          </div>
          <div>

          <CustomInput 
                    aria-invalid = {!!errors.errors.last_name?.message}

          placeHolder="type your last name"
          type="text"
          StartIcon={User}
          labelText="last name"
          {...register('last_name',validations.oneWordName)}
          />
        <p className="text-sm text-red-600">{errors.errors.last_name?.message}</p>
          </div>
        </div>

      <CustomInput
                aria-invalid = {!!errors.errors.email?.message}

       placeHolder='Type your email'
        type="email" 
        StartIcon={Mail} 
        labelText={'Registered email address'} 
        {...register('email',validations.email)} 
        />
       <p className="text-sm text-red-600">{errors.errors.email?.message}</p>
           {/* @ts-expect-error: Bypassing strict control typing mismatch */}

       <CustomInput  aria-invalid = {!!errors.errors.role?.message} placeHolder="role" labelText="choose a role" type="select" StartIcon={User} name="role" control={control}/>
       <p className="text-sm text-red-600">{errors.errors.role?.message}</p>
      <CustomInput
                aria-invalid = {!!errors.errors.password?.message}

       placeHolder='Type your password'
        type="password" 
        StartIcon={Mail} 
        labelText={'Password'} 
        {...register('password',validations.password)} 
        />
        <p className="text-sm text-red-600">{errors.errors.password?.message}</p>
        <CustomButton type="submit" headerText="register" loading={loading}/>
      </form>
    </>
  );
}
