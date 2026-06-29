import CustomInput from "@/app/(components)/auth_components/custom_input/CustomInput";
import { Mail } from "lucide-react";

export default function Register() {
  return (
    <>
      <h1>Register </h1>
      <CustomInput type="email" StartIcon={Mail} aria-invalid/>
    </>
  );
}
