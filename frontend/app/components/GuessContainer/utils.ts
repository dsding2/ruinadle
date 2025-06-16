import { Correctness, type Card, type CardFeatures } from "~/entities/GuessData";

// ordered by appearance in rows
export const comparisonKeys = ["Artwork", "Name", "Chapter", "Rarity", "Cost", "Attack Type", "Die Type", "Max Roll", "Min Roll", "Number of Die", "Keywords"]

const compareExact = (c: string, g: string) => (c === g ? Correctness.Correct : Correctness.Incorrect);
const compareNumber = (c: number, g: number) => (c < g ? Correctness.TooHigh : c > g ? Correctness.TooLow : Correctness.Correct)
const compareSet = (c: Set<string>, g: Set<string>) => {
  if (c.size !== g.size) {
    for (const elem of c) {
      if (g.has(elem)) {
        return Correctness.Partial;
      }
    }
    return Correctness.Incorrect;
  }

  for (const elem of c) {
    if (!g.has(elem)) return Correctness.Partial;
  }

  return Correctness.Correct;
}

// TODO: Make this not dumb using guessData.tsx::cardFeatureOrder
export function compareCard(correctCard: CardFeatures, guessedCard: CardFeatures): Correctness[] {
  let out: Correctness[] = [];

  for (let i = 0; i < comparisonKeys.length; i++) {
    switch (comparisonKeys[i]) {
      case "Artwork":
        out.push(Correctness.None);
      case "Name":
        out.push(compareExact(correctCard.name, guessedCard.name));
        break;
      case "Chapter":
        out.push(compareNumber(correctCard.chapter, guessedCard.chapter));
        break;
      case "Rarity":
        out.push(compareExact(correctCard.rarity, guessedCard.rarity));
        break;
      case "Cost":
        out.push(compareNumber(correctCard.cost, guessedCard.cost));
        break;
      case "Attack Type":
        out.push(compareExact(correctCard.attackType, guessedCard.attackType));
        break;
      case "Die Type":
        out.push(compareSet(correctCard.dieTypes, guessedCard.dieTypes));
        break;
      case "Max Roll":
        out.push(compareNumber(correctCard.maxRoll, guessedCard.maxRoll));
        break;
      case "Min Roll":
        out.push(compareNumber(correctCard.minRoll, guessedCard.minRoll));
        break;
      case "Number of Die":
        out.push(compareNumber(correctCard.numDie, guessedCard.numDie));
        break;
      case "Keywords":
        out.push(compareSet(correctCard.keywords, guessedCard.keywords));
        break;
      default:
        throw new Error("Invalid name");
    }
  }

  return out;
}