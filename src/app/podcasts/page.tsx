"use client";

import { useState, useMemo, useEffect } from "react";
import { Headphones, LayoutGrid, List } from "lucide-react";
import PodcastCard from "@/components/PodcastCard";
import CategoryPills from "@/components/CategoryPills";
import SearchBar from "@/components/SearchBar";
import { createClient } from "@/lib/supabase/client";
import type { Podcast } from "@/types";

export default function PodcastsPage() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tous");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("podcasts")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => setPodcasts(data ?? []));
  }, []);

  const filtered = useMemo(() => {
    return podcasts.filter((p) => {
      const matchesCategory = category === "Tous" || p.category === category;
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.author.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [podcasts, search, category]);

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber/15 flex items-center justify-center">
            <Headphones className="w-5 h-5 text-amber" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold">Podcasts</h1>
            <p className="text-sm text-muted">Annuaire francophone — {podcasts.length} podcasts</p>
          </div>
        </div>
        <div className="flex items-center gap-1 p-1 rounded-lg bg-elevated">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-md transition-colors ${viewMode === "grid" ? "bg-amber/15 text-amber" : "text-muted hover:text-text"}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-md transition-colors ${viewMode === "list" ? "bg-amber/15 text-amber" : "text-muted hover:text-text"}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mb-5 max-w-md animate-slide-up opacity-0 stagger-1">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      <div className="mb-6 animate-slide-up opacity-0 stagger-2">
        <CategoryPills onSelect={setCategory} />
      </div>

      <p className="text-xs text-muted mb-4">
        {filtered.length} résultat{filtered.length !== 1 ? "s" : ""}
        {category !== "Tous" && ` dans "${category}"`}
        {search && ` pour "${search}"`}
      </p>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((p, i) => (
            <div key={p.id} className={`animate-slide-up opacity-0 stagger-${Math.min(i + 1, 8)}`}>
              <PodcastCard podcast={p} />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((p, i) => (
            <a
              key={p.id}
              href={`/podcast/${p.id}`}
              className={`flex items-center gap-4 p-3 rounded-xl hover:bg-elevated transition-colors group animate-slide-up opacity-0 stagger-${Math.min(i + 1, 8)}`}
            >
              <img src={p.cover_url || "/placeholder.png"} alt={p.title} className="w-14 h-14 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate group-hover:text-amber transition-colors">{p.title}</p>
                <p className="text-xs text-muted truncate">{p.author}</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-elevated text-muted">{p.category}</span>
            </a>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Headphones className="w-12 h-12 text-muted mb-4" />
          <p className="text-lg font-semibold mb-1">Aucun podcast trouvé</p>
          <p className="text-sm text-muted">Essayez d&apos;ajuster votre recherche ou vos filtres</p>
        </div>
      )}
    </div>
  );
}
