'use client'
import { jwtDecode } from "jwt-decode";
import { profile } from "../header/NavBar";
import { ReactNode } from "react";
import Cookies from 'js-cookie'

export default  function OnlyInstructor({children}:{children:ReactNode}) {
    const userToken = Cookies.get('auth_token');
    if(!!userToken){
        const decoded:profile | undefined = jwtDecode(userToken);
        const role = decoded?.role
        if(role === 'Instructor'){
            return children
        }
        else{
            return <></>
        }
        
    }
    else{
  return (
    <></>
  )
}
}
