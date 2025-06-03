import { Correctness, type Card, type CardFeatures } from "~/entities/GuessData";

export function compareCard(correctCard: CardFeatures, guessedCard: CardFeatures): Correctness[] {
  return [Correctness.Correct]
}