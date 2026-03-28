"use client";

import * as React from "react";

// ─── Color accent definitions using CSS oklch tokens ─────────────────────────

export type ColorThemeKey =
  | "indigo"
  | "azure"
  | "emerald"
  | "ruby"
  | "amber"
  | "violet"
  | "rose";

export interface ColorTheme {
  key: ColorThemeKey;
  label: string;
  /** Preview swatch color (hex for simplicity in UI) */
  swatch: string;
  /** CSS variables overrides injected into :root */
  vars: {
    "--primary": string;
    "--ring": string;
    "--sidebar-primary": string;
    "--sidebar-ring": string;
    "--chart-1": string;
  };
}

export const COLOR_THEMES: ColorTheme[] = [
  {
    key: "indigo",
    label: "Indigo",
    swatch: "#6366f1",
    vars: {
      "--primary": "oklch(0.6231 0.188 259.8145)",
      "--ring": "oklch(0.6231 0.188 259.8145)",
      "--sidebar-primary": "oklch(0.6231 0.188 259.8145)",
      "--sidebar-ring": "oklch(0.6231 0.188 259.8145)",
      "--chart-1": "oklch(0.6231 0.188 259.8145)",
    },
  },
  {
    key: "azure",
    label: "Azure",
    swatch: "#0ea5e9",
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
    swatch: "#10b981",
    vars: {
      "--primary": "oklch(0.6963 0.1699 162.48)",
      "--ring": "oklch(0.6963 0.1699 162.48)",
      "--sidebar-primary": "oklch(0.6963 0.1699 162.48)",
      "--sidebar-ring": "oklch(0.6963 0.1699 162.48)",
      "--chart-1": "oklch(0.6963 0.1699 162.48)",
    },
  },
  {
    key: "ruby",
    label: "Ruby",
    swatch: "#ef4444",
    vars: {
      "--primary": "oklch(0.6272 0.2261 27.325)",
      "--ring": "oklch(0.6272 0.2261 27.325)",
      "--sidebar-primary": "oklch(0.6272 0.2261 27.325)",
      "--sidebar-ring": "oklch(0.6272 0.2261 27.325)",
      "--chart-1": "oklch(0.6272 0.2261 27.325)",
    },
  },
  {
    key: "amber",
    label: "Amber",
    swatch: "#f59e0b",
    vars: {
      "--primary": "oklch(0.7669 0.177 75.26)",
      "--ring": "oklch(0.7669 0.177 75.26)",
      "--sidebar-primary": "oklch(0.7669 0.177 75.26)",
      "--sidebar-ring": "oklch(0.7669 0.177 75.26)",
      "--chart-1": "oklch(0.7669 0.177 75.26)",
    },
  },
  {
    key: "violet",
    label: "Violet",
    swatch: "#8b5cf6",
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
    swatch: "#f43f5e",
    vars: {
      "--primary": "oklch(0.6441 0.2303 14.74)",
      "--ring": "oklch(0.6441 0.2303 14.74)",
      "--sidebar-primary": "oklch(0.6441 0.2303 14.74)",
      "--sidebar-ring": "oklch(0.6441 0.2303 14.74)",
      "--chart-1": "oklch(0.6441 0.2303 14.74)",
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
  colorTheme: "indigo",
  setColorTheme: () => {},
  themes: COLOR_THEMES,
});

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ColorThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorTheme, setColorThemeState] = React.useState<ColorThemeKey>("indigo");

  // Load persisted theme on mount
  React.useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ColorThemeKey | null;
    if (stored && COLOR_THEMES.find((t) => t.key === stored)) {
      setColorThemeState(stored);
    }
  }, []);

  // Apply CSS variables whenever theme changes
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
    <ColorThemeContext.Provider value={{ colorTheme, setColorTheme, themes: COLOR_THEMES }}>
      {children}
    </ColorThemeContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useColorTheme() {
  return React.useContext(ColorThemeContext);
}
