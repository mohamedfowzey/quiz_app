import CustomButton from "@/app/(components)/auth_components/custom_button_auth/CustomButton"
import CustomInput from "@/app/(components)/auth_components/custom_input/CustomInput"
import { Mail } from "lucide-react"

export default function ResetPassword(){
    return(
        <>
         <h2 className="text-Header mb-10 "> Reset password</h2>
            <form action="">

            <CustomInput    placeHolder={'Type your email'} type="email" StartIcon={Mail} labelText={'Your email address'} />
            <CustomInput  placeHolder={'Choose your otp'} type="text" StartIcon={Mail} labelText={'OTP'} />
            <CustomInput  placeHolder={'Type your password'} type="password" StartIcon={Mail} labelText={'Password'} />
            <CustomInput  placeHolder={'Type your confirm password'} type="password" StartIcon={Mail} labelText={'Confirm Password'} />
            <CustomButton headerText={" Reset "}/>
            </form>
        </>
    )
}