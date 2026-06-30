import AuthTabs from "@/app/(components)/auth_components/AuthTabs/AuthTabs";
import CustomButton from "@/app/(components)/auth_components/custom_button_auth/CustomButton";
import CustomInput from "@/app/(components)/auth_components/custom_input/CustomInput";
import { Mail } from "lucide-react";

export default function Login() {
  return (
    <>
      <AuthTabs />
      <form action="">
        <CustomInput
          className="my-2"
          placeHolder={"Type your email"}
          type="email"
          StartIcon={Mail}
          labelText={"Registered email address"}
        />

        <CustomInput
          className="my-2"
          placeHolder={"Type your password"}
          type="password"
          StartIcon={Mail}
          labelText={"Password"}
        />

        <CustomButton headerText={" Sign In "} />
      </form>
    </>
  );
}
