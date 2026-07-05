import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import Navbar from "../(components)/main_components/header/NavBar";

export default function Main({ children }: { children: ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <div className="flex ">
          <AppSidebar />

          <div className="flex-1 min-w-0 ">
            <div className = 'flex'>
              <Navbar />
            </div>
            {children}
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
