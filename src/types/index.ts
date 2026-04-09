// ─── Types mappés sur les tables Supabase ───

export interface RadioStation {
  id: string;
  name: string;
  type: "fm" | "web";
  frequency: string | null;
  genre: string;
  tagline: string;
  stream_url: string;
  hls_url: string | null;
  cover_url: string | null;
  color: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface Podcast {
  id: string;
  title: string;
  author: string;
  cover_url: string | null;
  category: string;
  description: string | null;
  is_featured: boolean;
  rss_url: string | null;
  created_at: string;
  updated_at: string;
  // Champs calculés (via view ou count)
  episode_count?: number;
  listener_count?: number;
}

export interface Episode {
  id: string;
  podcast_id: string;
  title: string;
  description: string | null;
  audio_url: string;
  duration_seconds: number | null;
  published_at: string | null;
  is_published: boolean;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
}

// ─── Text helpers ───

export function cleanHtml(text: string | null): string {
  if (!text) return "";
  return text
    .replace(/&amp;/g, "&")
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x27;/g, "'");
}

// ─── Helpers ───

export function formatDuration(seconds: number | null): string {
  if (!seconds) return "--:--";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function formatListeners(count: number | undefined): string {
  if (!count) return "0";
  if (count >= 1000) return `${(count / 1000).toFixed(0)}k`;
  return count.toString();
}
