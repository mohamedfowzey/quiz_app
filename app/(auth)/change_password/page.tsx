"use client";
import CustomButton from "@/app/(components)/auth_components/custom_button_auth/CustomButton";
import CustomInput from "@/app/(components)/auth_components/custom_input/CustomInput";
import { validations } from "@/app/(components)/validationa";
import { apichangePassword } from "@/app/api/authApi/Auth";
import axios from "axios";
import { LucideKeySquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner"; //

interface ChangePasswordData {
  password: string;
  password_new: string;
}

export default function ChangePassword() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordData>({
    mode: "onChange",
    defaultValues: { password: "", password_new: "" },
  });

  const onSubmit = async (data: ChangePasswordData) => {
    try {
      const res = await apichangePassword(data);
      toast.success(res.data?.message);
      reset();
      router.push("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      }
    }
  };

  return (
    <>
      <h2 className="text-Header mb-10 "> Change password</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <CustomInput
            aria-invalid={!!errors.password?.message}
            placeHolder={"Type your old password"}
            type="password"
            StartIcon={LucideKeySquare}
            labelText={"Old Password"}
            {...register("password", validations.password)}
          />
          <p className="text-sm text-red-600">{errors.password?.message}</p>
        </div>

        <div>
          <CustomInput
            aria-invalid={!!errors.password_new?.message}
            placeHolder={"Type your new password"}
            type="password"
            StartIcon={LucideKeySquare}
            labelText={"New Password"}
            {...register("password_new", validations.password)}
          />
          <p className="text-sm text-red-600">{errors.password_new?.message}</p>
        </div>

        <CustomButton headerText={" Change "} type="submit" />
      </form>
    </>
  );
}
