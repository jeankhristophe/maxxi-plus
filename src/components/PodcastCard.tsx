import Link from "next/link";
import { Play } from "lucide-react";
import type { Podcast } from "@/types";

export default function PodcastCard({ podcast }: { podcast: Podcast }) {
  return (
    <Link
      href={`/podcast/${podcast.id}`}
      className="group block rounded-xl bg-surface border border-transparent hover:border-border p-3 transition-all duration-300 hover:bg-elevated"
    >
      {/* Cover */}
      <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
        <img
          src={podcast.cover_url || "/placeholder.png"}
          alt={podcast.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-noir/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-amber flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-5 h-5 text-white ml-0.5" />
          </div>
        </div>
        <div className="absolute top-2 left-2">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-noir/70 text-text-secondary backdrop-blur-sm">
            {podcast.category}
          </span>
        </div>
      </div>

      <h3 className="text-sm font-semibold truncate group-hover:text-amber transition-colors">
        {podcast.title}
      </h3>
      <p className="text-xs text-muted truncate mt-0.5">{podcast.author}</p>
      {podcast.episode_count != null && podcast.episode_count > 0 && (
        <p className="text-[10px] text-subtle mt-1">{podcast.episode_count} épisodes</p>
      )}
    </Link>
  );
}
