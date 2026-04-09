"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

export default function GlobalSearch() {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");

  // Hide on admin pages and search page itself
  if (pathname.startsWith("/admin") || pathname === "/search") return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="px-4 pt-4 md:px-8 md:pt-6">
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input
          type="text"
          placeholder="Rechercher radios, podcasts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-11 pl-10 pr-4 rounded-xl bg-surface border border-border text-sm text-text placeholder:text-muted focus:outline-none focus:border-amber/50 focus:ring-1 focus:ring-amber/20 transition-all"
        />
      </div>
    </form>
  );
}
