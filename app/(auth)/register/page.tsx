import CustomInput from "@/app/(components)/auth_components/custom_input/CustomInput";
import { Mail } from "lucide-react";

export default function Register() {
  return (
    <>
      <h1>Register </h1>
      {/* <Input type="email" /> */}
      <CustomInput placeHolder='Type your email' type="email" StartIcon={Mail} labelText={'Registered email address'} />
    </>
  );
}
