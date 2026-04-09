"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import EpisodeRow from "@/components/EpisodeRow";
import type { Episode, Podcast } from "@/types";

export default function LoadMoreEpisodes({
  podcastId,
  podcast,
  totalCount,
  initialLoaded,
}: {
  podcastId: string;
  podcast: Podcast;
  totalCount: number;
  initialLoaded: number;
}) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(initialLoaded);

  const hasMore = offset < totalCount;

  async function loadMore() {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("episodes")
      .select("*")
      .eq("podcast_id", podcastId)
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .range(offset, offset + 49);

    if (data) {
      setEpisodes((prev) => [...prev, ...data]);
      setOffset((prev) => prev + data.length);
    }
    setLoading(false);
  }

  return (
    <>
      {episodes.map((ep) => (
        <EpisodeRow key={ep.id} episode={ep} podcast={podcast} />
      ))}
      {hasMore && (
        <button
          onClick={loadMore}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-elevated text-sm font-medium text-text-secondary hover:text-text hover:bg-border transition-colors mt-2"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Chargement...
            </span>
          ) : (
            `Charger plus (${totalCount - offset} restants)`
          )}
        </button>
      )}
    </>
  );
}
