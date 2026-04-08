"use client";

import { Play } from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";
import type { Episode, Podcast } from "@/types";

export default function PlayLatestButton({
  episode,
  podcast,
}: {
  episode: Episode;
  podcast: Podcast;
}) {
  const { playEpisode } = usePlayer();

  return (
    <button
      onClick={() => playEpisode(episode, podcast)}
      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber text-white font-semibold text-sm hover:bg-amber-hover transition-colors"
    >
      <Play className="w-4 h-4" />
      Dernier épisode
    </button>
  );
}
