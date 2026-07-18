import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import Navbar from "../(components)/main_components/header/NavBar";

export default function Main({ children }: { children: ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <div className="flex w-full">
          <AppSidebar />

          <div className="grow w-lg  ">
              <Navbar />
              <div className="container ">

            {children}
              </div>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
