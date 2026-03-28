import React from "react";
// Assuming AuthGuard is a custom HOC that checks auth status
import { AuthGuard } from "@/modules/auth/ui/components/auth-guard";
import { Provider } from "jotai";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <AuthGuard>
      {/* --- Semantic Structure --- */}
      {/* flex-1 ensures it takes available height. flex-col stacks children vertically. */}
      <Provider>
        <main className="flex h-full flex-col">{children}</main>
      </Provider>
    </AuthGuard>
  );
};
