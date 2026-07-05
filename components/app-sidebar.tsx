"use client";

import * as React from "react";

import Image from "next/image";
import logo from "@/public/images/Logo icon.png";
import homeIcon from "@/public/images/Dashboard icon.svg";
import group from "@/public/images/Students icon.png";
import help from "@/public/images/help icon.png";
import quiz from "@/public/images/Quiz icon.svg";
import result from "@/public/images/result.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  
  SidebarRail,
} from "@/components/ui/sidebar";

import Link from "next/link";
import { usePathname } from "next/navigation";

// This is sample data.

  
  

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const pathEnteries = pathname.split("/")
  const role = pathEnteries[1]
  const activeLink = pathEnteries[2]
  return (
    <Sidebar collapsible="icon"  {...props} >
      <SidebarHeader>
        <div className="flex py-4 items-center justify-center">
          <Image src={logo.src} alt="Logo" width={65} height={40} />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu >
          <SidebarMenuItem className = 'mb-8 flex items-center justify-center'>
            <SidebarMenuButton size={'lg'} asChild className={` py-12 pl-8 text-lg border-b border-gray-400 rounded-none  ${activeLink === 'dashboard' && 'border-r-8 border-dark'}`}>
              <Link href={`/${role}/dashboard`} className="flex items-center gap-3 border-r-0">
              <Image src={homeIcon.src} alt="Logo" width={40} height={40} className="bg-light p-0.5"/>
                <span>dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className = 'mb-8 flex items-center justify-center'>
            <SidebarMenuButton size={'lg'} asChild className={` py-12 pl-8 text-lg border-b border-gray-400 rounded-none  ${activeLink === 'quizes' && 'border-r-8 border-dark'}`}>
              <Link href={`/${role}/quizzes`} className="flex items-center gap-3 border-r-0">
              <Image src={  quiz.src} alt="Logo" width={40} height={40} className="bg-light p-0.5"/>
                <span>quizes</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className = 'mb-8 flex items-center justify-center'>
            <SidebarMenuButton size={'lg'} asChild className={` py-12 pl-8 text-lg border-b border-gray-400 rounded-none  ${activeLink === 'groups' && 'border-r-8 border-dark'}`}>
              <Link href={`/${role}/groups`} className="flex items-center gap-3 border-r-0">
              <Image src={  group.src} alt="Logo" width={40} height={40} className="bg-light p-0.5"/>
                <span>groups</span>
              </Link>
            </SidebarMenuButton>                    </SidebarMenuItem>
          <SidebarMenuItem className = 'mb-8 flex items-center justify-center'>
            <SidebarMenuButton size={'lg'} asChild className={` py-12 pl-8 text-lg border-b border-gray-400 rounded-none  ${activeLink === 'results' && 'border-r-8 border-dark'}`}>
              <Link href={`/${role}/results`} className="flex items-center gap-3 border-r-0">
              <Image src={  result.src} alt="Logo" width={40} height={40} className="bg-light p-0.5"/>
                <span>results</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        
      </SidebarContent>
      <SidebarFooter>
            <SidebarMenuButton size={'lg'} asChild className=" text-lg border-gray-400 ">
              <Link href={`/${role}/results`} className="flex items-center gap-3 ">
              <Image src={ help.src} alt="Logo" width={40} height={40} className="bg-light p-0.5"/>
                <span>Help</span>
              </Link>
            </SidebarMenuButton>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
