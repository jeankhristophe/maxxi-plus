import { Radio, Headphones, Music2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const [{ count: stationCount }, { count: podcastCount }, { count: episodeCount }] =
    await Promise.all([
      supabase.from("radio_stations").select("*", { count: "exact", head: true }),
      supabase.from("podcasts").select("*", { count: "exact", head: true }),
      supabase.from("episodes").select("*", { count: "exact", head: true }),
    ]);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-2">Dashboard</h1>
      <p className="text-sm text-muted mb-8">
        Connecté en tant que {user.email}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link href="/admin/radios" className="rounded-xl bg-surface border border-border p-6 hover:border-amber/30 transition-colors group">
          <Radio className="w-8 h-8 text-amber mb-3" />
          <p className="text-3xl font-bold">{stationCount ?? 0}</p>
          <p className="text-sm text-muted">Stations radio</p>
        </Link>
        <Link href="/admin/podcasts" className="rounded-xl bg-surface border border-border p-6 hover:border-amber/30 transition-colors group">
          <Headphones className="w-8 h-8 text-amber mb-3" />
          <p className="text-3xl font-bold">{podcastCount ?? 0}</p>
          <p className="text-sm text-muted">Podcasts</p>
        </Link>
        <div className="rounded-xl bg-surface border border-border p-6">
          <Music2 className="w-8 h-8 text-amber mb-3" />
          <p className="text-3xl font-bold">{episodeCount ?? 0}</p>
          <p className="text-sm text-muted">Épisodes</p>
        </div>
      </div>
    </div>
  );
}
