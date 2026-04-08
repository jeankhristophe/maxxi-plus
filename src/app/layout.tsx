import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Player from "@/components/Player";
import { PlayerProvider } from "@/contexts/PlayerContext";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MAXXI+ — Radio & Podcasts",
  description:
    "Vos radios en direct et les meilleurs podcasts francophones, réunis en un seul endroit.",
  manifest: "/manifest.json",
  themeColor: "#8B5CF6",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MAXXI+",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`dark ${bricolage.variable} ${figtree.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full noise-overlay">
        <PlayerProvider>
          <Sidebar />
          <main className="md:ml-[var(--sidebar-width)] pb-[calc(var(--player-height)+var(--nav-height))] md:pb-[var(--player-height)] min-h-screen">
            {children}
          </main>
          <Player />
        </PlayerProvider>
      </body>
    </html>
  );
}
