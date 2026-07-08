"use client";

import Cookies from "js-cookie";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "./dropdown-menu";

export default function LogoutButton() {
  const router = useRouter();
  
  const logout = () => { 
    
    Cookies.remove("auth_token");

    router.push("/login");
  };

  return (<>
  <DropdownMenuItem onClick={logout} className='hover:bg-red-600! hover:text-dark z-50 text-red-600'>

   log out <LogOut />
  </DropdownMenuItem>
  </>
  );
}
