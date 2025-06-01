export enum Correctness {
  Correct = 'correct',
  Partial = 'partial',
  Incorrect = 'incorrect'
}

export type Die = {
  Min: number;
  Dice: number;
  Type: string;
  Detail: string;
  Script: string;
  LocalizedDesc: string;
};

export function asDice(jsonStr: string): Die[] {
  let parsed: unknown;
  parsed = JSON.parse(jsonStr);
  if (typeof parsed === 'string') {
    parsed = JSON.parse(parsed);
  }

  if (!Array.isArray(parsed)) {
    throw new Error('Dice is not an array');
  }

  const result: Die[] = [];

  for (const item of parsed) {
    if (
      typeof item !== 'object' ||
      item === null ||
      typeof item.Min !== 'string' ||
      typeof item.Dice !== 'string' ||
      typeof item.Type !== 'string' ||
      typeof item.Script !== 'string' ||
      typeof item.LocalizedDesc !== 'string'
    ) {
      throw new Error('Invalid dice entry structure');
    }
    const detail = typeof item.Detail === 'string' ? item.Detail : 'Slash';
    const min = parseInt(item.Min, 10);
    const dice = parseInt(item.Dice, 10);

    if (isNaN(min) || isNaN(dice)) {
      throw new Error('Min or Dice is not a valid number');
    }

    result.push({
      Min: min,
      Dice: dice,
      Type: item.Type,
      Detail: detail,
      Script: item.Script,
      LocalizedDesc: item.LocalizedDesc,
    });
  }

  return result;
}


export type Card = {
  id: number;
  name: string;
  artwork: string;
  description: string;
  keywords: string[];
  chapter: number;
  dice: Die[];
  range: string;
  rarity: string;
  cost: number;
};

export function asCard(obj: unknown): Card {
  if (
    typeof obj === 'object' &&
    obj !== null &&
    typeof (obj as any).id === 'number' &&
    typeof (obj as any).name === 'string' &&
    typeof (obj as any).artwork === 'string' &&
    typeof (obj as any).description === 'string' &&
    typeof (obj as any).keywords === 'string' &&
    typeof (obj as any).chapter === 'number' &&
    typeof (obj as any).dice === 'string' &&
    typeof (obj as any).range === 'string' &&
    typeof (obj as any).rarity === 'string' &&
    typeof (obj as any).cost === 'number'
  ) {

    return {
      id: (obj as any).id,
      name: (obj as any).name,
      artwork: (obj as any).artwork,
      description: (obj as any).description,
      keywords: JSON.parse(JSON.parse((obj as any).keywords)),
      chapter: (obj as any).chapter,
      dice: asDice((obj as any).dice),
      range: (obj as any).range,
      rarity: (obj as any).rarity,
      cost: (obj as any).cost,
    };
  }

  throw new Error('Invalid card JSON structure');
}
