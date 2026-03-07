import type { PublicDictionaryEntry } from "../types/dictionary";
import { getEntriesByLemma } from "./dictionary-server";

export const getEntry = async (
  lemmaNormalized: string,
  targetPage: number
): Promise<{
  results: PublicDictionaryEntry[];
  showNext: boolean;
  showPrevious: boolean;
  numPages: number;
}> => {
  const page = Math.max(1, Number(targetPage) || 1);
  return getEntriesByLemma(lemmaNormalized, page);
};
