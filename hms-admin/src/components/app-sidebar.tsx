import { Bed, Box, ClipboardList, Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "All Beds",
    url: "/beds",
    icon: Bed,
  },
  {
    title: "Inventory",
    url: "/inventory",
    icon: Box,
  },
  {
    title: "OPD Queue",
    url: "/opd-queue",
    icon: ClipboardList,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="min-h-screen border-r bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 shadow-sm">
      <SidebarContent className="p-4">
        {/* App Title */}
        <div className="mb-6 px-2">
          <h1 className="text-xl font-bold text-primary tracking-tight">
            🏥 SmartCare
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Hospital Dashboard
          </p>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <div className="mt-auto px-4 py-3 border-t border-slate-200 dark:border-slate-800 text-xs text-muted-foreground text-center">
        © 2025 SmartCare
      </div>
    </Sidebar>
  );
}
