import { v4 as uuidv4 } from 'uuid';
import shuffle from './shuffle';

interface Item {
  id: string;
  value: any;
}

export enum Status {
  Unplayed,
  Home,
  Away,
  Draw
}

export interface Pair {
  id: string;
  home: Item;
  away: Item;
  status: Status
}

export function generatePairs(array: any[]) {
  const withIds = array.map(item => ({
    id: uuidv4(),
    value: item
  }));

  const paired: Pair[] = [];

  for (let i = 0; i < withIds.length; i++) {
    for (let j = 0; j < withIds.length; j++) {
      if (i === j) continue;
      paired.push({
        id: uuidv4(),
        home: withIds[i],
        away: withIds[j],
        status: Status.Unplayed
      });
    }
  }

  return shuffle(paired);
}
