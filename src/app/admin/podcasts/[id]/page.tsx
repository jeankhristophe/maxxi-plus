"use client";

import { useState, useEffect, use } from "react";
import { Music2, Plus, Pencil, Trash2, Save, X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { Episode, Podcast } from "@/types";

const emptyEpisode: Partial<Episode> = {
  title: "",
  description: "",
  audio_url: "",
  duration_seconds: null,
  published_at: null,
  is_published: false,
};

export default function AdminEpisodesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: podcastId } = use(params);
  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [editing, setEditing] = useState<Partial<Episode> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    loadData();
  }, [podcastId]);

  async function loadData() {
    const [{ data: pod }, { data: eps }] = await Promise.all([
      supabase.from("podcasts").select("*").eq("id", podcastId).single(),
      supabase.from("episodes").select("*").eq("podcast_id", podcastId).order("published_at", { ascending: false }),
    ]);
    setPodcast(pod);
    setEpisodes(eps ?? []);
  }

  function handleNew() {
    setEditing({ ...emptyEpisode, podcast_id: podcastId });
    setIsNew(true);
  }

  function handleEdit(ep: Episode) {
    setEditing({ ...ep });
    setIsNew(false);
  }

  async function handleSave() {
    if (!editing?.title || !editing?.audio_url) return;

    if (isNew) {
      const { id, created_at, ...rest } = editing as Episode;
      await supabase.from("episodes").insert(rest);
    } else {
      const { id, created_at, ...rest } = editing as Episode;
      await supabase.from("episodes").update(rest).eq("id", id);
    }

    setEditing(null);
    setIsNew(false);
    loadData();
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cet épisode ?")) return;
    await supabase.from("episodes").delete().eq("id", id);
    loadData();
  }

  return (
    <div>
      <Link href="/admin/podcasts" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-text transition-colors mb-4">
        <ArrowLeft className="w-4 h-4" />
        Podcasts
      </Link>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold flex items-center gap-2">
            <Music2 className="w-6 h-6 text-amber" />
            Épisodes
          </h1>
          {podcast && <p className="text-sm text-muted">{podcast.title} — {episodes.length} épisodes</p>}
        </div>
        <button
          onClick={handleNew}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber text-white text-sm font-medium hover:bg-amber-hover transition-colors"
        >
          <Plus className="w-4 h-4" />
          Ajouter
        </button>
      </div>

      {/* Form */}
      {editing && (
        <div className="rounded-xl bg-surface border border-border p-6 mb-6">
          <h2 className="font-display text-lg font-bold mb-4">
            {isNew ? "Nouvel épisode" : `Modifier ${editing.title}`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Field label="Titre" value={editing.title || ""} onChange={(v) => setEditing({ ...editing, title: v })} />
            </div>
            <Field label="URL audio (externe)" value={editing.audio_url || ""} onChange={(v) => setEditing({ ...editing, audio_url: v })} />
            <Field label="Durée (secondes)" value={String(editing.duration_seconds || "")} onChange={(v) => setEditing({ ...editing, duration_seconds: v ? Number(v) : null })} />
            <Field label="Date de publication" value={editing.published_at?.slice(0, 10) || ""} onChange={(v) => setEditing({ ...editing, published_at: v || null })} />
            <div className="flex items-center gap-2 self-end pb-2">
              <input
                type="checkbox"
                checked={editing.is_published || false}
                onChange={(e) => setEditing({ ...editing, is_published: e.target.checked })}
                className="rounded accent-amber"
              />
              <label className="text-sm text-text-secondary">Publié</label>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-muted mb-1.5">Description</label>
              <textarea
                value={editing.description || ""}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-elevated border border-border text-sm text-text focus:outline-none focus:border-amber/50 focus:ring-1 focus:ring-amber/20 transition-all resize-none"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber text-white text-sm font-medium hover:bg-amber-hover transition-colors">
              <Save className="w-4 h-4" />
              Enregistrer
            </button>
            <button onClick={() => { setEditing(null); setIsNew(false); }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-elevated text-muted text-sm hover:text-text transition-colors">
              <X className="w-4 h-4" />
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="rounded-xl bg-surface border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted uppercase tracking-wider">
              <th className="px-4 py-3">Épisode</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Publié</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {episodes.map((ep) => (
              <tr key={ep.id} className="border-b border-border/50 hover:bg-elevated transition-colors">
                <td className="px-4 py-3">
                  <p className="font-medium">{ep.title}</p>
                  <p className="text-xs text-muted truncate max-w-[300px]">{ep.audio_url}</p>
                </td>
                <td className="px-4 py-3 text-muted text-xs">
                  {ep.published_at ? new Date(ep.published_at).toLocaleDateString("fr-FR") : "—"}
                </td>
                <td className="px-4 py-3">
                  <span className={`w-2 h-2 rounded-full inline-block ${ep.is_published ? "bg-success" : "bg-muted"}`} />
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => handleEdit(ep)} className="p-1.5 rounded-lg text-muted hover:text-amber hover:bg-elevated transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(ep.id)} className="p-1.5 rounded-lg text-muted hover:text-live hover:bg-elevated transition-colors ml-1">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
            {episodes.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted">Aucun épisode</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted mb-1.5">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-11 px-4 rounded-xl bg-elevated border border-border text-sm text-text focus:outline-none focus:border-amber/50 focus:ring-1 focus:ring-amber/20 transition-all"
      />
    </div>
  );
}
