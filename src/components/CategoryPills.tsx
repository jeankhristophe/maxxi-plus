"use client";

import { useState } from "react";
import { categories } from "@/data/mock";

export default function CategoryPills({
  onSelect,
}: {
  onSelect?: (category: string) => void;
}) {
  const [active, setActive] = useState("Tous");

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => {
            setActive(cat);
            onSelect?.(cat);
          }}
          className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200
            ${
              active === cat
                ? "bg-amber text-white"
                : "bg-elevated text-text-secondary hover:text-text hover:bg-border"
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
