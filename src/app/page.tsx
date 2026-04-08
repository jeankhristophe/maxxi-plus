import Link from "next/link";
import {
  Radio,
  Wifi,
  Play,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Headphones,
  Mic2,
} from "lucide-react";
import PodcastCard from "@/components/PodcastCard";
import RadioCard from "@/components/RadioCard";
import { radioStations, podcasts } from "@/data/mock";

const trendingPodcasts = podcasts.slice(0, 4);
const newPodcasts = podcasts.slice(4, 8);
const editorPicks = podcasts.slice(8, 12);

export default function HomePage() {
  return (
    <div className="p-8">
      {/* ─── Hero Branding ─── */}
      <section className="relative rounded-2xl overflow-hidden mb-10 animate-fade-in bg-surface border border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-amber/10 via-transparent to-transparent" />

        <div className="relative px-8 py-10 md:px-10 md:py-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-3">
            MAXXI<span className="text-gradient-amber">+</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-lg mb-6">
            Vos radios en direct et les meilleurs podcasts francophones, réunis en un seul endroit.
          </p>

          {/* Stats */}
          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-live/15 flex items-center justify-center">
                <Radio className="w-4 h-4 text-live" />
              </div>
              <div>
                <p className="text-xl font-bold leading-none">10</p>
                <p className="text-[11px] text-muted">radios live</p>
              </div>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber/15 flex items-center justify-center">
                <Mic2 className="w-4 h-4 text-amber" />
              </div>
              <div>
                <p className="text-xl font-bold leading-none">{podcasts.length}</p>
                <p className="text-[11px] text-muted">podcasts</p>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex gap-3">
            <Link
              href="/radio"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber text-white font-semibold text-sm hover:bg-amber-hover transition-colors"
            >
              <Radio className="w-4 h-4" />
              Écouter les radios
            </Link>
            <Link
              href="/podcasts"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-elevated border border-border text-text-secondary font-medium text-sm hover:text-text hover:border-amber/30 transition-all"
            >
              <Headphones className="w-4 h-4" />
              Découvrir les podcasts
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Nos Radios ─── */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-amber" />
            <h3 className="font-display text-xl font-bold">Nos Radios</h3>
          </div>
          <Link
            href="/radio"
            className="flex items-center gap-1 text-sm text-muted hover:text-amber transition-colors"
          >
            Voir tout <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 rounded-xl bg-surface border border-border p-2">
          {radioStations.map((station) => (
            <RadioCard key={station.id} station={station} />
          ))}
        </div>
      </section>

      {/* ─── Tendances ─── */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber" />
            <h3 className="font-display text-xl font-bold">Tendances</h3>
          </div>
          <Link
            href="/podcasts"
            className="flex items-center gap-1 text-sm text-muted hover:text-amber transition-colors"
          >
            Voir tout <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {trendingPodcasts.map((p, i) => (
            <div key={p.id} className={`animate-slide-up opacity-0 stagger-${i + 1}`}>
              <PodcastCard podcast={p} />
            </div>
          ))}
        </div>
      </section>

      {/* ─── Nouveautés ─── */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber" />
            <h3 className="font-display text-xl font-bold">Nouveautés</h3>
          </div>
          <Link
            href="/podcasts"
            className="flex items-center gap-1 text-sm text-muted hover:text-amber transition-colors"
          >
            Voir tout <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {newPodcasts.map((p, i) => (
            <div key={p.id} className={`animate-slide-up opacity-0 stagger-${i + 5}`}>
              <PodcastCard podcast={p} />
            </div>
          ))}
        </div>
      </section>

      {/* ─── Sélection de la rédaction ─── */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Headphones className="w-5 h-5 text-amber" />
            <h3 className="font-display text-xl font-bold">Sélection de la rédaction</h3>
          </div>
          <Link
            href="/podcasts"
            className="flex items-center gap-1 text-sm text-muted hover:text-amber transition-colors"
          >
            Voir tout <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {editorPicks.map((p) => (
            <PodcastCard key={p.id} podcast={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
