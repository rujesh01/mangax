import { AppSidebar } from "@/components/app-sidebar"
import Navbar from "@/components/navbar/navbar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Navbar/>
        <div className="px-3 py-2">
        {children}
        </div>
      </main>
    </SidebarProvider>
  )
}