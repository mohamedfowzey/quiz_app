import CustomButton from "@/app/(components)/auth_components/custom_button_auth/CustomButton";
import CustomInput from "@/app/(components)/auth_components/custom_input/CustomInput";
import { LucideKeySquare } from "lucide-react";
import { changePasswordAction } from "./actions";

export default function ChangePassword() {
  return (
    <>
      <h2 className="text-Header mb-10 "> Change password</h2>

      <form action={changePasswordAction}>
        <CustomInput
          required
          placeHolder={"Type your old password"}
          name="oldPassword"
          type="password"
          StartIcon={LucideKeySquare}
          labelText={"Old Password"}
        />

        <CustomInput
          required
          placeHolder={"Type your new password"}
          name="newPassword"
          type="password"
          StartIcon={LucideKeySquare}
          labelText={"New Password"}
        />

        <CustomButton headerText={" Change "} type="submit" />
      </form>
    </>
  );
}
