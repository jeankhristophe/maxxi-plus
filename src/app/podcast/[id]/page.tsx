import Link from "next/link";
import {
  ArrowLeft,
  Play,
  Heart,
  Share2,
  Calendar,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import EpisodeRow from "@/components/EpisodeRow";
import { formatDuration } from "@/types";
import { notFound } from "next/navigation";

export default async function PodcastDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: podcast }, { data: episodes }] = await Promise.all([
    supabase.from("podcasts").select("*").eq("id", id).single(),
    supabase
      .from("episodes")
      .select("*")
      .eq("podcast_id", id)
      .eq("is_published", true)
      .order("published_at", { ascending: false }),
  ]);

  if (!podcast) notFound();

  const podcastEpisodes = episodes ?? [];

  return (
    <div className="p-4 md:p-8">
      <Link
        href="/podcasts"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-text transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Podcasts
      </Link>

      {/* ─── Hero ─── */}
      <div className="relative rounded-2xl overflow-hidden mb-8 animate-fade-in bg-surface border border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-amber/10 via-transparent to-transparent" />
        <div className="relative p-5 md:p-8 flex flex-col md:flex-row gap-5 md:gap-8">
          <div className="relative shrink-0 flex justify-center md:block">
            <div className="absolute inset-0 bg-amber/20 blur-3xl rounded-2xl" />
            <img
              src={podcast.cover_url || "/placeholder.png"}
              alt={podcast.title}
              className="relative w-40 h-40 md:w-56 md:h-56 rounded-2xl object-cover shadow-2xl"
            />
          </div>

          <div className="flex-1 min-w-0 flex flex-col justify-end">
            <span className="px-3 py-1 rounded-full bg-amber/15 text-amber text-xs font-semibold w-fit mb-3">
              {podcast.category}
            </span>
            <h1 className="font-display text-2xl md:text-4xl font-bold tracking-tight mb-2">
              {podcast.title}
            </h1>
            <p className="text-base md:text-lg text-text-secondary mb-1">{podcast.author}</p>
            {podcast.description && (
              <p className="text-sm text-muted leading-relaxed max-w-lg mb-4">
                {podcast.description}
              </p>
            )}

            <div className="flex items-center gap-4 text-sm text-muted mb-6">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {podcastEpisodes.length} épisode{podcastEpisodes.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="flex gap-3">
              {podcastEpisodes.length > 0 && (
                <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber text-white font-semibold text-sm hover:bg-amber-hover transition-colors">
                  <Play className="w-4 h-4" />
                  Dernier épisode
                </button>
              )}
              <button className="p-3 rounded-xl bg-elevated border border-border text-text-secondary hover:text-amber hover:border-amber/30 transition-all">
                <Heart className="w-4 h-4" />
              </button>
              <button className="p-3 rounded-xl bg-elevated border border-border text-text-secondary hover:text-amber hover:border-amber/30 transition-all">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Épisodes ─── */}
      <section>
        <h2 className="font-display text-xl font-bold mb-4">
          Épisodes
          <span className="text-muted font-normal text-base ml-2">
            ({podcastEpisodes.length})
          </span>
        </h2>

        {podcastEpisodes.length > 0 ? (
          <div className="space-y-2">
            {podcastEpisodes.map((ep, i) => (
              <div key={ep.id} className={`animate-slide-up opacity-0 stagger-${Math.min(i + 1, 8)}`}>
                <EpisodeRow episode={ep} podcast={podcast} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted">Aucun épisode disponible pour le moment.</p>
          </div>
        )}
      </section>
    </div>
  );
}
