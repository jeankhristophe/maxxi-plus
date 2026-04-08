"use client";

import { useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Radio,
  Heart,
  Maximize2,
  ListMusic,
} from "lucide-react";
import { radioStation } from "@/data/mock";

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(75);
  const [liked, setLiked] = useState(false);
  const [progress] = useState(65); // Mock progress

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-[var(--player-height)] glass border-t border-border z-40">
      <div className="h-full flex items-center px-4 gap-4">
        {/* ─── Track Info (left) ─── */}
        <div className="flex items-center gap-3 w-[280px] min-w-[200px]">
          {/* Artwork with glow */}
          <div className="relative group">
            <div className="absolute inset-0 rounded-lg bg-amber/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <img
              src={radioStation.nowPlaying.artwork}
              alt={radioStation.nowPlaying.track}
              className="relative w-14 h-14 rounded-lg object-cover shadow-lg"
            />
            <div className="absolute -top-1 -right-1 flex items-center gap-1 bg-live px-1.5 py-0.5 rounded-full">
              <Radio className="w-2.5 h-2.5 text-white" />
              <span className="text-[8px] font-bold text-white">LIVE</span>
            </div>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">{radioStation.nowPlaying.track}</p>
            <p className="text-xs text-muted truncate">{radioStation.nowPlaying.artist}</p>
            <p className="text-[10px] text-subtle truncate">{radioStation.nowPlaying.album}</p>
          </div>
          <button
            onClick={() => setLiked(!liked)}
            className={`ml-1 p-1.5 rounded-full transition-colors ${
              liked ? "text-amber" : "text-muted hover:text-text"
            }`}
          >
            <Heart className="w-4 h-4" fill={liked ? "currentColor" : "none"} />
          </button>
        </div>

        {/* ─── Controls (center) ─── */}
        <div className="flex-1 flex flex-col items-center max-w-[600px] mx-auto">
          <div className="flex items-center gap-4 mb-1">
            <button className="text-muted hover:text-text transition-colors">
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-text flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white ml-0.5" />
              )}
            </button>
            <button className="text-muted hover:text-text transition-colors">
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="w-full flex items-center gap-2">
            <span className="text-[10px] text-muted tabular-nums w-8 text-right">2:34</span>
            <div className="flex-1 h-1 bg-elevated rounded-full group cursor-pointer relative">
              <div
                className="h-full bg-amber rounded-full relative transition-all"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" />
              </div>
            </div>
            <span className="text-[10px] text-muted tabular-nums w-8">3:54</span>
          </div>
        </div>

        {/* ─── Volume & extras (right) ─── */}
        <div className="flex items-center gap-3 w-[200px] justify-end">
          <button className="text-muted hover:text-text transition-colors">
            <ListMusic className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-muted hover:text-text transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(Number(e.target.value));
                if (isMuted) setIsMuted(false);
              }}
              className="w-20 h-1 bg-elevated rounded-full appearance-none cursor-pointer accent-amber [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber"
            />
          </div>
          <button className="text-muted hover:text-text transition-colors">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
