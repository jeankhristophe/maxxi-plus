// ─── Types ───

export interface Podcast {
  id: string;
  title: string;
  author: string;
  cover: string;
  category: string;
  description: string;
  episodeCount: number;
  listeners: number;
}

export interface Episode {
  id: string;
  podcastId: string;
  title: string;
  description: string;
  duration: string;
  date: string;
  played: boolean;
}

export interface ScheduleItem {
  time: string;
  title: string;
  host: string;
  isLive?: boolean;
}

export interface RadioStation {
  id: string;
  name: string;
  type: "fm" | "web";
  frequency?: string;
  genre: string;
  tagline: string;
  streamUrl: string;
  cover: string;
  color: string; // accent color for the station card
  listeners: number;
  nowPlaying: {
    artist: string;
    track: string;
    album: string;
    artwork: string;
  };
}

// ─── Données Radio ───

export const radioStations: RadioStation[] = [
  // ─── 5 Radios FM ───
  {
    id: "maxxi-fm",
    name: "MAXXI FM",
    type: "fm",
    frequency: "95.8",
    genre: "Hits & Pop",
    tagline: "La radio qui vous ressemble",
    streamUrl: "https://stream.maxxi.fm/live",
    cover: "https://picsum.photos/seed/maxxifm/400/400",
    color: "#E8A849",
    listeners: 1240,
    nowPlaying: { artist: "Stromae", track: "Papaoutai", album: "Racine carrée", artwork: "https://picsum.photos/seed/stromae/400/400" },
  },
  {
    id: "maxxi-groove",
    name: "MAXXI Groove",
    type: "fm",
    frequency: "101.3",
    genre: "Funk & Soul",
    tagline: "Le groove dans les veines",
    streamUrl: "https://stream.maxxi.fm/groove",
    cover: "https://picsum.photos/seed/groove/400/400",
    color: "#A855F7",
    listeners: 870,
    nowPlaying: { artist: "Daft Punk", track: "Get Lucky", album: "Random Access Memories", artwork: "https://picsum.photos/seed/daftpunk/400/400" },
  },
  {
    id: "maxxi-urban",
    name: "MAXXI Urban",
    type: "fm",
    frequency: "88.6",
    genre: "Rap & RnB",
    tagline: "L'énergie urbaine",
    streamUrl: "https://stream.maxxi.fm/urban",
    cover: "https://picsum.photos/seed/urban/400/400",
    color: "#EF4444",
    listeners: 1580,
    nowPlaying: { artist: "Ninho", track: "Jefe", album: "Jefe", artwork: "https://picsum.photos/seed/ninho/400/400" },
  },
  {
    id: "maxxi-classique",
    name: "MAXXI Classique",
    type: "fm",
    frequency: "92.1",
    genre: "Classique & Jazz",
    tagline: "L'élégance musicale",
    streamUrl: "https://stream.maxxi.fm/classique",
    cover: "https://picsum.photos/seed/classique/400/400",
    color: "#F59E0B",
    listeners: 420,
    nowPlaying: { artist: "Debussy", track: "Clair de Lune", album: "Suite bergamasque", artwork: "https://picsum.photos/seed/debussy/400/400" },
  },
  {
    id: "maxxi-zen",
    name: "MAXXI Zen",
    type: "fm",
    frequency: "104.7",
    genre: "Chill & Ambient",
    tagline: "Votre bulle de sérénité",
    streamUrl: "https://stream.maxxi.fm/zen",
    cover: "https://picsum.photos/seed/zen/400/400",
    color: "#22C55E",
    listeners: 650,
    nowPlaying: { artist: "Tycho", track: "Awake", album: "Awake", artwork: "https://picsum.photos/seed/tycho/400/400" },
  },
  // ─── 5 Radios Web ───
  {
    id: "maxxi-electro",
    name: "MAXXI Electro",
    type: "web",
    genre: "Électro & House",
    tagline: "Les beats qui font vibrer",
    streamUrl: "https://stream.maxxi.fm/electro",
    cover: "https://picsum.photos/seed/electro/400/400",
    color: "#06B6D4",
    listeners: 2100,
    nowPlaying: { artist: "Kavinsky", track: "Nightcall", album: "OutRun", artwork: "https://picsum.photos/seed/kavinsky/400/400" },
  },
  {
    id: "maxxi-tropical",
    name: "MAXXI Tropical",
    type: "web",
    genre: "Afrobeats & Dancehall",
    tagline: "Les sons du soleil",
    streamUrl: "https://stream.maxxi.fm/tropical",
    cover: "https://picsum.photos/seed/tropical/400/400",
    color: "#F97316",
    listeners: 930,
    nowPlaying: { artist: "Burna Boy", track: "Last Last", album: "Love, Damini", artwork: "https://picsum.photos/seed/burnaboy/400/400" },
  },
  {
    id: "maxxi-rock",
    name: "MAXXI Rock",
    type: "web",
    genre: "Rock & Indie",
    tagline: "Le rock sans compromis",
    streamUrl: "https://stream.maxxi.fm/rock",
    cover: "https://picsum.photos/seed/rock/400/400",
    color: "#DC2626",
    listeners: 780,
    nowPlaying: { artist: "Arctic Monkeys", track: "Do I Wanna Know?", album: "AM", artwork: "https://picsum.photos/seed/arcticmonkeys/400/400" },
  },
  {
    id: "maxxi-lofi",
    name: "MAXXI Lo-Fi",
    type: "web",
    genre: "Lo-Fi & Beats",
    tagline: "Focus & détente",
    streamUrl: "https://stream.maxxi.fm/lofi",
    cover: "https://picsum.photos/seed/lofi/400/400",
    color: "#8B5CF6",
    listeners: 3200,
    nowPlaying: { artist: "Jinsang", track: "Summer's Day", album: "Life", artwork: "https://picsum.photos/seed/jinsang/400/400" },
  },
  {
    id: "maxxi-francophone",
    name: "MAXXI Franco",
    type: "web",
    genre: "Chanson française",
    tagline: "La chanson française d'hier et d'aujourd'hui",
    streamUrl: "https://stream.maxxi.fm/franco",
    cover: "https://picsum.photos/seed/franco/400/400",
    color: "#3B82F6",
    listeners: 1100,
    nowPlaying: { artist: "Edith Piaf", track: "La Vie en rose", album: "Compilation", artwork: "https://picsum.photos/seed/piaf/400/400" },
  },
];

