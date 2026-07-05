import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default function Main({ children }: { children: ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <div className="flex ">
          <AppSidebar />

          <div className="flex-1 min-w-0 ">
            <SidebarTrigger />
            <nav>bnavbar</nav>
            {children}
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
