import type { Card } from "./entities/GuessData";
import seedrandom from 'seedrandom';


export function getIconPath(artwork: string): string {
  // Remove existing extension if any
  const base_name = artwork.replace(/\.[^/.]+$/, "");
  return `images/icons/${base_name}.webp`;
}

export function getRandomCard(allCards: Card[], seed: string | null) {
  if (seed === null) {
    return allCards[Math.floor(Math.random() * allCards.length)]
  }
  const rng = seedrandom(seed);
  return allCards[Math.floor(rng() * allCards.length)]
}

function hashStringToNumber(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0; // simple hash
  }
  return hash;
}
