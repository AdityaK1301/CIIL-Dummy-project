"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => {

    const [active, setActive] = useState(false)

    return (
      <div
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        onClick={() => setActive(!active)}
        className={cn(
          "rounded-lg relative bg-gray-100 overflow-hidden h-24 md:h-40 w-full transition-all duration-300 ease-out cursor-pointer",
          hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
        )}
      >
        <img
          src={card.src}
          alt={card.title}
          className="object-contain w-full h-full bg-white"
        />

        {/* Overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2 transition-opacity duration-300",
            hovered === index || active
              ? "opacity-100"
              : "opacity-0 md:group-hover:opacity-100"
          )}
        >
          <p className="text-white text-lg font-semibold">
            {card.title}
          </p>

          <button className="px-4 py-1 text-sm bg-white text-[#561C24] rounded-md font-semibold">
            View
          </button>
        </div>
      </div>
    );
  }
);

Card.displayName = "Card";

type Card = {
  title: string;
  src: string;
};

export function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-8xl mx-auto md:px-8 py-6 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
