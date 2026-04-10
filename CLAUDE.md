# MAXXI+ — Radio & Podcasts

## Projet

Application web grand public combinant :
1. **Radio live** (4 stations antillaises : Chérie FM GP/MQ, Maxxi GP/MQ) — streaming HLS/MP3
2. **Annuaire podcasts francophones** (86+ podcasts, 30k+ épisodes) — directory public

**URL** : https://maxxi-plus.vercel.app
**Admin** : /admin/login

## Stack technique

- **Framework** : Next.js 16 (App Router)
- **Langage** : TypeScript strict
- **Styles** : Tailwind CSS v4 (config en CSS via `@theme inline`, pas de `tailwind.config.ts`)
- **Backend** : Supabase (Postgres + Auth + Storage)
- **Streaming** : hls.js pour les flux HLS, HTML5 Audio pour MP3
- **Déploiement** : Vercel (deploy via `npx vercel --prod`)
- **Icônes** : lucide-react
- **Fonts** : Bricolage Grotesque (display) + Figtree (body) via next/font/google

## Architecture

```
src/
├── app/
│   ├── layout.tsx              # Layout racine (sidebar + GlobalSearch + player)
│   ├── page.tsx                # Accueil (radios + tendances Apple + podcasts)
│   ├── radio/page.tsx          # Grille radios avec filtres FM/Web
│   ├── podcasts/page.tsx       # Annuaire : vue dense/grid/list, tri, catégories
│   ├── podcast/[id]/page.tsx   # Détail podcast + épisodes paginés
│   ├── new-releases/page.tsx   # Épisodes des 48 dernières heures
│   ├── in-progress/page.tsx    # Épisodes en cours (progression localStorage)
│   ├── search/page.tsx         # Recherche globale radios + podcasts
│   ├── favorites/page.tsx      # Favoris (placeholder)
│   ├── history/page.tsx        # Historique (placeholder)
│   ├── settings/page.tsx       # Paramètres + toggle thème
│   ├── admin/                  # Panel admin (login, CRUD radios/podcasts/épisodes)
│   └── api/
│       ├── cron/sync-episodes/ # Cron quotidien : sync RSS → nouveaux épisodes
│       └── admin/              # API routes admin (import, delete) avec service role
├── components/
│   ├── Sidebar.tsx             # Desktop sidebar + mobile bottom nav
│   ├── Player.tsx              # Player PocketCasts (vitesse, skip, queue, bookmark)
│   ├── GlobalSearch.tsx        # Barre de recherche sur toutes les pages
│   ├── PodcastCard.tsx         # Card podcast (cover + titre + auteur + épisodes)
│   ├── RadioCard.tsx           # Card radio liste
│   ├── RadioGridCard.tsx       # Card radio grille
│   ├── EpisodeRow.tsx          # Ligne épisode avec play/pause
│   ├── PlayLatestButton.tsx    # Bouton "Dernier épisode" (client component)
│   ├── LoadMoreEpisodes.tsx    # Pagination "Charger plus" pour les épisodes
│   ├── CategoryPills.tsx       # Filtres catégories (depuis Supabase)
│   ├── SearchBar.tsx           # Input de recherche
│   ├── Skeleton.tsx            # Skeleton loaders (grid, list, pills)
│   ├── ThemeToggle.tsx         # Toggle dark/light (desktop + mobile compact)
│   └── admin/ImageUpload.tsx   # Upload images vers Supabase Storage
├── contexts/
│   └── PlayerContext.tsx       # État player partagé (radio/podcast, queue, vitesse, persistence)
├── lib/supabase/
│   ├── server.ts               # Client Supabase pour Server Components
│   └── client.ts               # Client Supabase pour Client Components
├── types/
│   └── index.ts                # Types (RadioStation, Podcast, Episode) + helpers
└── middleware.ts                # Refresh session Supabase
```

## Design System

- **Thème** : Dark/Light avec toggle, accent violet (#8B5CF6)
- **Variables CSS dynamiques** : `:root` (dark) + `html:not(.dark)` (light), mappées via `@theme inline`
- **Animations** : slide-up, equalizer bars, skeleton pulse
- **Effets** : glass morphism, noise texture overlay

## Conventions

- Composants client marqués `"use client"` uniquement quand nécessaire
- Pages Server Components par défaut (accueil, détail podcast)
- Pages Client Components pour les filtres interactifs (podcasts, radio)
- Routes dynamiques avec `params: Promise<>` (Next.js 16)
- Opérations admin via API routes avec `SUPABASE_SERVICE_ROLE_KEY` (bypass RLS)
- Cron quotidien à 6h UTC pour sync épisodes RSS

## Commandes

```bash
npm run dev              # Dev server
npm run build            # Build production
npx vercel --prod        # Deploy sur Vercel
```

## Supabase

- **Tables** : radio_stations, podcasts, episodes, categories, favorites
- **Vue** : podcasts_with_latest (JOIN episodes pour tri par dernière publication)
- **RLS** : lecture publique, écriture admin (policy basée sur email)
- **Storage** : bucket 'covers' (public, upload authentifié)
- **Cron** : /api/cron/sync-episodes (protégé par CRON_SECRET)

@AGENTS.md
