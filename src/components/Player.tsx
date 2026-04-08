"use client";

import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Radio,
  Square,
} from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";
import { formatDuration } from "@/types";

export default function Player() {
  const {
    mode,
    isPlaying,
    volume,
    isMuted,
    currentStation,
    currentEpisode,
    currentPodcast,
    currentTime,
    duration,
    togglePlay,
    setVolume,
    toggleMute,
    seek,
    stop,
  } = usePlayer();

  const isIdle = mode === "idle";
  const isRadio = mode === "radio";
  const isPodcast = mode === "podcast";

  const progress = isPodcast && duration > 0 ? (currentTime / duration) * 100 : 0;

  const title = isRadio
    ? currentStation?.name ?? ""
    : currentEpisode?.title ?? "";
  const subtitle = isRadio
    ? currentStation?.genre ?? ""
    : currentPodcast?.title ?? "";
  const artwork = isRadio
    ? currentStation?.cover_url
    : currentPodcast?.cover_url;

  return (
    <footer className={`fixed left-0 right-0 glass border-t border-border z-40 ${
      /* Mobile: above bottom nav. Desktop: at bottom */
      "bottom-[var(--nav-height)] md:bottom-0"
    }`}>
      {/* ─── Mobile Player (compact) ─── */}
      <div className="md:hidden">
        {/* Progress bar on top for podcast */}
        {isPodcast && (
          <div
            className="h-0.5 bg-elevated cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = (e.clientX - rect.left) / rect.width;
              seek(pct * duration);
            }}
          >
            <div className="h-full bg-amber transition-all" style={{ width: `${progress}%` }} />
          </div>
        )}
        <div className="flex items-center gap-3 px-4 py-2.5">
          {!isIdle ? (
            <>
              <div className="relative shrink-0">
                <img
                  src={artwork || "/placeholder.png"}
                  alt={title}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                {isRadio && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-live animate-pulse-live" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{title}</p>
                <p className="text-[11px] text-muted truncate">{subtitle}</p>
              </div>
              {isRadio && isPlaying && (
                <div className="flex items-end gap-[2px] h-3 shrink-0">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-[2px] rounded-full bg-amber"
                      style={{ animation: `eq-bar ${0.5 + Math.random() * 0.4}s ease-in-out ${i * 0.08}s infinite`, height: "3px" }}
                    />
                  ))}
                </div>
              )}
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Lecture"}
                className="w-9 h-9 rounded-full bg-text flex items-center justify-center shrink-0"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-noir" />
                ) : (
                  <Play className="w-4 h-4 text-noir ml-0.5" />
                )}
              </button>
              <button onClick={stop} aria-label="Arrêter" className="text-muted p-1">
                <Square className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3 py-1 text-muted">
              <Radio className="w-5 h-5" />
              <p className="text-sm">Sélectionnez un contenu</p>
            </div>
          )}
        </div>
      </div>

      {/* ─── Desktop Player (full) ─── */}
      <div className="hidden md:flex items-center h-[var(--player-height)] px-4 gap-4">
        {/* Track Info (left) */}
        <div className="flex items-center gap-3 w-[280px] min-w-[200px]">
          {!isIdle ? (
            <>
              <div className="relative group">
                <img
                  src={artwork || "/placeholder.png"}
                  alt={title}
                  className="w-14 h-14 rounded-lg object-cover shadow-lg"
                />
                {isRadio && (
                  <div className="absolute -top-1 -right-1 flex items-center gap-1 bg-live px-1.5 py-0.5 rounded-full">
                    <Radio className="w-2.5 h-2.5 text-white" />
                    <span className="text-[8px] font-bold text-white">LIVE</span>
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">{title}</p>
                <p className="text-xs text-muted truncate">{subtitle}</p>
                {isRadio && (
                  <p className="text-[10px] text-subtle">
                    {currentStation?.frequency ? `${currentStation.frequency} FM` : "Web"}
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3 text-muted">
              <div className="w-14 h-14 rounded-lg bg-elevated flex items-center justify-center">
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium">MAXXI+</p>
                <p className="text-xs text-subtle">Sélectionnez une radio ou un épisode</p>
              </div>
            </div>
          )}
        </div>

        {/* Controls (center) */}
        <div className="flex-1 flex flex-col items-center max-w-[600px] mx-auto">
          <div className="flex items-center gap-4 mb-1">
            {isPodcast && (
              <button onClick={() => seek(Math.max(0, currentTime - 15))} aria-label="Reculer 15 secondes" className="text-muted hover:text-text transition-colors">
                <SkipBack className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={togglePlay}
              disabled={isIdle}
              aria-label={isPlaying ? "Pause" : "Lecture"}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform ${
                isIdle ? "bg-elevated text-muted cursor-not-allowed" : "bg-amber text-white hover:scale-105 active:scale-95"
              }`}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            {isPodcast && (
              <button onClick={() => seek(Math.min(duration, currentTime + 30))} aria-label="Avancer 30 secondes" className="text-muted hover:text-text transition-colors">
                <SkipForward className="w-4 h-4" />
              </button>
            )}
          </div>

          {isPodcast ? (
            <div className="w-full flex items-center gap-2">
              <span className="text-[10px] text-muted tabular-nums w-10 text-right">
                {formatDuration(Math.floor(currentTime))}
              </span>
              <div
                className="flex-1 h-1 bg-elevated rounded-full group cursor-pointer relative"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = (e.clientX - rect.left) / rect.width;
                  seek(pct * duration);
                }}
              >
                <div className="h-full bg-amber rounded-full relative transition-all" style={{ width: `${progress}%` }}>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" />
                </div>
              </div>
              <span className="text-[10px] text-muted tabular-nums w-10">
                {formatDuration(Math.floor(duration))}
              </span>
            </div>
          ) : isRadio ? (
            <div className="w-full flex items-center justify-center gap-2">
              {isPlaying && (
                <>
                  <div className="flex items-end gap-[2px] h-3">
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                      <div key={i} className="w-[2px] rounded-full bg-amber" style={{ animation: `eq-bar ${0.5 + Math.random() * 0.4}s ease-in-out ${i * 0.08}s infinite`, height: "3px" }} />
                    ))}
                  </div>
                  <span className="text-[10px] text-amber font-medium ml-2">En direct</span>
                </>
              )}
            </div>
          ) : (
            <div className="w-full h-1 bg-elevated rounded-full" />
          )}
        </div>

        {/* Volume & extras (right) */}
        <div className="flex items-center gap-3 w-[200px] justify-end">
          {!isIdle && (
            <button onClick={stop} className="text-muted hover:text-text transition-colors" title="Arrêter">
              <Square className="w-3.5 h-3.5" />
            </button>
          )}
          <div className="flex items-center gap-2">
            <button onClick={toggleMute} aria-label={isMuted ? "Activer le son" : "Couper le son"} className="text-muted hover:text-text transition-colors">
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <label className="sr-only" htmlFor="volume-slider">Volume</label>
            <input
              id="volume-slider"
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              aria-label="Volume"
              className="w-20 h-1 bg-elevated rounded-full appearance-none cursor-pointer accent-amber [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
