/**
 * Canon shape of an entry from dictionary_entries_public.json (server-only).
 */
export type DictionaryEntryCanon = {
  id: string;
  lemma: string;
  lemma_normalized: string;
  homonym_index: number;
  metadata: {
    display_group: string;
  };
  clean: {
    grammar: {
      part_of_speech: string[];
      subtypes: string[];
      number: string | null;
      notes: string[];
    };
    noun_class: {
      dictionary_class: string | null;
      singular_prefix: string | null;
      plural_prefix: string | null;
    };
    senses: Array<{
      definition_pt_source: string;
      definition_pt_normalized: string;
      cross_references: string[];
      confidence: number;
    }>;
    cross_references: string[];
  };
  editorial: {
    needs_review: boolean;
    reasons: string[];
  };
  publishable_with_review: boolean;
  source: {
    page: number;
    column: string;
  };
};

export type DictionaryCanonPayload = {
  metadata: {
    source: string;
    generated_at: string;
    entry_count: number;
    note: string;
  };
  entries: DictionaryEntryCanon[];
};

/**
 * Slim shape sent to the client (no raw IDs, no editorial metadata).
 */
export type PublicDictionaryEntry = {
  lemma: string;
  lemma_normalized: string;
  homonym_index: number;
  class_index: number | null;
  part_of_speech: string[];
  subtypes: string[];
  number: string | null;
  senses: Array<{ definition_pt: string }>;
  source_page: number | null;
};
