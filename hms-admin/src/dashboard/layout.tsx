import { AppSidebar } from "@/components/app-sidebar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SearchIcon } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="sticky top-0 bg-white z-10 flex justify-between gap-4 shadow-sm p-2 items-center">
          <div className="flex gap-4 items-center">
            <SidebarTrigger />
            <div>
              <h3 className="text-xl  font-bold">Dashboard</h3>
              <p className="text-sm">Welcome to the dashboard!</p>
            </div>
          </div>
          <div className="flex gap-4 justify-between items-center">
            <InputGroup className="max-w-[300px]">
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
            <div className="flex justify-between items-center gap-2">
              <span className="h-4 w-4 rounded-full p-2 border border-gray-100">
                <img src="/avatar.svg" alt="" className="w-8 h-8" />
              </span>
              <p>Admin</p>
            </div>
          </div>
        </div>
        <>{children}</>
      </main>
    </SidebarProvider>
  );
}
