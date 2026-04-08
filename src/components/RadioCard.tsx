"use client";

import { Play, Radio, Wifi } from "lucide-react";
import type { RadioStation } from "@/data/mock";

export default function RadioCard({ station }: { station: RadioStation }) {
  return (
    <button className="group flex items-center gap-3 w-full p-3 rounded-xl hover:bg-elevated transition-colors text-left">
      {/* Cover */}
      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
        <img
          src={station.cover}
          alt={station.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-noir/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Play className="w-4 h-4 text-white ml-0.5" />
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate group-hover:text-amber transition-colors">
          {station.name}
        </p>
        <p className="text-xs text-muted truncate">{station.genre}</p>
      </div>

      {/* Badge type */}
      <span className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-elevated text-muted">
        {station.type === "fm" ? (
          <>
            <Radio className="w-2.5 h-2.5" />
            {station.frequency}
          </>
        ) : (
          <>
            <Wifi className="w-2.5 h-2.5" />
            WEB
          </>
        )}
      </span>

      {/* Live dot */}
      <span className="w-2 h-2 rounded-full bg-live animate-pulse-live shrink-0" />
    </button>
  );
}
