import { Pair } from './pairs';

const STORAGE = window.localStorage;

export function getSavedPairs(): Pair[] | null {
  const storedPairs = STORAGE.getItem('pairs');
  if (!storedPairs) return null;
  return JSON.parse(storedPairs);
}

export function persistPairs(pairs: Pair[] | null) {
  STORAGE.setItem('pairs', JSON.stringify(pairs));
}
