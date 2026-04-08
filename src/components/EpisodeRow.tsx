"use client";

import { Play, Pause, Clock } from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";
import { formatDuration } from "@/types";
import type { Episode, Podcast } from "@/types";

export default function EpisodeRow({
  episode,
  podcast,
}: {
  episode: Episode;
  podcast: Podcast;
}) {
  const { playEpisode, currentEpisode, isPlaying, togglePlay } = usePlayer();
  const isActive = currentEpisode?.id === episode.id;

  function handleClick() {
    if (isActive) {
      togglePlay();
    } else {
      playEpisode(episode, podcast);
    }
  }

  return (
    <div
      className={`group flex items-start gap-4 p-4 rounded-xl border transition-all ${
        isActive
          ? "border-amber/20 bg-amber/5"
          : "border-transparent hover:border-border hover:bg-elevated"
      }`}
    >
      <button
        onClick={handleClick}
        className={`mt-1 w-10 h-10 shrink-0 rounded-full border flex items-center justify-center transition-all ${
          isActive
            ? "bg-amber text-white border-amber"
            : "bg-elevated border-border text-muted group-hover:bg-amber group-hover:text-white group-hover:border-amber"
        }`}
      >
        {isActive && isPlaying ? (
          <Pause className="w-4 h-4" />
        ) : (
          <Play className="w-4 h-4 ml-0.5" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <h3 className={`text-sm font-semibold truncate transition-colors ${
          isActive ? "text-amber" : "group-hover:text-amber"
        }`}>
          {episode.title}
        </h3>
        {episode.description && (
          <p className="text-xs text-muted mt-1 line-clamp-2">{episode.description}</p>
        )}
        <div className="flex items-center gap-3 mt-2 text-[11px] text-subtle">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDuration(episode.duration_seconds)}
          </span>
          {episode.published_at && (
            <span>
              {new Date(episode.published_at).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
