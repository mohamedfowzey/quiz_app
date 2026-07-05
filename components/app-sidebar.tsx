"use client";

import * as React from "react";

import { NavUser } from "@/components/nav-user";
import Image from "next/image";
import logo from "@/public/images/Logo icon.png";
import homeIcon from "@/public/images/Dashboard icon.svg";
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
import {
  TerminalSquareIcon,
  BotIcon,
  BookOpenIcon,
  Settings2Icon,
  FrameIcon,
  PieChartIcon,
  MapIcon,
  FilePieChartIcon,
  
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  
  navMain: [
    {
      title: "Playground",
      url: "/quizes",
      icon: <TerminalSquareIcon />,
      isActive: true,
      
    },
    {
      title: "Models",
      url: "#",
      icon: <BotIcon />,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: <BookOpenIcon />,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: <Settings2Icon />,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: <FrameIcon />,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: <PieChartIcon />,
    },
    {
      name: "Travel",
      url: "#",
      icon: <MapIcon />,
    },
  ],
};

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
          <SidebarMenuItem>
            <SidebarMenuButton size={'lg'} asChild className={` py-12 pl-8 text-lg border-b border-gray-400 rounded-none  ${activeLink === 'dashboard' && 'border-r-8 border-dark'}`}>
              <Link href={`/${role}/dashboard`} className="flex items-center gap-3 border-r-0">
              <Image src={homeIcon.src} alt="Logo" width={40} height={40} className="bg-light p-0.5"/>
                <span>dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton size={'lg'} asChild className={` py-12 pl-8 text-lg border-b border-gray-400 rounded-none  ${activeLink === 'quizes' && 'border-r-8 border-dark'}`}>
              <Link href={`/${role}/quizes`} className="flex items-center gap-3 border-r-0">
              <Image src={homeIcon.src} alt="Logo" width={40} height={40} className="bg-light p-0.5"/>
                <span>quizes</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton size={'lg'} asChild className={` py-12 pl-8 text-lg border-b border-gray-400 rounded-none  ${activeLink === 'groups' && 'border-r-8 border-dark'}`}>
              <Link href={`/${role}/groups`} className="flex items-center gap-3 border-r-0">
              <Image src={homeIcon.src} alt="Logo" width={40} height={40} className="bg-light p-0.5"/>
                <span>groups</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton size={'lg'} asChild className={` py-12 pl-8 text-lg border-b border-gray-400 rounded-none  ${activeLink === 'results' && 'border-r-8 border-dark'}`}>
              <Link href={`/${role}/results`} className="flex items-center gap-3 border-r-0">
              <Image src={homeIcon.src} alt="Logo" width={40} height={40} className="bg-light p-0.5"/>
                <span>results</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        
      </SidebarContent>
      <SidebarFooter>
            <SidebarMenuButton size={'lg'} asChild className=" text-lg border-gray-400 ">
              <Link href={`/${role}/results`} className="flex items-center gap-3 ">
              <Image src={homeIcon.src} alt="Logo" width={40} height={40} className="bg-light p-0.5"/>
                <span>results</span>
              </Link>
            </SidebarMenuButton>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
