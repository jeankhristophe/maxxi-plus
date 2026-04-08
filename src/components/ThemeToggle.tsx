"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored ? stored === "dark" : true;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  if (compact) {
    return (
      <button
        onClick={toggle}
        aria-label={dark ? "Mode clair" : "Mode sombre"}
        className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-muted transition-colors"
      >
        {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        <span className="text-[10px] font-medium">{dark ? "Clair" : "Sombre"}</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Mode clair" : "Mode sombre"}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted hover:text-text hover:bg-elevated transition-all duration-200 w-full"
    >
      {dark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
      {dark ? "Mode clair" : "Mode sombre"}
    </button>
  );
}

export default ThemeToggle;
