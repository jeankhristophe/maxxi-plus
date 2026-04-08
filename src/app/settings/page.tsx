"use client";

import { Settings } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function SettingsPage() {
  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber/15 flex items-center justify-center">
          <Settings className="w-5 h-5 text-amber" />
        </div>
        <h1 className="font-display text-2xl font-bold">Paramètres</h1>
      </div>

      <div className="max-w-lg space-y-6">
        <div className="rounded-xl bg-surface border border-border p-5">
          <h2 className="text-sm font-semibold mb-3">Apparence</h2>
          <ThemeToggle />
        </div>

        <div className="rounded-xl bg-surface border border-border p-5">
          <h2 className="text-sm font-semibold mb-3">A propos</h2>
          <p className="text-sm text-muted">MAXXI+ v1.0</p>
          <p className="text-xs text-subtle mt-1">Radio & Podcasts francophones</p>
        </div>
      </div>
    </div>
  );
}
