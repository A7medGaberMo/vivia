import { DashboardLayout } from "@/modules/auth/ui/views/dashboard/ui/layouts/dashboard-layout";
import { SidebarProvider, SidebarTrigger } from "@workspace/ui/components/sidebar";
import { ThemeToggle } from "@workspace/ui/components/theme-toggle";
import { cookies } from "next/headers";
import { DashboardSidebar } from "@/modules/auth/ui/views/dashboard/ui/components/dashboard-sidebar";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const cookieSTore = await cookies();
  const sidebarCookie = cookieSTore.get("sidebar-state")?.value !== "false";

  return (
    <DashboardLayout>
      <SidebarProvider defaultOpen={sidebarCookie} className="h-full bg-background selection:bg-primary/20">
        <DashboardSidebar />
        {/* Main Interface Content Area */}
        <div className="flex-1 overflow-y-auto flex flex-col min-w-0 bg-background relative">
          
          {/* Floating Glassmorphic Topbar */}
          <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between px-6 bg-background/80 backdrop-blur-xl border-b border-border/40 transition-all duration-200 shadow-[0_1px_4px_-1px_rgba(0,0,0,0.05)] dark:shadow-none">
            <div className="flex items-center gap-4">
              <SidebarTrigger
                className="size-8 rounded-[8px] bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-150"
              />
              <div className="h-4 w-px bg-border/50 hidden md:block" />
              {/* Contextual Route Area / Breadcrumb placeholder */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground tracking-tight">Overview</span>
              </div>
            </div>

            {/* Topbar Actions */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
            </div>
          </header>

          <main className="flex-1 p-6 flex flex-col">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </DashboardLayout>
  );
};

export default Layout;