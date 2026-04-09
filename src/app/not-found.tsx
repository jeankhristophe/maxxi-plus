import Link from "next/link";
import { Home, Radio } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
      <div className="w-20 h-20 rounded-2xl bg-amber/15 flex items-center justify-center mb-6">
        <Radio className="w-10 h-10 text-amber" />
      </div>
      <h2 className="font-display text-3xl font-bold mb-2">404</h2>
      <p className="text-lg text-text-secondary mb-6">Cette page n&apos;existe pas.</p>
      <Link
        href="/"
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber text-white font-semibold text-sm hover:bg-amber-hover transition-colors"
      >
        <Home className="w-4 h-4" />
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
