import type { DictionaryEntryCanon, PublicDictionaryEntry } from "../types/dictionary";
import { dictionaryClassToIndex } from "../helpers/build-class";

const ENTRIES_PER_PAGE = 10;

let cachedEntries: DictionaryEntryCanon[] | null = null;

const loadEntries = (): DictionaryEntryCanon[] => {
  if (cachedEntries != null) return cachedEntries;
  const data = require("../dictionary/dictionary_entries_public.json") as {
    entries: DictionaryEntryCanon[];
  };
  cachedEntries = data.entries;
  return cachedEntries;
};

const toPublicEntry = (e: DictionaryEntryCanon): PublicDictionaryEntry => ({
  lemma: e.lemma,
  lemma_normalized: e.lemma_normalized,
  homonym_index: e.homonym_index,
  class_index: dictionaryClassToIndex(e.clean.noun_class.dictionary_class),
  part_of_speech: e.clean.grammar.part_of_speech ?? [],
  subtypes: e.clean.grammar.subtypes ?? [],
  number: e.clean.grammar.number ?? null,
  senses: (e.clean.senses ?? []).map((s) => ({
    definition_pt: s.definition_pt_source,
  })),
  source_page: e.source?.page ?? null,
});

const normalizeForMatch = (s: string): string =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

const entryMatchesSearch = (e: DictionaryEntryCanon, qNorm: string): boolean => {
  if (e.lemma_normalized && normalizeForMatch(e.lemma_normalized).includes(qNorm))
    return true;
  for (const sense of e.clean.senses ?? []) {
    if (
      sense.definition_pt_normalized &&
      normalizeForMatch(sense.definition_pt_normalized).includes(qNorm)
    )
      return true;
    if (
      sense.definition_pt_source &&
      normalizeForMatch(sense.definition_pt_source).includes(qNorm)
    )
      return true;
  }
  return false;
};

export const searchEntries = (
  q: string,
  page: number
): { results: PublicDictionaryEntry[]; numPages: number } => {
  const entries = loadEntries();
  const qNorm = normalizeForMatch(q).trim();
  const filtered = qNorm
    ? entries.filter(
        (e) =>
          e.publishable_with_review !== false && entryMatchesSearch(e, qNorm)
      )
    : [];
  const numPages = Math.max(1, Math.ceil(filtered.length / ENTRIES_PER_PAGE));
  const p = Math.max(1, Math.min(page, numPages));
  const start = (p - 1) * ENTRIES_PER_PAGE;
  const results = filtered
    .slice(start, start + ENTRIES_PER_PAGE)
    .map(toPublicEntry);
  return { results, numPages };
};

export const getEntriesByLemma = (
  lemmaNormalized: string,
  page: number
): {
  results: PublicDictionaryEntry[];
  numPages: number;
  showNext: boolean;
  showPrevious: boolean;
} => {
  const entries = loadEntries();
  const norm = normalizeForMatch(lemmaNormalized).trim();
  const matching = entries.filter(
    (e) =>
      e.publishable_with_review !== false &&
      normalizeForMatch(e.lemma_normalized) === norm
  );
  const numPages = Math.max(1, Math.ceil(matching.length / ENTRIES_PER_PAGE));
  const p = Math.max(1, Math.min(page, numPages));
  const start = (p - 1) * ENTRIES_PER_PAGE;
  const results = matching
    .slice(start, start + ENTRIES_PER_PAGE)
    .map(toPublicEntry);
  return {
    results,
    numPages,
    showNext: p < numPages,
    showPrevious: p > 1,
  };
};

export const getEntriesByClass = (
  classIndex: number,
  page: number
): {
  results: PublicDictionaryEntry[];
  numPages: number;
  showNext: boolean;
  showPrevious: boolean;
} => {
  const entries = loadEntries();
  const classDisplay = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"][classIndex];
  const matching = entries.filter(
    (e) =>
      e.publishable_with_review !== false &&
      e.clean.noun_class.dictionary_class === classDisplay
  );
  const numPages = Math.max(1, Math.ceil(matching.length / ENTRIES_PER_PAGE));
  const p = Math.max(1, Math.min(page, numPages));
  const start = (p - 1) * ENTRIES_PER_PAGE;
  const results = matching
    .slice(start, start + ENTRIES_PER_PAGE)
    .map(toPublicEntry);
  return {
    results,
    numPages,
    showNext: p < numPages,
    showPrevious: p > 1,
  };
};
