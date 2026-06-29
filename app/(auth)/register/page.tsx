import CustomInput from "@/app/(components)/auth_components/custom_input/CustomInput";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export default function Register() {
  return (
    <>
      <h1>Register </h1>
      <Input type="email" />
      {/* <CustomInput type="email" StartIcon={Mail}/> */}
    </>
  );
}
