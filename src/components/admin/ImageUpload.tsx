"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ImageUpload({
  value,
  onChange,
  folder = "radio",
}: {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const supabase = createClient();

    const ext = file.name.split(".").pop();
    const path = `${folder}/${Date.now()}.${ext}`;

    const { error } = await supabase.storage.from("covers").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

    if (error) {
      alert(`Erreur upload: ${error.message}`);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("covers").getPublicUrl(path);
    onChange(data.publicUrl);
    setUploading(false);
  }

  return (
    <div>
      <label className="block text-xs font-medium text-muted mb-1.5">Image de couverture</label>

      {/* Preview */}
      {value && (
        <div className="relative w-24 h-24 rounded-lg overflow-hidden mb-2 group">
          <img src={value} alt="" className="w-full h-full object-cover" />
          <button
            onClick={() => onChange("")}
            className="absolute top-1 right-1 w-5 h-5 rounded-full bg-noir/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      <div className="flex gap-2">
        {/* Upload button */}
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-elevated border border-border text-sm text-text-secondary hover:text-text hover:border-amber/30 transition-all disabled:opacity-50"
        >
          {uploading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
          {uploading ? "Upload..." : "Uploader"}
        </button>

        {/* URL input */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="ou coller une URL..."
          className="flex-1 h-9 px-3 rounded-lg bg-elevated border border-border text-xs text-text focus:outline-none focus:border-amber/50 transition-all"
        />
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />
    </div>
  );
}
