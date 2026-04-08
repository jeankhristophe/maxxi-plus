import Link from "next/link";
import {
  ArrowLeft,
  Play,
  Heart,
  Share2,
  Clock,
  Headphones,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
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
    <div className="p-8">
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
        <div className="relative p-8 flex flex-col md:flex-row gap-8">
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-amber/20 blur-3xl rounded-2xl" />
            <img
              src={podcast.cover_url || "/placeholder.png"}
              alt={podcast.title}
              className="relative w-56 h-56 rounded-2xl object-cover shadow-2xl"
            />
          </div>

          <div className="flex-1 min-w-0 flex flex-col justify-end">
            <span className="px-3 py-1 rounded-full bg-amber/15 text-amber text-xs font-semibold w-fit mb-3">
              {podcast.category}
            </span>
            <h1 className="font-display text-4xl font-bold tracking-tight mb-2">
              {podcast.title}
            </h1>
            <p className="text-lg text-text-secondary mb-1">{podcast.author}</p>
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
              <div
                key={ep.id}
                className={`group flex items-start gap-4 p-4 rounded-xl border border-transparent hover:border-border hover:bg-elevated transition-all animate-slide-up opacity-0 stagger-${Math.min(i + 1, 8)}`}
              >
                <button className="mt-1 w-10 h-10 shrink-0 rounded-full bg-elevated border border-border flex items-center justify-center text-muted group-hover:bg-amber group-hover:text-white group-hover:border-amber transition-all">
                  <Play className="w-4 h-4 ml-0.5" />
                </button>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold truncate group-hover:text-amber transition-colors">
                    {ep.title}
                  </h3>
                  {ep.description && (
                    <p className="text-xs text-muted mt-1 line-clamp-2">{ep.description}</p>
                  )}
                  <div className="flex items-center gap-3 mt-2 text-[11px] text-subtle">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDuration(ep.duration_seconds)}
                    </span>
                    {ep.published_at && (
                      <span>
                        {new Date(ep.published_at).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    )}
                  </div>
                </div>
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
