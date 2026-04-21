import { DashboardLayout } from "@/modules/auth/ui/views/dashboard/ui/layouts/dashboard-layout";
import { ThemeToggle } from "@workspace/ui/components/theme-toggle";
import { DashboardSidebar } from "@/modules/auth/ui/views/dashboard/ui/components/dashboard-sidebar";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayout>
      <div className="flex h-full bg-muted/40 selection:bg-primary/20 overflow-hidden">
        <DashboardSidebar />
        {/* Main Interface Content Area - Inset Card Style */}
        <div className="flex-1 overflow-hidden flex flex-col min-w-0 bg-background relative my-2 mr-2 ml-2 md:ml-0 lg:ml-2 rounded-2xl border border-border/60 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] transition-all duration-300">
          
          {/* Floating Glassmorphic Topbar */}
          <header className="glass shadow-soft sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between px-6 transition-all duration-200">
            <div className="flex items-center gap-4">
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

          <main className="flex-1 flex flex-col overflow-y-auto w-full custom-scrollbar p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Layout;