// Station principale (première FM) pour le player
export const radioStation = radioStations[0];

export const fmStations = radioStations.filter((s) => s.type === "fm");
export const webStations = radioStations.filter((s) => s.type === "web");

export const schedule: ScheduleItem[] = [
  { time: "06:00", title: "Le Morning MAXXI", host: "DJ Karim & Sophie", isLive: true },
  { time: "10:00", title: "MAXXI Hits", host: "Automated" },
  { time: "12:00", title: "Pause Midi", host: "Léa Martin" },
  { time: "14:00", title: "L'After MAXXI", host: "Thomas B." },
  { time: "17:00", title: "Drive Time", host: "Amina K." },
  { time: "19:00", title: "Soirée Groove", host: "DJ NightOwl" },
  { time: "22:00", title: "Nuit MAXXI", host: "Automated" },
];

// ─── Catégories Podcast ───

export const categories = [
  "Tous",
  "Culture",
  "Actualité",
  "Comédie",
  "Technologie",
  "Histoire",
  "Sport",
  "Musique",
  "Société",
  "Science",
  "Business",
  "Éducation",
  "Politique",
  "Santé",
] as const;

// ─── Podcasts Mock ───

export const podcasts: Podcast[] = [
  {
    id: "1",
    title: "Les Couilles sur la Table",
    author: "Binge Audio",
    cover: "https://picsum.photos/seed/podcast1/400/400",
    category: "Société",
    description: "Un podcast qui questionne la masculinité et ses effets sur nos vies.",
    episodeCount: 142,
    listeners: 85400,
  },
  {
    id: "2",
    title: "Transfert",
    author: "Slate.fr",
    cover: "https://picsum.photos/seed/podcast2/400/400",
    category: "Culture",
    description: "Des histoires vraies racontées par ceux qui les ont vécues.",
    episodeCount: 210,
    listeners: 124000,
  },
  {
    id: "3",
    title: "Floodcast",
    author: "FloodCorp",
    cover: "https://picsum.photos/seed/podcast3/400/400",
    category: "Comédie",
    description: "Le podcast qui part dans tous les sens, pour le meilleur et pour le pire.",
    episodeCount: 320,
    listeners: 67800,
  },
  {
    id: "4",
    title: "Le Code a changé",
    author: "France Inter",
    cover: "https://picsum.photos/seed/podcast4/400/400",
    category: "Technologie",
    description: "Comment le numérique transforme notre quotidien.",
    episodeCount: 45,
    listeners: 95200,
  },
  {
    id: "5",
    title: "Affaires Sensibles",
    author: "France Inter",
    cover: "https://picsum.photos/seed/podcast5/400/400",
    category: "Histoire",
    description: "Plongée dans les grandes affaires qui ont marqué l'Histoire.",
    episodeCount: 560,
    listeners: 203000,
  },
  {
    id: "6",
    title: "2 Heures de Perdues",
    author: "2HDP",
    cover: "https://picsum.photos/seed/podcast6/400/400",
    category: "Comédie",
    description: "On regarde des films pour que vous n'ayez pas à le faire.",
    episodeCount: 400,
    listeners: 78500,
  },
  {
    id: "7",
    title: "La Poudre",
    author: "Nouvelles Écoutes",
    cover: "https://picsum.photos/seed/podcast7/400/400",
    category: "Société",
    description: "Conversations intimes avec des femmes inspirantes.",
    episodeCount: 130,
    listeners: 112000,
  },
  {
    id: "8",
    title: "Underscore_",
    author: "Micode",
    cover: "https://picsum.photos/seed/podcast8/400/400",
    category: "Technologie",
    description: "Les histoires méconnues de la tech et du numérique.",
    episodeCount: 35,
    listeners: 156000,
  },
  {
    id: "9",
    title: "Les Odyssées",
    author: "France Inter",
    cover: "https://picsum.photos/seed/podcast9/400/400",
    category: "Éducation",
    description: "Les grandes aventures de l'Histoire racontées aux enfants.",
    episodeCount: 90,
    listeners: 189000,
  },
  {
    id: "10",
    title: "Thune",
    author: "Binge Audio",
    cover: "https://picsum.photos/seed/podcast10/400/400",
    category: "Business",
    description: "Parlons argent sans tabou.",
    episodeCount: 60,
    listeners: 45000,
  },
  {
    id: "11",
    title: "Programme B",
    author: "Binge Audio",
    cover: "https://picsum.photos/seed/podcast11/400/400",
    category: "Actualité",
    description: "L'actualité décryptée autrement, chaque jour.",
    episodeCount: 450,
    listeners: 92000,
  },
  {
    id: "12",
    title: "Sur les Épaules de Darwin",
    author: "France Inter",
    cover: "https://picsum.photos/seed/podcast12/400/400",
    category: "Science",
    description: "Un voyage entre science, nature et humanité.",
    episodeCount: 380,
    listeners: 167000,
  },
];

