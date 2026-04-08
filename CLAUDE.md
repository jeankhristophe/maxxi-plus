# MAXXI+ — Radio & Podcasts

## Projet

Application web combinant :
1. **Radio privée** (MAXXI FM) — player live, programme, titres en cours
2. **Annuaire podcasts francophones** — directory public avec recherche, catégories, fiches détail

## Stack technique

- **Framework** : Next.js 16 (App Router)
- **Langage** : TypeScript strict
- **Styles** : Tailwind CSS v4 (config en CSS via `@theme inline`, pas de `tailwind.config.ts`)
- **Icônes** : lucide-react
- **Fonts** : Bricolage Grotesque (display) + Figtree (body) via next/font/google

## Architecture

```
src/
├── app/                    # Routes (App Router)
│   ├── layout.tsx          # Layout racine (sidebar + player persistant)
│   ├── page.tsx            # Accueil (hero radio + grilles podcasts)
│   ├── radio/page.tsx      # Player radio complet + programme
│   ├── podcasts/page.tsx   # Annuaire avec search + filtres
│   └── podcast/[id]/       # Détail podcast + épisodes
├── components/             # Composants réutilisables
│   ├── Sidebar.tsx         # Navigation latérale (Spotify-like)
│   ├── Player.tsx          # Player persistant bottom bar
│   ├── PodcastCard.tsx     # Card podcast pour les grilles
│   ├── CategoryPills.tsx   # Filtres par catégorie
│   ├── SearchBar.tsx       # Barre de recherche
│   └── WaveformVisualizer.tsx  # Visualiseur audio animé
└── data/
    └── mock.ts             # Données mock + types + helpers
```

## Design System

- **Thème** : Luxury Audio Noir — fond sombre, accents cuivre/ambre
- **Palette** : `--color-noir` (#0A0A0B), `--color-amber` (#E8A849), surfaces étagées
- **Animations** : slide-up staggeré, equalizer bars, waveform, glow pulse
- **Effets** : glass morphism, noise texture overlay, gradient backgrounds

## Conventions

- Composants client marqués `"use client"` uniquement quand nécessaire (useState, événements)
- Les pages Server Components par défaut (sauf `/podcasts` qui filtre côté client)
- Routes dynamiques avec `params: Promise<>` (Next.js 16 convention)
- CSS custom properties dans `globals.css` via `@theme inline` de Tailwind v4
- Pas de `tailwind.config.ts` — tout est dans le CSS

## Commandes

```bash
npm run dev     # Serveur de développement
npm run build   # Build production
npm run lint    # ESLint
```

## Prochaines étapes

- [ ] Intégration API streaming audio réelle (Icecast/Shoutcast)
- [ ] Backend Supabase pour les podcasts (CRUD, auth)
- [ ] Système de favoris persistant
- [ ] Player audio fonctionnel avec Web Audio API
- [ ] Responsive mobile (sidebar en drawer)
- [ ] PWA (manifest + service worker)
- [ ] Pages search et settings

@AGENTS.md
