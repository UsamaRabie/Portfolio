"use client";

import { useTheme } from "@/lib/theme";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ compact }: { compact?: boolean }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        compact ? "w-full p-2.5" : "w-full px-4 py-3 rounded-xl"
      }`}
      title={compact ? (theme === "dark" ? "Light Mode" : "Dark Mode") : undefined}
      style={{
        color: "var(--sidebar-text)",
        border: "1px solid var(--sidebar-border)",
        background: "transparent",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--sidebar-hover)";
        e.currentTarget.style.color = "var(--sidebar-heading)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = "var(--sidebar-text)";
      }}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      {!compact && <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>}
    </button>
  );
}
