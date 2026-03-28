"use client";

import { UserButton } from "@clerk/nextjs";
import {
  CreditCardIcon,
  InboxIcon,
  LayoutDashboardIcon,
  LibraryBigIcon,
  Mic,
  PaletteIcon,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@workspace/ui/components/sidebar";

import { cn } from "@workspace/ui/lib/utils";

// ─── Nav data ────────────────────────────────────────────────────────────────

const customerSupportItems = [
  { label: "Conversations", href: "/conversations", icon: InboxIcon },
  { label: "Knowledge Base", href: "/files", icon: LibraryBigIcon },
];

const configurationItems = [
  { label: "Widget Customization", href: "/customization", icon: PaletteIcon },
  { label: "Integrations", href: "/integrations", icon: LayoutDashboardIcon },
  { label: "Voice Assistant", href: "/plugins/vapi", icon: Mic },
];

const accountItems = [
  { label: "Billing", href: "/billing", icon: CreditCardIcon },
];

// ─── NavSection ───────────────────────────────────────────────────────────────

const NavSection = ({
  label,
  items,
  isActive,
  isOpen,
}: {
  label: string;
  items: { label: string; href: string; icon: any }[];
  isActive: (href: string) => boolean;
  isOpen: boolean;
}) => (
  <SidebarGroup className="p-0 mb-2">
    {/* Section label — fades in/out with sidebar width */}
    <div
      className={cn(
        "px-2.5 mb-1.5 overflow-hidden transition-all duration-300",
        isOpen ? "opacity-100 max-h-6" : "opacity-0 max-h-0"
      )}
    >
      <p className="text-[9px] font-bold tracking-[0.18em] uppercase text-muted-foreground">
        {label}
      </p>
    </div>

    <SidebarGroupContent>
      <SidebarMenu className="gap-0.5">
        {items.map((item) => {
          const active = isActive(item.href);
          return (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={active}
                tooltip={item.label}
                className={cn(
                  "relative h-9 rounded-[8px] text-[13px] font-medium transition-all duration-200",
                  "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent",
                  active && "text-foreground bg-sidebar-accent shadow-sm"
                )}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3",
                    isOpen ? "px-2.5" : "justify-center px-0"
                  )}
                >
                  {/* Active left bar */}
                  {active && (
                    <span
                      className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-primary"
                      style={{
                        boxShadow:
                          "0 0 8px rgba(var(--color-primary), 0.5)",
                      }}
                    />
                  )}

                  {/* Icon wrapper */}
                  <span
                    className={cn(
                      "relative flex items-center justify-center size-5 shrink-0 transition-all duration-200",
                      active && "text-primary"
                    )}
                  >
                    <item.icon className="size-4" />
                  </span>

                  {/* Label — slides in */}
                  <span
                    className={cn(
                      "whitespace-nowrap transition-all duration-300 overflow-hidden",
                      isOpen
                        ? "opacity-100 max-w-[160px]"
                        : "opacity-0 max-w-0"
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
);

// ─── DashboardSidebar ─────────────────────────────────────────────────────────

export const DashboardSidebar = () => {
  const pathname = usePathname();
  const { toggleSidebar, open } = useSidebar();

  const isActive = (url: string) => {
    if (url === "/") return pathname === "/";
    return pathname.startsWith(url);
  };

  return (
    <Sidebar
      collapsible="icon"
      className="group/sidebar bg-sidebar border-r border-sidebar-border"
    >
      <SidebarRail />

      {/* ── Ambient top glow ── */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 z-0 opacity-50 dark:opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 120% 60% at 50% 0%, hsl(var(--chart-1)/0.1) 0%, transparent 60%)",
        }}
      />

      {/* ── Header ── */}
      <SidebarHeader className="px-3 pt-4 pb-3 relative z-10">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2">
              {/* Logo */}
              <SidebarMenuButton
                asChild
                tooltip="Home"
                className="h-auto! hover:bg-transparent! p-0! flex-1! min-w-0"
              >
                <Link href="/" className="flex items-center gap-2.5 min-w-0">
                  {/* Logo mark */}
                  <div
                    className="flex items-center justify-center size-[34px] rounded-[10px] shrink-0 transition-all duration-300 shadow-sm border border-border/50"
                  >
                    <Image
                      src="/vivia-logo.jpeg"
                      alt="Vivia"
                      width={20}
                      height={20}
                      className="rounded-md"
                    />
                  </div>

                  {/* Brand text */}
                  <div
                    className={cn(
                      "flex flex-col overflow-hidden transition-all duration-300",
                      open
                        ? "opacity-100 max-w-[120px]"
                        : "opacity-0 max-w-0"
                    )}
                  >
                    <p className="text-[13px] font-semibold text-foreground tracking-tight leading-none whitespace-nowrap">
                      Vivia
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 tracking-wide whitespace-nowrap">
                      Workspace
                    </p>
                  </div>
                </Link>
              </SidebarMenuButton>

              {/* ── Toggle button — always visible, rotates icon ── */}
              <button
                onClick={toggleSidebar}
                aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
                className={cn(
                  "relative flex items-center justify-center rounded-[8px] shrink-0",
                  "size-7 transition-all duration-200",
                  "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent",
                  !open && "mx-auto"
                )}
              >
                {open ? (
                  <PanelLeftClose className="size-3.5" />
                ) : (
                  <PanelLeftOpen className="size-3.5" />
                )}
              </button>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* ── Gradient divider ── */}
      <div
        className="relative z-10 mx-3 mb-3 h-px bg-sidebar-border"
      />

      {/* ── Nav ── */}
      <SidebarContent className="px-2 gap-0 relative z-10 overflow-x-hidden">
        <NavSection
          label="Support"
          items={customerSupportItems}
          isActive={isActive}
          isOpen={open}
        />
        <NavSection
          label="Configuration"
          items={configurationItems}
          isActive={isActive}
          isOpen={open}
        />
        <NavSection
          label="Account"
          items={accountItems}
          isActive={isActive}
          isOpen={open}
        />
      </SidebarContent>

      {/* ── Footer ── */}
      <SidebarFooter
        className="px-2 py-3 relative z-10 border-t border-sidebar-border"
      >
        <SidebarMenu>
          <SidebarMenuItem>
            <UserButton
              showName
              appearance={{
                elements: {
                  rootBox: "w-full! h-[42px]!",
                  userButtonTrigger:
                    "w-full! px-2.5! py-2! rounded-[9px]! border border-transparent hover:bg-sidebar-accent! group-data-[collapsible=icon]:size-9! group-data-[collapsible=icon]:p-1.5! transition-all! duration-200!",
                  userButtonBox:
                    "w-full! flex-row-reverse! justify-end! gap-2.5! group-data-[collapsible=icon]:justify-center!",
                  userButtonOuterIdentifier:
                    "pl-0! text-[12px]! font-medium! text-sidebar-foreground! group-data-[collapsible=icon]:hidden!",
                  avatarBox:
                    "size-[26px]! ring-1! ring-primary/20! ring-offset-0!",
                },
              }}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};