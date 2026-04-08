"use client";

import { Play, Pause, Radio, Wifi } from "lucide-react";
import type { RadioStation } from "@/types";
import { usePlayer } from "@/contexts/PlayerContext";

export default function RadioCard({ station }: { station: RadioStation }) {
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
      className={`group flex items-center gap-3 w-full p-3 rounded-xl transition-colors text-left ${
        isActive ? "bg-amber/10 border border-amber/20" : "hover:bg-elevated border border-transparent"
      }`}
    >
      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
        <img
          src={station.cover_url || "/placeholder.png"}
          alt={station.name}
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${
          isActive ? "bg-noir/50 opacity-100" : "bg-noir/50 opacity-0 group-hover:opacity-100"
        }`}>
          {isActive && isPlaying ? (
            <Pause className="w-4 h-4 text-white" />
          ) : (
            <Play className="w-4 h-4 text-white ml-0.5" />
          )}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold truncate transition-colors ${isActive ? "text-amber" : "group-hover:text-amber"}`}>
          {station.name}
        </p>
        <p className="text-xs text-muted truncate">{station.genre}</p>
      </div>

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

      {isActive && isPlaying ? (
        <div className="flex items-end gap-[2px] h-3 shrink-0">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-[2px] rounded-full bg-amber"
              style={{ animation: `eq-bar 0.7s ease-in-out ${i * 0.15}s infinite`, height: "3px" }}
            />
          ))}
        </div>
      ) : (
        <span className="w-2 h-2 rounded-full bg-live animate-pulse-live shrink-0" />
      )}
    </button>
  );
}