// ─── Épisodes Mock ───

export const episodes: Episode[] = [
  {
    id: "ep1",
    podcastId: "1",
    title: "Comment éduque-t-on les garçons ?",
    description: "Dans cet épisode, on explore les méthodes d'éducation genrées et leurs conséquences.",
    duration: "58:32",
    date: "2026-04-01",
    played: false,
  },
  {
    id: "ep2",
    podcastId: "1",
    title: "Le sport, dernier bastion viril ?",
    description: "Le sport reste l'un des espaces les plus genrés de notre société.",
    duration: "52:14",
    date: "2026-03-25",
    played: true,
  },
  {
    id: "ep3",
    podcastId: "1",
    title: "Paternité : les nouveaux pères",
    description: "Que signifie être père aujourd'hui ? Témoignages et analyses.",
    duration: "47:05",
    date: "2026-03-18",
    played: false,
  },
  {
    id: "ep4",
    podcastId: "2",
    title: "La nuit où tout a basculé",
    description: "Marie raconte cette nuit qui a changé le cours de sa vie.",
    duration: "32:18",
    date: "2026-04-03",
    played: false,
  },
  {
    id: "ep5",
    podcastId: "2",
    title: "Le secret de mon grand-père",
    description: "Un secret de famille révélé 40 ans plus tard.",
    duration: "28:45",
    date: "2026-03-27",
    played: false,
  },
  {
    id: "ep6",
    podcastId: "4",
    title: "L'IA générative va-t-elle tout changer ?",
    description: "Décryptage de la révolution de l'intelligence artificielle.",
    duration: "42:10",
    date: "2026-04-05",
    played: false,
  },
  {
    id: "ep7",
    podcastId: "8",
    title: "Le plus grand hack de l'histoire",
    description: "Retour sur l'attaque qui a paralysé des milliers d'entreprises.",
    duration: "35:22",
    date: "2026-04-02",
    played: false,
  },
];

// ─── Helpers ───

export function getPodcast(id: string): Podcast | undefined {
  return podcasts.find((p) => p.id === id);
}

export function getPodcastEpisodes(podcastId: string): Episode[] {
  return episodes.filter((e) => e.podcastId === podcastId);
}

export function formatListeners(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(0)}k`;
  return count.toString();
}
