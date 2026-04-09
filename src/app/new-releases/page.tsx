"use client";

import { useState, useEffect } from "react";
import { Sparkles, Play, Pause, Clock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { usePlayer } from "@/contexts/PlayerContext";
import { formatDuration } from "@/types";
import type { Episode, Podcast } from "@/types";

interface EpisodeWithPodcast extends Episode {
  podcasts: Podcast;
}

export default function NewReleasesPage() {
  const [episodes, setEpisodes] = useState<EpisodeWithPodcast[]>([]);
  const { playEpisode, currentEpisode, isPlaying, togglePlay } = usePlayer();

  useEffect(() => {
    const supabase = createClient();
    const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();
    supabase
      .from("episodes")
      .select("*, podcasts(*)")
      .eq("is_published", true)
      .gte("published_at", twoDaysAgo)
      .order("published_at", { ascending: false })
      .limit(50)
      .then(({ data }) => setEpisodes((data as EpisodeWithPodcast[]) ?? []));
  }, []);

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber/15 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-amber" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold">Nouveautés</h1>
          <p className="text-sm text-muted">Épisodes publiés dans les dernières 48h</p>
        </div>
      </div>

      {episodes.length > 0 ? (
        <div className="space-y-2">
          {episodes.map((ep) => {
            const isActive = currentEpisode?.id === ep.id;
            const podcast = ep.podcasts;
            return (
              <div
                key={ep.id}
                className={`group flex items-center gap-4 p-3 rounded-xl transition-all ${
                  isActive ? "bg-amber/10 border border-amber/20" : "hover:bg-elevated border border-transparent"
                }`}
              >
                <button
                  onClick={() => isActive ? togglePlay() : playEpisode(ep, podcast)}
                  className={`w-10 h-10 shrink-0 rounded-full border flex items-center justify-center transition-all ${
                    isActive ? "bg-amber text-white border-amber" : "bg-elevated border-border text-muted group-hover:bg-amber group-hover:text-white group-hover:border-amber"
                  }`}
                >
                  {isActive && isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <img src={podcast?.cover_url || "/placeholder.png"} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold truncate ${isActive ? "text-amber" : "group-hover:text-amber"} transition-colors`}>{ep.title}</p>
                  <p className="text-xs text-muted truncate">{podcast?.title}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[11px] text-muted flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDuration(ep.duration_seconds)}
                  </p>
                  {ep.published_at && (
                    <p className="text-[10px] text-subtle">
                      {new Date(ep.published_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Sparkles className="w-16 h-16 text-muted mb-4" />
          <p className="text-lg font-semibold mb-2">Pas de nouveautés</p>
          <p className="text-sm text-muted">Aucun épisode publié dans les dernières 48 heures.</p>
        </div>
      )}
    </div>
  );
}
