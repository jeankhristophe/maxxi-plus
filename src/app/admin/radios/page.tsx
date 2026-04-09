"use client";

import { useState, useEffect } from "react";
import { Radio, Plus, Pencil, Trash2, Save, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import ImageUpload from "@/components/admin/ImageUpload";
import type { RadioStation } from "@/types";

const emptyStation: Partial<RadioStation> = {
  name: "",
  type: "fm",
  frequency: "",
  genre: "",
  tagline: "",
  stream_url: "",
  hls_url: "",
  cover_url: "",
  color: "#8B5CF6",
  sort_order: 0,
  is_active: true,
};

export default function AdminRadiosPage() {
  const [stations, setStations] = useState<RadioStation[]>([]);
  const [editing, setEditing] = useState<Partial<RadioStation> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    loadStations();
  }, []);

  async function loadStations() {
    const { data } = await supabase.from("radio_stations").select("*").order("sort_order");
    setStations(data ?? []);
  }

  function handleNew() {
    setEditing({ ...emptyStation, sort_order: stations.length + 1 });
    setIsNew(true);
  }

  function handleEdit(station: RadioStation) {
    setEditing({ ...station });
    setIsNew(false);
  }

  async function handleSave() {
    if (!editing?.name || !editing?.stream_url) return;

    if (isNew) {
      const { id, created_at, ...rest } = editing as RadioStation;
      await supabase.from("radio_stations").insert(rest);
    } else {
      const { id, created_at, ...rest } = editing as RadioStation;
      await supabase.from("radio_stations").update(rest).eq("id", id);
    }

    setEditing(null);
    setIsNew(false);
    loadStations();
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cette station ?")) return;
    await fetch("/api/admin/delete-station", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stationId: id }),
    });
    loadStations();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold flex items-center gap-2">
            <Radio className="w-6 h-6 text-amber" />
            Stations Radio
          </h1>
          <p className="text-sm text-muted">{stations.length} stations</p>
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
            {isNew ? "Nouvelle station" : `Modifier ${editing.name}`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Nom" value={editing.name || ""} onChange={(v) => setEditing({ ...editing, name: v })} />
            <div>
              <label className="block text-xs font-medium text-muted mb-1.5">Type</label>
              <select
                value={editing.type || "fm"}
                onChange={(e) => setEditing({ ...editing, type: e.target.value as "fm" | "web" })}
                className="w-full h-11 px-4 rounded-xl bg-elevated border border-border text-sm text-text focus:outline-none focus:border-amber/50 transition-all"
              >
                <option value="fm">FM</option>
                <option value="web">Web</option>
              </select>
            </div>
            <Field label="Fréquence (FM)" value={editing.frequency || ""} onChange={(v) => setEditing({ ...editing, frequency: v || null })} />
            <Field label="Genre" value={editing.genre || ""} onChange={(v) => setEditing({ ...editing, genre: v })} />
            <Field label="Tagline" value={editing.tagline || ""} onChange={(v) => setEditing({ ...editing, tagline: v })} />
            <Field label="URL flux MP3" value={editing.stream_url || ""} onChange={(v) => setEditing({ ...editing, stream_url: v })} />
            <Field label="URL flux HLS" value={editing.hls_url || ""} onChange={(v) => setEditing({ ...editing, hls_url: v || null })} />
            <ImageUpload value={editing.cover_url || ""} onChange={(v) => setEditing({ ...editing, cover_url: v || null })} folder="radio" />
            <Field label="Couleur (hex)" value={editing.color || ""} onChange={(v) => setEditing({ ...editing, color: v })} />
            <Field label="Ordre" value={String(editing.sort_order || 0)} onChange={(v) => setEditing({ ...editing, sort_order: Number(v) })} />
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
              <th className="px-4 py-3">Station</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Genre</th>
              <th className="px-4 py-3">Flux</th>
              <th className="px-4 py-3">Actif</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stations.map((s) => (
              <tr key={s.id} className="border-b border-border/50 hover:bg-elevated transition-colors">
                <td className="px-4 py-3 font-medium">{s.name}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-elevated">
                    {s.type === "fm" ? `FM ${s.frequency || ""}` : "WEB"}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted">{s.genre}</td>
                <td className="px-4 py-3 text-muted text-xs truncate max-w-[200px]">{s.hls_url || s.stream_url}</td>
                <td className="px-4 py-3">
                  <span className={`w-2 h-2 rounded-full inline-block ${s.is_active ? "bg-success" : "bg-muted"}`} />
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => handleEdit(s)} className="p-1.5 rounded-lg text-muted hover:text-amber hover:bg-elevated transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(s.id)} className="p-1.5 rounded-lg text-muted hover:text-live hover:bg-elevated transition-colors ml-1">
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
