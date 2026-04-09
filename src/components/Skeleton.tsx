export function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="aspect-square rounded-lg bg-elevated mb-3" />
      <div className="h-3.5 bg-elevated rounded w-3/4 mb-2" />
      <div className="h-3 bg-elevated rounded w-1/2" />
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 p-3 animate-pulse">
      <div className="w-10 h-10 rounded-full bg-elevated shrink-0" />
      <div className="w-10 h-10 rounded-lg bg-elevated shrink-0" />
      <div className="flex-1">
        <div className="h-3.5 bg-elevated rounded w-3/4 mb-2" />
        <div className="h-3 bg-elevated rounded w-1/2" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 10 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonList({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </div>
  );
}

export function SkeletonPills() {
  return (
    <div className="flex gap-2 animate-pulse">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-7 w-16 rounded-full bg-elevated shrink-0" />
      ))}
    </div>
  );
}
