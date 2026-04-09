import Link from "next/link";
import {
  Radio,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Headphones,
  Search,
  Clock,
} from "lucide-react";
import PodcastCard from "@/components/PodcastCard";
import RadioGridCard from "@/components/RadioGridCard";
import { createClient } from "@/lib/supabase/server";
import type { Podcast } from "@/types";

// Fetch Apple Top Podcasts France
async function getAppleTrending(): Promise<string[]> {
  try {
    const res = await fetch(
      "https://rss.applemarketingtools.com/api/v2/fr/podcasts/top/50/podcasts.json",
      { next: { revalidate: 3600 } }, // Cache 1h
    );
    const data = await res.json();
    const results = data?.feed?.results ?? [];
    return results.map((r: { name: string }) => r.name.toLowerCase());
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const supabase = await createClient();

  const [{ data: stations }, { data: podcasts }, appleTrending] = await Promise.all([
    supabase.from("radio_stations").select("*").eq("is_active", true).order("sort_order"),
    supabase.from("podcasts_with_latest").select("*").order("latest_published_at", { ascending: false, nullsFirst: false }),
    getAppleTrending(),
  ]);

  const allStations = stations ?? [];
  const allPodcasts = (podcasts ?? []) as (Podcast & { latest_published_at: string | null; episode_count: number })[];

  // Tendances = podcasts qu'on a en base ET qui sont dans le top Apple France
  const trending = allPodcasts
    .filter((p) => appleTrending.some((t) => p.title.toLowerCase().includes(t) || t.includes(p.title.toLowerCase())))
    .slice(0, 10);

  // Nouveautés = triés par dernier épisode publié (les plus actifs)
  const recentlyUpdated = allPodcasts
    .filter((p) => p.latest_published_at && !trending.some((t) => t.id === p.id))
    .slice(0, 10);

  // À découvrir = le reste, mélangé aléatoirement
  const seen = new Set([...trending.map((p) => p.id), ...recentlyUpdated.map((p) => p.id)]);
  const discover = allPodcasts
    .filter((p) => !seen.has(p.id))
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);

  return (
    <div className="p-4 md:p-8">
      {/* ─── Search bar ─── */}
      <section className="mb-6 animate-fade-in">
        <Link
          href="/search"
          className="flex items-center gap-3 w-full max-w-md h-11 px-4 rounded-xl bg-surface border border-border text-sm text-muted hover:border-amber/30 transition-all"
        >
          <Search className="w-4 h-4" />
          Rechercher radios, podcasts...
        </Link>
      </section>

      {/* ─── Nos Radios ─── */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-amber" />
            <h3 className="font-display text-xl font-bold">Nos Radios</h3>
          </div>
          <Link href="/radio" className="flex items-center gap-1 text-sm text-muted hover:text-amber transition-colors">
            Voir tout <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {allStations.map((station) => (
            <RadioGridCard key={station.id} station={station} />
          ))}
        </div>
      </section>

      {/* ─── Tendances (basé sur Apple Top France) ─── */}
      {trending.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber" />
              <h3 className="font-display text-xl font-bold">Tendances</h3>
              <span className="text-[10px] text-muted bg-elevated px-2 py-0.5 rounded-full hidden sm:block">Top Apple Podcasts</span>
            </div>
            <Link href="/podcasts" className="flex items-center gap-1 text-sm text-muted hover:text-amber transition-colors">
              Voir tout <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {trending.map((p) => (
              <PodcastCard key={p.id} podcast={p} />
            ))}
          </div>
        </section>
      )}

      {/* ─── Récemment mis à jour ─── */}
      {recentlyUpdated.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber" />
              <h3 className="font-display text-xl font-bold">Récemment mis à jour</h3>
            </div>
            <Link href="/podcasts" className="flex items-center gap-1 text-sm text-muted hover:text-amber transition-colors">
              Voir tout <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {recentlyUpdated.map((p) => (
              <PodcastCard key={p.id} podcast={p} />
            ))}
          </div>
        </section>
      )}

      {/* ─── À découvrir ─── */}
      {discover.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber" />
              <h3 className="font-display text-xl font-bold">À découvrir</h3>
            </div>
            <Link href="/podcasts" className="flex items-center gap-1 text-sm text-muted hover:text-amber transition-colors">
              Voir tout <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {discover.map((p) => (
              <PodcastCard key={p.id} podcast={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
