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
  ListMusic,
  Bookmark,
} from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";
import { formatDuration } from "@/types";

export default function Player() {
  const {
    mode,
    isPlaying,
    volume,
    isMuted,
    speed,
    currentStation,
    currentEpisode,
    currentPodcast,
    currentTime,
    duration,
    queue,
    togglePlay,
    setVolume,
    toggleMute,
    seek,
    stop,
    cycleSpeed,
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
    <footer className={`fixed left-0 right-0 glass border-t border-border z-40 bottom-[var(--nav-height)] md:bottom-0`}>
      {/* ─── Mobile Player ─── */}
      <div className="md:hidden">
        {isPodcast && (
          <div
            className="h-0.5 bg-elevated cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              seek((e.clientX - rect.left) / rect.width * duration);
            }}
          >
            <div className="h-full bg-amber transition-all" style={{ width: `${progress}%` }} />
          </div>
        )}
        <div className="flex items-center gap-3 px-4 py-2.5">
          {!isIdle ? (
            <>
              <div className="relative shrink-0">
                <img src={artwork || "/placeholder.png"} alt={title} className="w-10 h-10 rounded-lg object-cover" />
                {isRadio && <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-live animate-pulse-live" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{title}</p>
                <p className="text-[11px] text-muted truncate">{subtitle}</p>
              </div>
              {isRadio && isPlaying && (
                <div className="flex items-end gap-[2px] h-3 shrink-0">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="w-[2px] rounded-full bg-amber" style={{ animation: `eq-bar ${0.5 + Math.random() * 0.4}s ease-in-out ${i * 0.08}s infinite`, height: "3px" }} />
                  ))}
                </div>
              )}
              <button onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Lecture"} className="w-9 h-9 rounded-full bg-amber text-white flex items-center justify-center shrink-0">
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
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

      {/* ─── Desktop Player (PocketCasts style) ─── */}
      <div className="hidden md:flex items-center h-[var(--player-height)] px-4 gap-3">
        {/* Artwork */}
        <div className="shrink-0">
          {!isIdle ? (
            <div className="relative">
              <img src={artwork || "/placeholder.png"} alt={title} className="w-14 h-14 rounded-lg object-cover shadow-lg" />
              {isRadio && (
                <div className="absolute -top-1 -right-1 flex items-center gap-1 bg-live px-1.5 py-0.5 rounded-full">
                  <Radio className="w-2.5 h-2.5 text-white" />
                  <span className="text-[8px] font-bold text-white">LIVE</span>
                </div>
              )}
            </div>
          ) : (
            <div className="w-14 h-14 rounded-lg bg-elevated flex items-center justify-center">
              <Radio className="w-5 h-5 text-muted" />
            </div>
          )}
        </div>

        {/* Skip back */}
        {isPodcast && (
          <button onClick={() => seek(Math.max(0, currentTime - 10))} aria-label="Reculer 10 secondes" className="relative text-muted hover:text-text transition-colors">
            <SkipBack className="w-5 h-5" />
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[8px] font-bold">10</span>
          </button>
        )}

        {/* Play/Pause */}
        <button
          onClick={togglePlay}
          disabled={isIdle}
          aria-label={isPlaying ? "Pause" : "Lecture"}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform shrink-0 ${
            isIdle ? "bg-elevated text-muted cursor-not-allowed" : "bg-amber text-white hover:scale-105 active:scale-95"
          }`}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </button>

        {/* Skip forward */}
        {isPodcast && (
          <button onClick={() => seek(Math.min(duration, currentTime + 45))} aria-label="Avancer 45 secondes" className="relative text-muted hover:text-text transition-colors">
            <SkipForward className="w-5 h-5" />
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[8px] font-bold">45</span>
          </button>
        )}

        {/* Title + Progress */}
        <div className="flex-1 min-w-0 mx-2">
          {!isIdle ? (
            <>
              <p className="text-sm font-semibold truncate">{title}</p>
              <p className="text-[11px] text-muted truncate">{subtitle}{isPodcast && currentEpisode?.published_at && ` — ${new Date(currentEpisode.published_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}`}</p>
            </>
          ) : (
            <p className="text-sm text-muted">Sélectionnez une radio ou un épisode</p>
          )}

          {/* Progress bar */}
          {isPodcast ? (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] text-muted tabular-nums w-9 text-right">{formatDuration(Math.floor(currentTime))}</span>
              <div
                className="flex-1 h-1 bg-elevated rounded-full group cursor-pointer relative"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  seek((e.clientX - rect.left) / rect.width * duration);
                }}
              >
                <div className="h-full bg-amber rounded-full relative transition-all" style={{ width: `${progress}%` }}>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" />
                </div>
              </div>
              <span className="text-[10px] text-muted tabular-nums w-9">-{formatDuration(Math.floor(duration - currentTime))}</span>
            </div>
          ) : isRadio && isPlaying ? (
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-end gap-[2px] h-3">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-[2px] rounded-full bg-amber" style={{ animation: `eq-bar ${0.5 + Math.random() * 0.4}s ease-in-out ${i * 0.08}s infinite`, height: "3px" }} />
                ))}
              </div>
              <span className="text-[10px] text-amber font-medium">En direct</span>
            </div>
          ) : null}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Bookmark */}
          {isPodcast && (
            <button aria-label="Marquer" className="text-muted hover:text-text transition-colors p-1.5">
              <Bookmark className="w-4 h-4" />
            </button>
          )}

          {/* Speed */}
          {isPodcast && (
            <button onClick={cycleSpeed} className="text-xs font-bold text-muted hover:text-amber transition-colors px-1.5 py-1 rounded bg-elevated min-w-[36px]">
              {speed}x
            </button>
          )}

          {/* Volume */}
          <button onClick={toggleMute} aria-label={isMuted ? "Activer le son" : "Couper le son"} className="text-muted hover:text-text transition-colors">
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <label className="sr-only" htmlFor="volume-slider">Volume</label>
          <input
            id="volume-slider"
            type="range" min="0" max="100"
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            aria-label="Volume"
            className="w-20 h-1 bg-elevated rounded-full appearance-none cursor-pointer accent-amber [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber"
          />

          {/* Queue */}
          {queue.length > 0 && (
            <div className="relative">
              <ListMusic className="w-4 h-4 text-muted" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber text-[8px] text-white font-bold flex items-center justify-center">
                {queue.length}
              </span>
            </div>
          )}

          {/* Stop */}
          {!isIdle && (
            <button onClick={stop} aria-label="Arrêter" className="text-muted hover:text-text transition-colors p-1">
              <Square className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
