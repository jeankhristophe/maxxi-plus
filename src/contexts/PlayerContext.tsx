"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import Hls from "hls.js";
import type { RadioStation, Episode, Podcast } from "@/types";

// ─── Types ───

type PlayerMode = "idle" | "radio" | "podcast";

interface PlayerState {
  mode: PlayerMode;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  // Radio
  currentStation: RadioStation | null;
  // Podcast
  currentEpisode: Episode | null;
  currentPodcast: Podcast | null;
  // Progress (podcast only)
  currentTime: number;
  duration: number;
}

interface PlayerActions {
  playStation: (station: RadioStation) => void;
  playEpisode: (episode: Episode, podcast: Podcast) => void;
  togglePlay: () => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
  seek: (time: number) => void;
  stop: () => void;
}

type PlayerContextValue = PlayerState & PlayerActions;

// ─── Context ───

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}

// ─── Provider ───

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  // Load a source into the audio element, handling HLS if needed
  function loadSource(url: string) {
    const audio = audioRef.current;
    if (!audio) return;

    // Destroy previous HLS instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    const isHls = url.endsWith(".m3u8") || url.includes("/hls/");

    if (isHls && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(audio);
      hlsRef.current = hls;
    } else {
      // Native support (Safari for HLS, or regular MP3/stream)
      audio.src = url;
    }
  }

  const [mode, setMode] = useState<PlayerMode>("idle");
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [currentStation, setCurrentStation] = useState<RadioStation | null>(null);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [currentPodcast, setCurrentPodcast] = useState<Podcast | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Sync volume to audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const playStation = useCallback((station: RadioStation) => {
    const audio = audioRef.current;
    if (!audio) return;

    setMode("radio");
    setCurrentStation(station);
    setCurrentEpisode(null);
    setCurrentPodcast(null);
    setCurrentTime(0);
    setDuration(0);

    // Always use HLS when available (better CORS support)
    loadSource(station.hls_url || station.stream_url);
    audio.play().then(() => setIsPlaying(true)).catch(() => {});
  }, []);

  const playEpisode = useCallback((episode: Episode, podcast: Podcast) => {
    const audio = audioRef.current;
    if (!audio) return;

    setMode("podcast");
    setCurrentEpisode(episode);
    setCurrentPodcast(podcast);
    setCurrentStation(null);
    setCurrentTime(0);
    setDuration(0);

    loadSource(episode.audio_url);
    audio.play().then(() => setIsPlaying(true)).catch(() => {});
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || mode === "idle") return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [isPlaying, mode]);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (isMuted && v > 0) setIsMuted(false);
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted((m) => !m);
  }, []);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio || mode !== "podcast") return;
    audio.currentTime = time;
    setCurrentTime(time);
  }, [mode]);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    audio.pause();
    audio.src = "";
    setIsPlaying(false);
    setMode("idle");
    setCurrentStation(null);
    setCurrentEpisode(null);
    setCurrentPodcast(null);
    setCurrentTime(0);
    setDuration(0);
  }, []);

  // Audio event handlers
  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current && isFinite(audioRef.current.duration)) {
      setDuration(audioRef.current.duration);
    }
  }, []);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleError = useCallback(() => {
    // Stream errors are common for radio, don't crash
    setIsPlaying(false);
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        mode,
        isPlaying,
        volume,
        isMuted,
        currentStation,
        currentEpisode,
        currentPodcast,
        currentTime,
        duration,
        playStation,
        playEpisode,
        togglePlay,
        setVolume,
        toggleMute,
        seek,
        stop,
      }}
    >
      {children}
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onError={handleError}
        preload="none"
      />
    </PlayerContext.Provider>
  );
}
