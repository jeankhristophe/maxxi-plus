"use client";

import { Play, Radio, Wifi, Users } from "lucide-react";
import type { RadioStation } from "@/data/mock";

export default function RadioGridCard({ station }: { station: RadioStation }) {
  return (
    <button className="group block w-full rounded-xl bg-surface border border-transparent hover:border-border p-3 transition-all duration-300 hover:bg-elevated text-left">
      {/* Cover */}
      <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
        <img
          src={station.cover}
          alt={station.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-noir/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-amber flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-5 h-5 text-white ml-0.5" />
          </div>
        </div>
        {/* Type badge */}
        <div className="absolute top-2 left-2">
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-noir/70 text-white backdrop-blur-sm">
            {station.type === "fm" ? (
              <>
                <Radio className="w-2.5 h-2.5" />
                {station.frequency} FM
              </>
            ) : (
              <>
                <Wifi className="w-2.5 h-2.5" />
                WEB
              </>
            )}
          </span>
        </div>
        {/* Live */}
        <div className="absolute top-2 right-2">
          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-live/90 text-[8px] font-bold text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-live" />
            LIVE
          </span>
        </div>
      </div>

      {/* Info */}
      <h3 className="text-sm font-semibold truncate group-hover:text-amber transition-colors">
        {station.name}
      </h3>
      <p className="text-xs text-muted truncate mt-0.5">{station.genre}</p>

      {/* Now playing */}
      <div className="flex items-center gap-2 mt-2 text-[11px] text-subtle">
        <span className="truncate">
          {station.nowPlaying.artist} — {station.nowPlaying.track}
        </span>
      </div>
      <div className="flex items-center gap-1 mt-1.5 text-[10px] text-subtle">
        <Users className="w-3 h-3" />
        {station.listeners.toLocaleString("fr-FR")} auditeurs
      </div>
    </button>
  );
}
