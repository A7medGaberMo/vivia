"use client";

import * as React from "react";
import { CheckIcon, PaletteIcon } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import { useColorTheme, COLOR_THEMES, type ColorThemeKey } from "@/components/color-theme-provider";

// ─── Swatch button ───────────────────────────────────────────────────────────

const Swatch = ({
  theme,
  isActive,
  onClick,
  size = "default",
}: {
  theme: (typeof COLOR_THEMES)[number];
  isActive: boolean;
  onClick: () => void;
  size?: "default" | "sm";
}) => (
  <button
    onClick={onClick}
    title={theme.label}
    aria-label={`Switch to ${theme.label} theme`}
    className={cn(
      "relative rounded-full transition-all duration-200 outline-none",
      "hover:scale-110 focus-visible:scale-110",
      size === "default" ? "size-5" : "size-4",
      isActive && "ring-2 ring-offset-2 ring-offset-sidebar scale-110"
    )}
    style={{
      backgroundColor: theme.swatch,
      "--tw-ring-color": theme.swatch,
    } as React.CSSProperties}
  >
    {isActive && (
      <CheckIcon
        className={cn(
          "absolute inset-0 m-auto text-white drop-shadow-sm",
          size === "default" ? "size-2.5" : "size-2"
        )}
        strokeWidth={3}
      />
    )}
  </button>
);

// ─── Main ColorThemePicker ────────────────────────────────────────────────────

export function ColorThemePicker({ isOpen }: { isOpen: boolean }) {
  const { colorTheme, setColorTheme } = useColorTheme();
  const activeTheme = COLOR_THEMES.find((t) => t.key === colorTheme) ?? COLOR_THEMES[0]!;

  return (
    <div className="transition-all duration-300">
      {/* ── Expanded view: label + row of swatches ── */}
      {isOpen ? (
        <div className="flex items-center gap-2 px-1 py-1">
          {/* Label */}
          <div className="flex items-center gap-1.5 shrink-0 mr-0.5">
            <PaletteIcon className="size-3.5 text-muted-foreground/50" />
          </div>
          {/* All swatches in a row */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {COLOR_THEMES.map((t) => (
              <Swatch
                key={t.key}
                theme={t}
                isActive={colorTheme === t.key}
                onClick={() => setColorTheme(t.key as ColorThemeKey)}
              />
            ))}
          </div>
        </div>
      ) : (
        /* ── Collapsed view: just the active swatch centered ── */
        <div className="flex justify-center py-1">
          <Swatch
            theme={activeTheme}
            isActive={true}
            onClick={() => {
              // Cycle to next theme
              const idx = COLOR_THEMES.findIndex((t) => t.key === colorTheme);
              const next = COLOR_THEMES[(idx + 1) % COLOR_THEMES.length];
              if (next) setColorTheme(next.key as ColorThemeKey);
            }}
            size="sm"
          />
        </div>
      )}
    </div>
  );
}
