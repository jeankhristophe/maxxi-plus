import Link from "next/link";
import { Radio, Headphones, Home, LogOut, Wifi } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Admin sidebar */}
      <aside className="w-56 bg-surface border-r border-border flex flex-col p-4 shrink-0">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-amber flex items-center justify-center">
            <Wifi className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-display text-sm font-bold leading-none">MAXXI+</p>
            <p className="text-[10px] text-muted">Administration</p>
          </div>
        </div>

        <nav className="space-y-1 flex-1">
          <Link href="/admin" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text hover:bg-elevated transition-colors">
            <Home className="w-4 h-4" />
            Dashboard
          </Link>
          <Link href="/admin/radios" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text hover:bg-elevated transition-colors">
            <Radio className="w-4 h-4" />
            Radios
          </Link>
          <Link href="/admin/podcasts" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text hover:bg-elevated transition-colors">
            <Headphones className="w-4 h-4" />
            Podcasts
          </Link>
        </nav>

        <div className="border-t border-border pt-3">
          <Link href="/" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted hover:text-text hover:bg-elevated transition-colors">
            Retour au site
          </Link>
          <form action="/admin/logout" method="POST">
            <button className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted hover:text-live hover:bg-elevated transition-colors w-full">
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </form>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
