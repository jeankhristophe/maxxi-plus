"use client";

import { useState, useEffect } from "react";
import { Headphones, Plus, Pencil, Trash2, Save, X, List, Download, Loader2 } from "lucide-react";
import Link from "next/link";
import ImageUpload from "@/components/admin/ImageUpload";
import { createClient } from "@/lib/supabase/client";
import type { Podcast } from "@/types";

const emptyPodcast: Partial<Podcast> = {
  title: "",
  author: "",
  cover_url: "",
  category: "",
  description: "",
  is_featured: false,
};

export default function AdminPodcastsPage() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [editing, setEditing] = useState<Partial<Podcast> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [{ data: pods }, { data: cats }] = await Promise.all([
      supabase.from("podcasts").select("*").order("created_at", { ascending: false }),
      supabase.from("categories").select("name").order("sort_order"),
    ]);
    setPodcasts(pods ?? []);
    setCategories(cats?.map((c) => c.name) ?? []);
  }

  function handleNew() {
    setEditing({ ...emptyPodcast });
    setIsNew(true);
  }

  function handleEdit(p: Podcast) {
    setEditing({ ...p });
    setIsNew(false);
  }

  async function handleSave() {
    if (!editing?.title || !editing?.author || !editing?.category) return;

    if (isNew) {
      const { id, created_at, updated_at, episode_count, listener_count, ...rest } = editing as Podcast;
      await supabase.from("podcasts").insert(rest);
    } else {
      const { id, created_at, updated_at, episode_count, listener_count, ...rest } = editing as Podcast;
      await supabase.from("podcasts").update({ ...rest, updated_at: new Date().toISOString() }).eq("id", id);
    }

    setEditing(null);
    setIsNew(false);
    loadData();
  }

  // Quick import
  const [importQuery, setImportQuery] = useState("");
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<string | null>(null);
  const [showImport, setShowImport] = useState(false);

  async function handleImport() {
    if (!importQuery.trim()) return;
    setImporting(true);
    setImportResult(null);
    try {
      const res = await fetch("/api/admin/import-podcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchTerm: importQuery }),
      });
      const data = await res.json();
      if (res.ok) {
        setImportResult(`"${data.podcast.title}" importé avec ${data.episodeCount} épisodes`);
        setImportQuery("");
        loadData();
      } else {
        setImportResult(data.error || "Erreur");
      }
    } catch {
      setImportResult("Erreur de connexion");
    }
    setImporting(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer ce podcast et tous ses épisodes ?")) return;
    await fetch("/api/admin/delete-podcast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ podcastId: id }),
    });
    loadData();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold flex items-center gap-2">
            <Headphones className="w-6 h-6 text-amber" />
            Podcasts
          </h1>
          <p className="text-sm text-muted">{podcasts.length} podcasts</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowImport(!showImport)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-elevated border border-border text-sm font-medium text-text-secondary hover:text-text hover:border-amber/30 transition-colors"
          >
            <Download className="w-4 h-4" />
            Import rapide
          </button>
          <button
            onClick={handleNew}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber text-white text-sm font-medium hover:bg-amber-hover transition-colors"
          >
            <Plus className="w-4 h-4" />
            Ajouter
          </button>
        </div>
      </div>

      {/* Quick import */}
      {showImport && (
        <div className="rounded-xl bg-surface border border-border p-5 mb-6">
          <h2 className="font-display text-lg font-bold mb-2">Import rapide</h2>
          <p className="text-sm text-muted mb-4">Tapez le nom du podcast — il sera recherché sur Apple Podcasts et tous ses épisodes seront importés automatiquement.</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={importQuery}
              onChange={(e) => setImportQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleImport()}
              placeholder="Ex: Les Grosses Têtes, Hondelatte Raconte..."
              className="flex-1 h-11 px-4 rounded-xl bg-elevated border border-border text-sm text-text focus:outline-none focus:border-amber/50 transition-all"
            />
            <button
              onClick={handleImport}
              disabled={importing || !importQuery.trim()}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-amber text-white text-sm font-medium hover:bg-amber-hover transition-colors disabled:opacity-50"
            >
              {importing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {importing ? "Import..." : "Importer"}
            </button>
          </div>
          {importResult && (
            <p className={`text-sm mt-3 ${importResult.includes("importé") ? "text-success" : "text-live"}`}>
              {importResult}
            </p>
          )}
        </div>
      )}

      {/* Form */}
      {editing && (
        <div className="rounded-xl bg-surface border border-border p-6 mb-6">
          <h2 className="font-display text-lg font-bold mb-4">
            {isNew ? "Nouveau podcast" : `Modifier ${editing.title}`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Titre" value={editing.title || ""} onChange={(v) => setEditing({ ...editing, title: v })} />
            <Field label="Auteur" value={editing.author || ""} onChange={(v) => setEditing({ ...editing, author: v })} />
            <div>
              <label className="block text-xs font-medium text-muted mb-1.5">Catégorie</label>
              <select
                value={editing.category || ""}
                onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                className="w-full h-11 px-4 rounded-xl bg-elevated border border-border text-sm text-text focus:outline-none focus:border-amber/50 transition-all"
              >
                <option value="">Sélectionner...</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <ImageUpload value={editing.cover_url || ""} onChange={(v) => setEditing({ ...editing, cover_url: v || null })} folder="podcast" />
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-muted mb-1.5">Description</label>
              <textarea
                value={editing.description || ""}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-elevated border border-border text-sm text-text focus:outline-none focus:border-amber/50 focus:ring-1 focus:ring-amber/20 transition-all resize-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={editing.is_featured || false}
                onChange={(e) => setEditing({ ...editing, is_featured: e.target.checked })}
                className="rounded accent-amber"
              />
              <label className="text-sm text-text-secondary">Mis en avant (Tendances)</label>
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
              <th className="px-4 py-3">Podcast</th>
              <th className="px-4 py-3">Catégorie</th>
              <th className="px-4 py-3">Vedette</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {podcasts.map((p) => (
              <tr key={p.id} className="border-b border-border/50 hover:bg-elevated transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {p.cover_url && (
                      <img src={p.cover_url} alt="" className="w-8 h-8 rounded object-cover" />
                    )}
                    <div>
                      <p className="font-medium">{p.title}</p>
                      <p className="text-xs text-muted">{p.author}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-elevated">{p.category}</span>
                </td>
                <td className="px-4 py-3">
                  {p.is_featured && <span className="text-amber text-xs font-semibold">Oui</span>}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/podcasts/${p.id}`} className="p-1.5 rounded-lg text-muted hover:text-amber hover:bg-elevated transition-colors inline-block" title="Épisodes">
                    <List className="w-3.5 h-3.5" />
                  </Link>
                  <button onClick={() => handleEdit(p)} className="p-1.5 rounded-lg text-muted hover:text-amber hover:bg-elevated transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-lg text-muted hover:text-live hover:bg-elevated transition-colors ml-1">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
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
