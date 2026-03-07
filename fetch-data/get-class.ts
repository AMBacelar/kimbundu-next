import type { PublicDictionaryEntry } from "../types/dictionary";
import { getEntriesByClass } from "./dictionary-server";

export const getClass = async (
  potentialClass: string,
  targetPage: number
): Promise<{
  results: PublicDictionaryEntry[];
  showNext: boolean;
  showPrevious: boolean;
  numPages: number;
  totalMatches: number;
}> => {
  const classIndex = Math.max(0, Math.min(9, Number(potentialClass) || 0));
  const page = Math.max(1, Number(targetPage) || 1);
  return getEntriesByClass(classIndex, page);
};
