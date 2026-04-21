"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ConvexReactClient } from "convex/react";

import { useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ColorThemeProvider } from "@/components/color-theme-provider";

const convexClient = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <ConvexProviderWithClerk client={convexClient} useAuth={useAuth}>
        <ColorThemeProvider>
          {children}
        </ColorThemeProvider>
      </ConvexProviderWithClerk>
    </NextThemesProvider>
  );
}
