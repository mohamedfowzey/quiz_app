import { SidebarTrigger } from "@/components/ui/sidebar";
import alarm from "@/public/images/Quizzes/Linker.jpeg";
import Image from "next/image";
import Link from "next/link";
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import LogoutButton from '@/components/ui/logoutBtn';
import { SidebarTrigger } from '@/components/ui/sidebar';
import alarm from '@/public/images/Quizzes/Linker.jpeg';
import { jwtDecode } from 'jwt-decode';
import { ArrowBigDown, ChevronDown, LogOut } from 'lucide-react';
import { cookies } from 'next/headers';
import Image from 'next/image';

interface profile{
  
email
: 
string
exp
: 
number
iat
: 
number
role
: 
string
sub
: 
string
}

export default async function Navbar() {
  const cookiesStore = await cookies()
  const token = cookiesStore.get('auth_token')?.value;
  
  const userData : profile|undefined = jwtDecode(token || '');
  console.log(userData);
  

  return (
    <nav className="w-full bg-white px-6 py-4 flex items-center justify-between font-sans">
      {/* Left Section: Logo */}
      <SidebarTrigger />
      <div className="flex items-center pl-4 border-l border-gray-100 h-full">
        <span className="text-gray-800 font-bold text-lg tracking-tight select-none">
          dashboaed
        </span>
      </div>

      {/* Right Section: Button + User Info Dropdown */}
      <div className="flex items-center gap-6">
        {/* Pill-shaped Action Button */}
        <Link
          href="/instructor/quizzes"
          className="flex items-center gap-2 px-4 py-1.5 border border-gray-300 rounded-full text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
        >
          <Image src={alarm.src} alt="add quiz" width={20} height={20} />
          <span>New quiz</span>
        </Link>
        {/* Vertical Divider */}
        <div className="h-8 w-px bg-gray-200" />

        {/* User Info / Profile Dropdown Trigger */}
        <div className=" sticky top-0 items-center gap-4 cursor-pointer group select-none flex">
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-bold text-gray-800 leading-tight">
              {userData?.email}
            </span>
            <span className="text-[10px] font-medium text-emerald-500 leading-tight">
              {userData?.role}
            </span>
          </div>

          {/* Dropdown Chevron Arrow */}

          <DropdownMenu >
  <DropdownMenuTrigger >
    <ChevronDown/>
    
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuGroup>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>change pass</DropdownMenuItem>
      
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <LogoutButton/>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>

          {/* <svg 
            className="w-3 h-3 text-gray-400 group-hover:text-gray-600 transition-colors" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg> */}
        </div>
      </div>
    </nav>
  );
}
