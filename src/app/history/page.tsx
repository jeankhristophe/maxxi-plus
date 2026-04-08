import { Clock } from "lucide-react";

export default function HistoryPage() {
  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber/15 flex items-center justify-center">
          <Clock className="w-5 h-5 text-amber" />
        </div>
        <h1 className="font-display text-2xl font-bold">Historique</h1>
      </div>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Clock className="w-16 h-16 text-muted mb-4" />
        <p className="text-lg font-semibold mb-2">Historique vide</p>
        <p className="text-sm text-muted max-w-xs">Vos écoutes récentes apparaîtront ici.</p>
      </div>
    </div>
  );
}
