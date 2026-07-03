import { AppSidebar } from "@/components/app-sidebar";
import {   SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default function Main({children}:{children:ReactNode}){
    return (<>
        <div className="flex ">
                <SidebarProvider>
            <div className="flex-0 ">
                <AppSidebar/>
            </div>
            <div className="flex-1 min-w-0 ">
                    <SidebarTrigger/>
                <nav>bnavbar</nav>

    {children}
            </div>
                </SidebarProvider>
        </div>
    </>)
}