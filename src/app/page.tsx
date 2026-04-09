import Link from "next/link";
import {
  Radio,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Headphones,
  Search,
} from "lucide-react";
import PodcastCard from "@/components/PodcastCard";
import RadioGridCard from "@/components/RadioGridCard";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();

  const [{ data: stations }, { data: podcasts }] = await Promise.all([
    supabase.from("radio_stations").select("*").eq("is_active", true).order("sort_order"),
    supabase.from("podcasts").select("*").order("created_at", { ascending: false }),
  ]);

  const allStations = stations ?? [];
  const allPodcasts = podcasts ?? [];
  const featured = allPodcasts.filter((p) => p.is_featured).slice(0, 4);
  const nonFeatured = allPodcasts.filter((p) => !p.is_featured);
  const recent = nonFeatured.slice(0, 4);
  const rest = nonFeatured.slice(4, 8);

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

      {/* ─── Nos Radios (carrousel) ─── */}
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
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
          {allStations.map((station) => (
            <div key={station.id} className="shrink-0 w-[42vw] sm:w-[200px] md:w-[200px]">
              <RadioGridCard station={station} />
            </div>
          ))}
        </div>
      </section>

      {/* ─── Tendances (carrousel) ─── */}
      {featured.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber" />
              <h3 className="font-display text-xl font-bold">Tendances</h3>
            </div>
            <Link href="/podcasts" className="flex items-center gap-1 text-sm text-muted hover:text-amber transition-colors">
              Voir tout <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
            {featured.map((p) => (
              <div key={p.id} className="shrink-0 w-[42vw] sm:w-[200px] md:w-[200px]">
                <PodcastCard podcast={p} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── Nouveautés (carrousel) ─── */}
      {recent.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber" />
              <h3 className="font-display text-xl font-bold">Nouveautés</h3>
            </div>
            <Link href="/podcasts" className="flex items-center gap-1 text-sm text-muted hover:text-amber transition-colors">
              Voir tout <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
            {recent.map((p) => (
              <div key={p.id} className="shrink-0 w-[42vw] sm:w-[200px] md:w-[200px]">
                <PodcastCard podcast={p} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── À découvrir (carrousel) ─── */}
      {rest.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Headphones className="w-5 h-5 text-amber" />
              <h3 className="font-display text-xl font-bold">À découvrir</h3>
            </div>
            <Link href="/podcasts" className="flex items-center gap-1 text-sm text-muted hover:text-amber transition-colors">
              Voir tout <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
            {rest.map((p) => (
              <div key={p.id} className="shrink-0 w-[42vw] sm:w-[200px] md:w-[200px]">
                <PodcastCard podcast={p} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
