"use client";

import { Search } from "lucide-react";

export default function SearchBar({
  placeholder = "Rechercher un podcast...",
  value,
  onChange,
}: {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div className="relative">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full h-11 pl-10 pr-4 rounded-xl bg-elevated border border-border text-sm text-text placeholder:text-muted focus:outline-none focus:border-amber/50 focus:ring-1 focus:ring-amber/20 transition-all"
      />
    </div>
  );
}
