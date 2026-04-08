"use client";

import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import PodcastCard from "@/components/PodcastCard";
import RadioCard from "@/components/RadioCard";
import SearchBar from "@/components/SearchBar";
import { createClient } from "@/lib/supabase/client";
import type { Podcast, RadioStation } from "@/types";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [stations, setStations] = useState<RadioStation[]>([]);

  useEffect(() => {
    const supabase = createClient();
    Promise.all([
      supabase.from("podcasts").select("*"),
      supabase.from("radio_stations").select("*").eq("is_active", true),
    ]).then(([{ data: p }, { data: s }]) => {
      setPodcasts(p ?? []);
      setStations(s ?? []);
    });
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return { podcasts: [], stations: [] };
    const q = query.toLowerCase();
    return {
      podcasts: podcasts.filter(
        (p) => p.title.toLowerCase().includes(q) || p.author.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      ),
      stations: stations.filter(
        (s) => s.name.toLowerCase().includes(q) || s.genre.toLowerCase().includes(q)
      ),
    };
  }, [query, podcasts, stations]);

  const hasResults = results.podcasts.length > 0 || results.stations.length > 0;

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber/15 flex items-center justify-center">
          <Search className="w-5 h-5 text-amber" />
        </div>
        <h1 className="font-display text-2xl font-bold">Rechercher</h1>
      </div>

      <div className="max-w-lg mb-8">
        <SearchBar placeholder="Rechercher radios, podcasts..." value={query} onChange={setQuery} />
      </div>

      {!query.trim() && (
        <p className="text-muted text-sm">Tapez pour rechercher parmi {stations.length} radios et {podcasts.length} podcasts.</p>
      )}

      {query.trim() && !hasResults && (
        <div className="text-center py-16">
          <Search className="w-12 h-12 text-muted mx-auto mb-4" />
          <p className="text-lg font-semibold mb-1">Aucun résultat</p>
          <p className="text-sm text-muted">Aucun contenu ne correspond à "{query}"</p>
        </div>
      )}

      {results.stations.length > 0 && (
        <section className="mb-8">
          <h2 className="font-display text-lg font-bold mb-3">Radios ({results.stations.length})</h2>
          <div className="rounded-xl bg-surface border border-border p-1.5 space-y-0.5">
            {results.stations.map((s) => (
              <RadioCard key={s.id} station={s} />
            ))}
          </div>
        </section>
      )}

      {results.podcasts.length > 0 && (
        <section>
          <h2 className="font-display text-lg font-bold mb-3">Podcasts ({results.podcasts.length})</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.podcasts.map((p) => (
              <PodcastCard key={p.id} podcast={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
