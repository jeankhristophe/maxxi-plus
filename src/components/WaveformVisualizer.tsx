"use client";

const BARS = 40;

export default function WaveformVisualizer() {
  return (
    <div className="flex items-center justify-center gap-[2px] h-16">
      {Array.from({ length: BARS }).map((_, i) => {
        const delay = (i * 0.08) % 1.2;
        const maxHeight = Math.sin((i / BARS) * Math.PI) * 100;
        return (
          <div
            key={i}
            className="w-[3px] rounded-full bg-amber/70"
            style={{
              animation: `waveform ${0.6 + Math.random() * 0.4}s ease-in-out ${delay}s infinite`,
              height: `${Math.max(8, maxHeight * 0.6)}%`,
              transformOrigin: "bottom",
            }}
          />
        );
      })}
    </div>
  );
}
