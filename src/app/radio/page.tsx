"use client";

import { useState, useMemo, useEffect } from "react";
import { Radio, LayoutGrid, List, Wifi } from "lucide-react";
import RadioCard from "@/components/RadioCard";
import RadioGridCard from "@/components/RadioGridCard";
import SearchBar from "@/components/SearchBar";
import { createClient } from "@/lib/supabase/client";
import type { RadioStation } from "@/types";

const radioTypes = ["Toutes", "FM", "Web"] as const;

export default function RadioPage() {
  const [stations, setStations] = useState<RadioStation[]>([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState<string>("Toutes");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("radio_stations")
      .select("*")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => setStations(data ?? []));
  }, []);

  const filtered = useMemo(() => {
    return stations.filter((s) => {
      const matchesType =
        type === "Toutes" ||
        (type === "FM" && s.type === "fm") ||
        (type === "Web" && s.type === "web");
      const matchesSearch =
        !search ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.genre.toLowerCase().includes(search.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [stations, search, type]);

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber/15 flex items-center justify-center">
            <Radio className="w-5 h-5 text-amber" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold">Radios Live</h1>
            <p className="text-sm text-muted">{stations.length} stations</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-live/15 text-live text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-live animate-pulse-live" />
            En direct
          </span>
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
      </div>

      <div className="mb-5 max-w-md animate-slide-up opacity-0 stagger-1">
        <SearchBar placeholder="Rechercher une radio..." value={search} onChange={setSearch} />
      </div>

      <div className="flex gap-2 mb-6 animate-slide-up opacity-0 stagger-2">
        {radioTypes.map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${type === t ? "bg-amber text-white" : "bg-elevated text-text-secondary hover:text-text hover:bg-border"}`}
          >
            {t === "FM" && <Radio className="w-3 h-3" />}
            {t === "Web" && <Wifi className="w-3 h-3" />}
            {t}
          </button>
        ))}
      </div>

      <p className="text-xs text-muted mb-4">
        {filtered.length} station{filtered.length !== 1 ? "s" : ""}
        {type !== "Toutes" && ` ${type}`}
        {search && ` pour "${search}"`}
      </p>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((s, i) => (
            <div key={s.id} className={`animate-slide-up opacity-0 stagger-${Math.min(i + 1, 8)}`}>
              <RadioGridCard station={s} />
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-surface border border-border p-1.5 space-y-0.5">
          {filtered.map((s) => (
            <RadioCard key={s.id} station={s} />
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Radio className="w-12 h-12 text-muted mb-4" />
          <p className="text-lg font-semibold mb-1">Aucune radio trouvée</p>
          <p className="text-sm text-muted">Essayez d&apos;ajuster votre recherche ou vos filtres</p>
        </div>
      )}
    </div>
  );
}
