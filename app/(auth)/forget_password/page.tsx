import CustomButton from "@/app/(components)/auth_components/custom_button_auth/CustomButton";
import CustomInput from "@/app/(components)/auth_components/custom_input/CustomInput";
import {  Mail } from "lucide-react";


export default function ForgetPassword() {
    return (
        <>

            

            <h2 className="text-Header mb-10 "> Forgot password</h2>


            <form >

            <CustomInput placeHolder='Type your email' type="email" StartIcon={Mail} labelText={'Email address'} />
            <CustomButton headerText={"Send email "}/>

            </form>
            
        </>
    )
}