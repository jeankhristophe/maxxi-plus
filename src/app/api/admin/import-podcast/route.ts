import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export async function POST(request: Request) {
  const { searchTerm } = await request.json();
  if (!searchTerm) {
    return NextResponse.json({ error: "searchTerm required" }, { status: 400 });
  }

  // 1. Detect Apple Podcasts URL or search by name
  let apple;
  const appleUrlMatch = searchTerm.match(/\/id(\d+)/);

  if (appleUrlMatch) {
    // Lookup by Apple ID
    const lookupRes = await fetch(
      `https://itunes.apple.com/lookup?id=${appleUrlMatch[1]}&country=fr`,
    );
    const lookupData = await lookupRes.json();
    if (lookupData.resultCount === 0) {
      return NextResponse.json({ error: "Podcast introuvable sur Apple Podcasts" }, { status: 404 });
    }
    apple = lookupData.results[0];
  } else {
    // Search by name
    const appleRes = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&media=podcast&country=fr&limit=1`,
    );
    const appleData = await appleRes.json();
    if (appleData.resultCount === 0) {
      return NextResponse.json({ error: "Podcast introuvable sur Apple Podcasts" }, { status: 404 });
    }
    apple = appleData.results[0];
  }
  const feedUrl = apple.feedUrl;
  const artwork = apple.artworkUrl600?.replace("600x600bb", "1400x1400bb") || "";
  const title = apple.collectionName;
  const artist = apple.artistName;

  if (!feedUrl) {
    return NextResponse.json({ error: "Aucun flux RSS trouvé pour ce podcast" }, { status: 404 });
  }

  // Determine category from Apple genres
  const genres = (apple.genres || []).join(" ").toLowerCase();
  let category = "Société";
  if (/sport|football|rugby|basket/.test(genres)) category = "Sport";
  else if (/actualité|news/.test(genres)) category = "Actualité";
  else if (/comédie|comedy|humour/.test(genres)) category = "Comédie";
  else if (/éducation|education/.test(genres)) category = "Éducation";
  else if (/technologie|tech/.test(genres)) category = "Technologie";
  else if (/science/.test(genres)) category = "Science";
  else if (/business/.test(genres)) category = "Business";
  else if (/santé|health/.test(genres)) category = "Santé";
  else if (/histoire|history/.test(genres)) category = "Histoire";
  else if (/musique|music/.test(genres)) category = "Musique";

  const supabase = getAdminClient();

  // 2. Check if podcast already exists
  const { data: existing } = await supabase
    .from("podcasts")
    .select("id")
    .eq("title", title)
    .limit(1);

  if (existing && existing.length > 0) {
    return NextResponse.json({ error: `"${title}" existe déjà dans votre catalogue`, podcastId: existing[0].id }, { status: 409 });
  }

  // 3. Insert podcast
  const { data: podcast, error: podError } = await supabase
    .from("podcasts")
    .insert({
      title,
      author: artist,
      cover_url: artwork,
      category,
      description: "",
      is_featured: false,
      rss_url: feedUrl,
    })
    .select("id")
    .single();

  if (podError || !podcast) {
    return NextResponse.json({ error: podError?.message || "Insert failed" }, { status: 500 });
  }

  // 4. Fetch RSS and import ALL episodes
  let episodeCount = 0;
  try {
    const rssRes = await fetch(feedUrl, {
      headers: { "User-Agent": "MAXXI+ Import/1.0" },
      signal: AbortSignal.timeout(15000),
    });
    const xml = await rssRes.text();

    const items = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];

    const episodes = [];
    for (const item of items) {
      const titleMatch = item.match(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/);
      const urlMatch = item.match(/<enclosure[^>]+url="([^"]+)"/);
      const durMatch = item.match(/<itunes:duration>(\d+):?(\d*):?(\d*)<\/itunes:duration>/);
      const dateMatch = item.match(/<pubDate>([^<]+)<\/pubDate>/);

      if (!titleMatch || !urlMatch) continue;

      let durationSeconds: number | null = null;
      if (durMatch) {
        const parts = [durMatch[1], durMatch[2], durMatch[3]].map((x) => (x ? parseInt(x) : 0));
        if (parts[2] > 0) durationSeconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
        else if (parts[1] > 0) durationSeconds = parts[0] * 60 + parts[1];
        else durationSeconds = parts[0];
      }

      let publishedAt: string | null = null;
      if (dateMatch) {
        try { publishedAt = new Date(dateMatch[1].trim()).toISOString(); } catch {}
      }

      episodes.push({
        podcast_id: podcast.id,
        title: titleMatch[1].trim().slice(0, 200),
        audio_url: urlMatch[1].trim(),
        duration_seconds: durationSeconds,
        published_at: publishedAt,
        is_published: true,
      });
    }

    // Insert in batches of 500
    for (let i = 0; i < episodes.length; i += 500) {
      await supabase.from("episodes").insert(episodes.slice(i, i + 500));
    }
    episodeCount = episodes.length;
  } catch {
    // Podcast created but episodes failed — that's ok, cron will pick them up
  }

  return NextResponse.json({
    success: true,
    podcast: { id: podcast.id, title, artist, category, artwork },
    episodeCount,
  });
}
