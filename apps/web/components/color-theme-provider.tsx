"use client";

import * as React from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ColorThemeKey =
  | "azure"
  | "emerald"
  | "violet"
  | "rose"
  | "amber";

export interface ColorTheme {
  key: ColorThemeKey;
  label: string;
  swatch: string;
  vars: {
    "--primary": string;
    "--ring": string;
    "--sidebar-primary": string;
    "--sidebar-ring": string;
    "--chart-1": string;
  };
}

// ─── Themes (5 Distinct Colors) ───────────────────────────────────────────────

export const COLOR_THEMES: ColorTheme[] = [
  {
    key: "azure",
    label: "Azure",
    swatch: "#0ea5e9", // Tailwind Sky 500
    vars: {
      "--primary": "oklch(0.6488 0.1897 239.42)",
      "--ring": "oklch(0.6488 0.1897 239.42)",
      "--sidebar-primary": "oklch(0.6488 0.1897 239.42)",
      "--sidebar-ring": "oklch(0.6488 0.1897 239.42)",
      "--chart-1": "oklch(0.6488 0.1897 239.42)",
    },
  },
  {
    key: "emerald",
    label: "Emerald",
    swatch: "#10b981", // Tailwind Emerald 500
    vars: {
      "--primary": "oklch(0.6963 0.1699 162.48)",
      "--ring": "oklch(0.6963 0.1699 162.48)",
      "--sidebar-primary": "oklch(0.6963 0.1699 162.48)",
      "--sidebar-ring": "oklch(0.6963 0.1699 162.48)",
      "--chart-1": "oklch(0.6963 0.1699 162.48)",
    },
  },
  {
    key: "violet",
    label: "Violet",
    swatch: "#8b5cf6", // Tailwind Violet 500
    vars: {
      "--primary": "oklch(0.6324 0.2201 296.67)",
      "--ring": "oklch(0.6324 0.2201 296.67)",
      "--sidebar-primary": "oklch(0.6324 0.2201 296.67)",
      "--sidebar-ring": "oklch(0.6324 0.2201 296.67)",
      "--chart-1": "oklch(0.6324 0.2201 296.67)",
    },
  },
  {
    key: "rose",
    label: "Rose",
    swatch: "#f43f5e", // Tailwind Rose 500
    vars: {
      "--primary": "oklch(0.645 0.246 16.439)",
      "--ring": "oklch(0.645 0.246 16.439)",
      "--sidebar-primary": "oklch(0.645 0.246 16.439)",
      "--sidebar-ring": "oklch(0.645 0.246 16.439)",
      "--chart-1": "oklch(0.645 0.246 16.439)",
    },
  },
  {
    key: "amber",
    label: "Amber",
    swatch: "#f59e0b", // Tailwind Amber 500
    vars: {
      "--primary": "oklch(0.76 0.177 75.3)",
      "--ring": "oklch(0.76 0.177 75.3)",
      "--sidebar-primary": "oklch(0.76 0.177 75.3)",
      "--sidebar-ring": "oklch(0.76 0.177 75.3)",
      "--chart-1": "oklch(0.76 0.177 75.3)",
    },
  },
];

const STORAGE_KEY = "vivia-color-theme";

// ─── Context ──────────────────────────────────────────────────────────────────

interface ColorThemeContextValue {
  colorTheme: ColorThemeKey;
  setColorTheme: (key: ColorThemeKey) => void;
  themes: ColorTheme[];
}

const ColorThemeContext = React.createContext<ColorThemeContextValue>({
  colorTheme: "azure",
  setColorTheme: () => { },
  themes: COLOR_THEMES,
});

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ColorThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [colorTheme, setColorThemeState] =
    React.useState<ColorThemeKey>("azure");

  // load + validate
  React.useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (
      stored &&
      COLOR_THEMES.some((t) => t.key === stored)
    ) {
      setColorThemeState(stored as ColorThemeKey);
    } else {
      // Fallback to default azure if indigo or invalid was stored
      setColorThemeState("azure");
      localStorage.setItem(STORAGE_KEY, "azure");
    }
  }, []);

  // apply theme
  React.useEffect(() => {
    const theme = COLOR_THEMES.find((t) => t.key === colorTheme);
    if (!theme) return;

    const root = document.documentElement;

    Object.entries(theme.vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [colorTheme]);

  const setColorTheme = React.useCallback((key: ColorThemeKey) => {
    setColorThemeState(key);
    localStorage.setItem(STORAGE_KEY, key);
  }, []);

  return (
    <ColorThemeContext.Provider
      value={{ colorTheme, setColorTheme, themes: COLOR_THEMES }}
    >
      {children}
    </ColorThemeContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useColorTheme() {
  return React.useContext(ColorThemeContext);
}