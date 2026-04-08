"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Radio,
  Headphones,
  Home,
  Search,
  Heart,
  Clock,
  Settings,
  Wifi,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { href: "/", icon: Home, label: "Accueil" },
  { href: "/radio", icon: Radio, label: "Radio Live" },
  { href: "/podcasts", icon: Headphones, label: "Podcasts" },
  { href: "/search", icon: Search, label: "Rechercher" },
];

const libraryItems = [
  { href: "/favorites", icon: Heart, label: "Favoris" },
  { href: "/history", icon: Clock, label: "Historique" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-[var(--player-height)] w-[var(--sidebar-width)] bg-surface border-r border-border flex flex-col z-30">
      {/* Logo */}
      <div className="px-6 py-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber flex items-center justify-center">
          <Wifi className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-display text-lg font-bold tracking-tight leading-none">
            MAXXI<span className="text-amber">+</span>
          </h1>
          <p className="text-[10px] text-muted uppercase tracking-[0.2em]">Radio & Podcasts</p>
        </div>
      </div>

      {/* Navigation principale */}
      <nav className="px-3 mt-2">
        <p className="px-3 mb-2 text-[11px] font-medium text-muted uppercase tracking-wider">
          Menu
        </p>
        <ul className="space-y-0.5">
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-amber/10 text-amber"
                        : "text-text-secondary hover:text-text hover:bg-elevated"
                    }`}
                >
                  <Icon className="w-[18px] h-[18px]" />
                  {label}
                  {href === "/radio" && (
                    <span className="ml-auto flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-live animate-pulse-live" />
                      <span className="text-[10px] text-live font-semibold">LIVE</span>
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bibliothèque */}
      <nav className="px-3 mt-6">
        <p className="px-3 mb-2 text-[11px] font-medium text-muted uppercase tracking-wider">
          Bibliothèque
        </p>
        <ul className="space-y-0.5">
          {libraryItems.map(({ href, icon: Icon, label }) => {
            const isActive = pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-amber/10 text-amber"
                        : "text-text-secondary hover:text-text hover:bg-elevated"
                    }`}
                >
                  <Icon className="w-[18px] h-[18px]" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Theme + Settings */}
      <div className="px-3 pb-4 space-y-0.5">
        <ThemeToggle />
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted hover:text-text hover:bg-elevated transition-all duration-200"
        >
          <Settings className="w-[18px] h-[18px]" />
          Paramètres
        </Link>
      </div>
    </aside>
  );
}
