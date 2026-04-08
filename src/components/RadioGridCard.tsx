"use client";

import { Play, Pause, Radio, Wifi } from "lucide-react";
import type { RadioStation } from "@/types";
import { usePlayer } from "@/contexts/PlayerContext";

export default function RadioGridCard({ station }: { station: RadioStation }) {
  const { playStation, currentStation, isPlaying, togglePlay } = usePlayer();
  const isActive = currentStation?.id === station.id;

  function handleClick() {
    if (isActive) {
      togglePlay();
    } else {
      playStation(station);
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`group block w-full rounded-xl p-3 transition-all duration-300 text-left ${
        isActive
          ? "bg-amber/10 border border-amber/20"
          : "bg-surface border border-transparent hover:border-border hover:bg-elevated"
      }`}
    >
      <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
        <img
          src={station.cover_url || "/placeholder.png"}
          alt={station.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          isActive ? "bg-noir/50 opacity-100" : "bg-noir/60 opacity-0 group-hover:opacity-100"
        }`}>
          <div className="w-12 h-12 rounded-full bg-amber flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
            {isActive && isPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white ml-0.5" />
            )}
          </div>
        </div>
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
        <div className="absolute top-2 right-2">
          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-live/90 text-[8px] font-bold text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-live" />
            LIVE
          </span>
        </div>
      </div>

      <h3 className={`text-sm font-semibold truncate transition-colors ${isActive ? "text-amber" : "group-hover:text-amber"}`}>
        {station.name}
      </h3>
      <p className="text-xs text-muted truncate mt-0.5">{station.genre}</p>
      <p className="text-xs text-subtle mt-1">{station.tagline}</p>
    </button>
  );
}
