"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Info",
    url: "/info",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathName = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <Button variant={"link"}>
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold"
            aria-label="Go to homepage"
          >
            <div className="relative min-w-10 w-30 md:w-40 h-10">
              <Image src="/logo.svg" alt="App Logo" fill />
            </div>
          </Link>
        </Button>
      </SidebarHeader>

      <Separator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "flex items-center gap-2 w-full px-3 py-2 rounded-md transition-colors hover:bg-slate-100 dark:hover:bg-slate-800",
                    pathName === item.url && "bg-slate-200 dark:bg-slate-700"
                  )}
                >
                  <Link href={item.url}>
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {/* Add footer items like profile/logout here if needed */}
        <h1>this is code</h1>
      </SidebarFooter>
    </Sidebar>
  );
}
