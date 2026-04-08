"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Wifi } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/admin");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-10 h-10 rounded-xl bg-amber flex items-center justify-center">
            <Wifi className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-display text-2xl font-bold">
            MAXXI<span className="text-amber">+</span> Admin
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl bg-surface border border-border p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-muted mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-11 px-4 rounded-xl bg-elevated border border-border text-sm text-text focus:outline-none focus:border-amber/50 focus:ring-1 focus:ring-amber/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted mb-1.5">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-11 px-4 rounded-xl bg-elevated border border-border text-sm text-text focus:outline-none focus:border-amber/50 focus:ring-1 focus:ring-amber/20 transition-all"
            />
          </div>

          {error && (
            <p className="text-sm text-live bg-live/10 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-amber text-white font-semibold text-sm hover:bg-amber-hover transition-colors disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
