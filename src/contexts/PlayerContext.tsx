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

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2] as const;
type Speed = (typeof SPEEDS)[number];

interface QueueItem {
  episode: Episode;
  podcast: Podcast;
}

interface PlayerState {
  mode: PlayerMode;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  speed: Speed;
  currentStation: RadioStation | null;
  currentEpisode: Episode | null;
  currentPodcast: Podcast | null;
  currentTime: number;
  duration: number;
  queue: QueueItem[];
}

interface PlayerActions {
  playStation: (station: RadioStation) => void;
  playEpisode: (episode: Episode, podcast: Podcast) => void;
  togglePlay: () => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
  seek: (time: number) => void;
  stop: () => void;
  cycleSpeed: () => void;
  addToQueue: (episode: Episode, podcast: Podcast) => void;
  removeFromQueue: (index: number) => void;
  playNext: () => void;
}

type PlayerContextValue = PlayerState & PlayerActions;

// ─── Progress persistence ───

function saveProgress(episodeId: string, time: number, dur: number) {
  try {
    const data = JSON.parse(localStorage.getItem("maxxi_progress") || "{}");
    data[episodeId] = { time, duration: dur, updatedAt: Date.now() };
    localStorage.setItem("maxxi_progress", JSON.stringify(data));
  } catch {}
}

export function getProgress(episodeId: string): { time: number; duration: number } | null {
  try {
    const data = JSON.parse(localStorage.getItem("maxxi_progress") || "{}");
    return data[episodeId] || null;
  } catch {
    return null;
  }
}

export function getAllProgress(): Record<string, { time: number; duration: number; updatedAt: number }> {
  try {
    return JSON.parse(localStorage.getItem("maxxi_progress") || "{}");
  } catch {
    return {};
  }
}

// ─── Context ───

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}

export { SPEEDS };

// ─── Provider ───

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  function loadSource(url: string) {
    const audio = audioRef.current;
    if (!audio) return;

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
      audio.src = url;
    }
  }

  const [mode, setMode] = useState<PlayerMode>("idle");
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [speed, setSpeed] = useState<Speed>(1);
  const [currentStation, setCurrentStation] = useState<RadioStation | null>(null);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [currentPodcast, setCurrentPodcast] = useState<Podcast | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [queue, setQueue] = useState<QueueItem[]>([]);

  // Sync volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  // Sync speed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  }, [speed]);

  const playStation = useCallback((station: RadioStation) => {
    const audio = audioRef.current;
    if (!audio) return;

    setMode("radio");
    setCurrentStation(station);
    setCurrentEpisode(null);
    setCurrentPodcast(null);
    setCurrentTime(0);
    setDuration(0);

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

    // Resume from saved progress
    const saved = getProgress(episode.id);
    if (saved && saved.time > 10) {
      audio.currentTime = saved.time;
      setCurrentTime(saved.time);
    }

    audio.playbackRate = speed;
    audio.play().then(() => setIsPlaying(true)).catch(() => {});
  }, [speed]);

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

  const cycleSpeed = useCallback(() => {
    setSpeed((prev) => {
      const idx = SPEEDS.indexOf(prev);
      return SPEEDS[(idx + 1) % SPEEDS.length];
    });
  }, []);

  const addToQueue = useCallback((episode: Episode, podcast: Podcast) => {
    setQueue((q) => [...q, { episode, podcast }]);
  }, []);

  const removeFromQueue = useCallback((index: number) => {
    setQueue((q) => q.filter((_, i) => i !== index));
  }, []);

  const playNext = useCallback(() => {
    if (queue.length === 0) {
      stop();
      return;
    }
    const next = queue[0];
    setQueue((q) => q.slice(1));
    playEpisode(next.episode, next.podcast);
  }, [queue]);

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

  // Save progress periodically
  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      const t = audioRef.current.currentTime;
      setCurrentTime(t);

      // Save progress every 5 seconds for podcast mode
      if (currentEpisode && Math.floor(t) % 5 === 0) {
        saveProgress(currentEpisode.id, t, audioRef.current.duration || 0);
      }
    }
  }, [currentEpisode]);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current && isFinite(audioRef.current.duration)) {
      setDuration(audioRef.current.duration);
    }
  }, []);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    // Auto-play next in queue
    if (queue.length > 0) {
      const next = queue[0];
      setQueue((q) => q.slice(1));
      // Small delay before playing next
      setTimeout(() => {
        playEpisode(next.episode, next.podcast);
      }, 500);
    }
  }, [queue]);

  const handleError = useCallback(() => {
    setIsPlaying(false);
  }, []);

  return (
    <PlayerContext.Provider
      value={{
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
        playStation,
        playEpisode,
        togglePlay,
        setVolume,
        toggleMute,
        seek,
        stop,
        cycleSpeed,
        addToQueue,
        removeFromQueue,
        playNext,
      }}
    >
      {children}
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
