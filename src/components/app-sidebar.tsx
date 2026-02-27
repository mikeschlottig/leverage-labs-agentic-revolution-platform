import React from "react";
import { 
  LayoutDashboard, 
  Terminal, 
  Wand2, 
  Database, 
  Library, 
  Settings, 
  HelpCircle,
  Network,
  Cpu,
  Workflow
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
const MENU_GROUPS = [
  {
    label: "Workspace",
    items: [
      { title: "Overview", icon: LayoutDashboard, url: "/app/overview" },
      { title: "Agent Builder", icon: Wand2, url: "/app/builder" },
      { title: "Workflows", icon: Workflow, url: "/app/builder" },
    ]
  },
  {
    label: "Infrastructure",
    items: [
      { title: "Build Workers", icon: Terminal, url: "/app/workers" },
      { title: "MCP Tool Shop", icon: Network, url: "/app/knowledge" },
      { title: "Data Pipelines", icon: Database, url: "/app/data" },
    ]
  },
  {
    label: "Knowledge",
    items: [
      { title: "Personas", icon: Cpu, url: "/app/knowledge" },
      { title: "Global Prompt Library", icon: Library, url: "/app/knowledge" },
    ]
  }
];
export function AppSidebar(): JSX.Element {
  const location = useLocation();
  return (
    <Sidebar collapsible="icon" className="border-r border-zinc-200 dark:border-zinc-800">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3 px-2">
          <div className="h-8 w-8 shrink-0 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Network className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight truncate group-data-[collapsible=icon]:hidden">
            Studio
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {MENU_GROUPS.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="px-4 py-2 group-data-[collapsible=icon]:hidden">
              {group.label}
            </SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    tooltip={item.title}
                    className="hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-zinc-200 dark:border-zinc-800">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <a href="#">
                <Settings />
                <span>Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Documentation">
              <a href="#">
                <HelpCircle />
                <span>Documentation</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}