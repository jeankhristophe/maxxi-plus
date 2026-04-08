import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Player from "@/components/Player";
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
    "Votre radio privée et annuaire de podcasts francophones. Écoutez en direct, découvrez de nouveaux podcasts.",
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
        <Sidebar />
        <main className="ml-[var(--sidebar-width)] pb-[var(--player-height)] min-h-screen">
          {children}
        </main>
        <Player />
      </body>
    </html>
  );
}
