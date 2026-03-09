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

const normalizeReferences = (references: string[] = []): string[] => {
  const parsed = references
    .flatMap((reference) => reference.split(/[;,]/))
    .map((reference) => reference.trim())
    .filter(Boolean);

  return Array.from(new Set(parsed));
};

const toPublicEntry = (e: DictionaryEntryCanon): PublicDictionaryEntry => ({
  lemma: e.lemma,
  lemma_normalized: e.lemma_normalized,
  homonym_index: e.homonym_index,
  class_index: dictionaryClassToIndex(e.clean.noun_class.dictionary_class),
  part_of_speech: e.clean.grammar.part_of_speech ?? [],
  subtypes: e.clean.grammar.subtypes ?? [],
  number: e.clean.grammar.number ?? null,
  senses: (e.clean.senses ?? []).map((sense) => ({
    definition_pt: sense.definition_pt_source,
    cross_references: normalizeReferences(sense.cross_references),
  })),
  cross_references: normalizeReferences(e.clean.cross_references),
  needs_review: Boolean(e.editorial?.needs_review),
  source_page: e.source?.page ?? null,
  source_column: e.source?.column ?? null,
});

const normalizeForMatch = (s: string): string =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

const entryMatchesSearch = (e: DictionaryEntryCanon, qNorm: string): boolean => {
  if (e.lemma_normalized && normalizeForMatch(e.lemma_normalized).includes(qNorm)) {
    return true;
  }

  for (const sense of e.clean.senses ?? []) {
    if (
      sense.definition_pt_normalized &&
      normalizeForMatch(sense.definition_pt_normalized).includes(qNorm)
    ) {
      return true;
    }

    if (
      sense.definition_pt_source &&
      normalizeForMatch(sense.definition_pt_source).includes(qNorm)
    ) {
      return true;
    }
  }

  return false;
};

const isPublishable = (e: DictionaryEntryCanon): boolean =>
  e.publishable_with_review !== false;

export const searchEntries = (
  q: string,
  page: number
): { results: PublicDictionaryEntry[]; numPages: number; totalMatches: number } => {
  const entries = loadEntries();
  const qNorm = normalizeForMatch(q).trim();
  const filtered = qNorm
    ? entries.filter((e) => isPublishable(e) && entryMatchesSearch(e, qNorm))
    : [];

  const totalMatches = filtered.length;
  const numPages = Math.max(1, Math.ceil(totalMatches / ENTRIES_PER_PAGE));
  const p = Math.max(1, Math.min(page, numPages));
  const start = (p - 1) * ENTRIES_PER_PAGE;

  return {
    results: filtered.slice(start, start + ENTRIES_PER_PAGE).map(toPublicEntry),
    numPages,
    totalMatches,
  };
};

export const getEntriesByLemma = (
  lemmaNormalized: string,
  page: number
): {
  results: PublicDictionaryEntry[];
  numPages: number;
  showNext: boolean;
  showPrevious: boolean;
  totalMatches: number;
} => {
  const entries = loadEntries();
  const norm = normalizeForMatch(lemmaNormalized).trim();
  const matching = entries.filter(
    (e) => isPublishable(e) && normalizeForMatch(e.lemma_normalized) === norm
  );

  const totalMatches = matching.length;
  const numPages = Math.max(1, Math.ceil(totalMatches / ENTRIES_PER_PAGE));
  const p = Math.max(1, Math.min(page, numPages));
  const start = (p - 1) * ENTRIES_PER_PAGE;

  return {
    results: matching.slice(start, start + ENTRIES_PER_PAGE).map(toPublicEntry),
    numPages,
    showNext: p < numPages,
    showPrevious: p > 1,
    totalMatches,
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
  totalMatches: number;
} => {
  const entries = loadEntries();
  const classDisplay = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"][
    classIndex
  ];

  const matching = entries.filter(
    (e) => isPublishable(e) && e.clean.noun_class.dictionary_class === classDisplay
  );

  const totalMatches = matching.length;
  const numPages = Math.max(1, Math.ceil(totalMatches / ENTRIES_PER_PAGE));
  const p = Math.max(1, Math.min(page, numPages));
  const start = (p - 1) * ENTRIES_PER_PAGE;

  return {
    results: matching.slice(start, start + ENTRIES_PER_PAGE).map(toPublicEntry),
    numPages,
    showNext: p < numPages,
    showPrevious: p > 1,
    totalMatches,
  };
};

export const getAvailableLetters = (): { letter: string; count: number }[] => {
  const entries = loadEntries();
  const letterMap = new Map<string, number>();

  for (const e of entries) {
    if (!isPublishable(e)) continue;
    const first = e.lemma_normalized[0]?.toUpperCase();
    if (first && /[A-Z]/.test(first)) {
      letterMap.set(first, (letterMap.get(first) || 0) + 1);
    }
  }

  return Array.from(letterMap.entries())
    .map(([letter, count]) => ({ letter, count }))
    .sort((a, b) => a.letter.localeCompare(b.letter));
};

export const getEntriesByLetter = (
  letter: string,
  page: number
): { results: PublicDictionaryEntry[]; numPages: number; totalMatches: number } => {
  const entries = loadEntries();
  const letterLower = letter.toLowerCase();
  const matching = entries.filter(
    (e) =>
      isPublishable(e) &&
      normalizeForMatch(e.lemma_normalized).startsWith(letterLower)
  );

  const totalMatches = matching.length;
  const numPages = Math.max(1, Math.ceil(totalMatches / ENTRIES_PER_PAGE));
  const p = Math.max(1, Math.min(page, numPages));
  const start = (p - 1) * ENTRIES_PER_PAGE;

  return {
    results: matching.slice(start, start + ENTRIES_PER_PAGE).map(toPublicEntry),
    numPages,
    totalMatches,
  };
};

export const getFeaturedEntries = (count: number = 6): PublicDictionaryEntry[] => {
  const entries = loadEntries();
  const good = entries.filter(
    (e) =>
      isPublishable(e) &&
      e.clean.senses.length > 0 &&
      !e.editorial?.needs_review
  );

  if (good.length <= count) return good.map(toPublicEntry);

  const step = Math.floor(good.length / count);
  const result: PublicDictionaryEntry[] = [];
  for (let i = 0; result.length < count && i < good.length; i += step) {
    result.push(toPublicEntry(good[i]));
  }
  return result;
};

export const getTotalPublishableCount = (): number => {
  const entries = loadEntries();
  return entries.filter(isPublishable).length;
};
