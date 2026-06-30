import CustomButton from "@/app/(components)/auth_components/custom_button_auth/CustomButton";
import CustomInput from "@/app/(components)/auth_components/custom_input/CustomInput";
import { LucideKeySquare } from "lucide-react";

export default function ChangePassword() {
  return (
    <>
      <h2 className="text-Header mb-10 "> Change password</h2>

      <form action="">
        <CustomInput
          className="my-2"
          placeHolder={"Type your old password"}
          type="password"
          StartIcon={LucideKeySquare}
          labelText={"Old Password"}
        />

        <CustomInput
          className="my-2"
          placeHolder={"Type your new password"}
          type="password"
          StartIcon={LucideKeySquare}
          labelText={"New Password"}
        />

        <CustomButton headerText={" Change "} />
      </form>
    </>
  );
}
