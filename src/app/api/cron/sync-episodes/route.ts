import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Use service-level client (bypasses RLS) for cron inserts
function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export async function GET(request: Request) {
  // Verify cron secret to prevent unauthorized calls
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getAdminClient();

  // Get all podcasts with RSS URLs
  const { data: podcasts } = await supabase
    .from("podcasts")
    .select("id, title, rss_url")
    .not("rss_url", "is", null);

  if (!podcasts || podcasts.length === 0) {
    return NextResponse.json({ message: "No podcasts with RSS URLs" });
  }

  let newEpisodes = 0;
  let errors = 0;

  for (const podcast of podcasts) {
    try {
      // Fetch RSS feed
      const res = await fetch(podcast.rss_url!, {
        headers: { "User-Agent": "MAXXI+ Podcast Sync/1.0" },
        signal: AbortSignal.timeout(10000),
      });

      if (!res.ok) continue;

      const xml = await res.text();

      // Parse items (simple regex, no XML lib needed)
      const items = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];

      // Get existing episode audio URLs for this podcast to avoid duplicates
      const { data: existing } = await supabase
        .from("episodes")
        .select("audio_url")
        .eq("podcast_id", podcast.id);

      const existingUrls = new Set(existing?.map((e) => e.audio_url) || []);

      const newItems = [];
      for (const item of items) {
        const titleMatch = item.match(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/);
        const urlMatch = item.match(/<enclosure[^>]+url="([^"]+)"/);
        const durMatch = item.match(/<itunes:duration>(\d+):?(\d*):?(\d*)<\/itunes:duration>/);
        const dateMatch = item.match(/<pubDate>([^<]+)<\/pubDate>/);

        if (!titleMatch || !urlMatch) continue;

        const audioUrl = urlMatch[1].trim();
        if (existingUrls.has(audioUrl)) continue;

        let durationSeconds: number | null = null;
        if (durMatch) {
          const parts = [durMatch[1], durMatch[2], durMatch[3]].map((x) =>
            x ? parseInt(x) : 0,
          );
          if (parts[2] > 0) durationSeconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
          else if (parts[1] > 0) durationSeconds = parts[0] * 60 + parts[1];
          else durationSeconds = parts[0];
        }

        let publishedAt: string | null = null;
        if (dateMatch) {
          try {
            publishedAt = new Date(dateMatch[1].trim()).toISOString();
          } catch {}
        }

        newItems.push({
          podcast_id: podcast.id,
          title: titleMatch[1].trim().slice(0, 200),
          audio_url: audioUrl,
          duration_seconds: durationSeconds,
          published_at: publishedAt,
          is_published: true,
        });
      }

      if (newItems.length > 0) {
        // Insert in batches of 500
        for (let i = 0; i < newItems.length; i += 500) {
          const batch = newItems.slice(i, i + 500);
          await supabase.from("episodes").insert(batch);
        }
        newEpisodes += newItems.length;
      }
    } catch {
      errors++;
    }
  }

  return NextResponse.json({
    message: `Sync complete`,
    podcasts: podcasts.length,
    newEpisodes,
    errors,
    timestamp: new Date().toISOString(),
  });
}
