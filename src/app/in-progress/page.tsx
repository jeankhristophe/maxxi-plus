"use client";

import { useState, useEffect } from "react";
import { PlayCircle, Play, Pause, Clock, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { usePlayer, getAllProgress } from "@/contexts/PlayerContext";
import { formatDuration } from "@/types";
import type { Episode, Podcast } from "@/types";

interface ProgressEntry {
  episodeId: string;
  time: number;
  duration: number;
  updatedAt: number;
  episode?: Episode;
  podcast?: Podcast;
}

export default function InProgressPage() {
  const [entries, setEntries] = useState<ProgressEntry[]>([]);
  const { playEpisode, currentEpisode, isPlaying, togglePlay } = usePlayer();

  useEffect(() => {
    const progress = getAllProgress();
    const episodeIds = Object.keys(progress);

    if (episodeIds.length === 0) {
      setEntries([]);
      return;
    }

    const supabase = createClient();
    supabase
      .from("episodes")
      .select("*, podcasts(*)")
      .in("id", episodeIds)
      .then(({ data }) => {
        if (!data) return;
        const enriched = data
          .map((ep: Episode & { podcasts: Podcast }) => ({
            episodeId: ep.id,
            time: progress[ep.id].time,
            duration: progress[ep.id].duration,
            updatedAt: progress[ep.id].updatedAt,
            episode: ep,
            podcast: ep.podcasts,
          }))
          .filter((e: ProgressEntry) => {
            // Only show if not finished (< 95% played)
            const pct = e.duration > 0 ? e.time / e.duration : 0;
            return pct < 0.95 && e.time > 10;
          })
          .sort((a: ProgressEntry, b: ProgressEntry) => b.updatedAt - a.updatedAt);
        setEntries(enriched);
      });
  }, []);

  function removeEntry(episodeId: string) {
    try {
      const data = JSON.parse(localStorage.getItem("maxxi_progress") || "{}");
      delete data[episodeId];
      localStorage.setItem("maxxi_progress", JSON.stringify(data));
      setEntries((prev) => prev.filter((e) => e.episodeId !== episodeId));
    } catch {}
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber/15 flex items-center justify-center">
          <PlayCircle className="w-5 h-5 text-amber" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold">En cours</h1>
          <p className="text-sm text-muted">{entries.length} épisode{entries.length !== 1 ? "s" : ""} en cours</p>
        </div>
      </div>

      {entries.length > 0 ? (
        <div className="space-y-2">
          {entries.map((entry) => {
            if (!entry.episode || !entry.podcast) return null;
            const isActive = currentEpisode?.id === entry.episodeId;
            const pct = entry.duration > 0 ? (entry.time / entry.duration) * 100 : 0;

            return (
              <div
                key={entry.episodeId}
                className={`group flex items-center gap-4 p-3 rounded-xl transition-all ${
                  isActive ? "bg-amber/10 border border-amber/20" : "hover:bg-elevated border border-transparent"
                }`}
              >
                <button
                  onClick={() => isActive ? togglePlay() : playEpisode(entry.episode!, entry.podcast!)}
                  className={`w-10 h-10 shrink-0 rounded-full border flex items-center justify-center transition-all ${
                    isActive ? "bg-amber text-white border-amber" : "bg-elevated border-border text-muted group-hover:bg-amber group-hover:text-white group-hover:border-amber"
                  }`}
                >
                  {isActive && isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <img src={entry.podcast.cover_url || "/placeholder.png"} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold truncate ${isActive ? "text-amber" : "group-hover:text-amber"} transition-colors`}>
                    {entry.episode.title}
                  </p>
                  <p className="text-xs text-muted truncate">{entry.podcast.title}</p>
                  {/* Progress bar */}
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1 h-1 bg-elevated rounded-full">
                      <div className="h-full bg-amber rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-[10px] text-subtle shrink-0">
                      {formatDuration(Math.floor(entry.duration - entry.time))} restant
                    </span>
                  </div>
                </div>
                <button onClick={() => removeEntry(entry.episodeId)} className="p-1.5 text-muted hover:text-live transition-colors opacity-0 group-hover:opacity-100">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <PlayCircle className="w-16 h-16 text-muted mb-4" />
          <p className="text-lg font-semibold mb-2">Rien en cours</p>
          <p className="text-sm text-muted max-w-xs">Commencez à écouter un épisode, votre progression sera sauvegardée ici.</p>
        </div>
      )}
    </div>
  );
}
