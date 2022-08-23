// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number;
  name: string;
};

export type DictionaryEntry = {
  context: string;
  tags: number[];
  diacriticFree: string;
  translations: {
    en: string;
    en_df: string;
    pt: string;
    pt_df: string;
    fr: string;
    fr_df: string;
  };
  literalTranslations: { en: string; fr: string; pt: string };
  kimbunduText: string;
  class: string;
};

export type ClassObject = {
  index: number;
  display: string;
  description: {
    pt: string;
    fr: string;
    en: string;
  };
  prefix: {
    singular: string;
    plural: string;
  };
  singularExample: {
    pt: string;
    fr: string;
    en: string;
  };
  pluralExample: {
    pt: string;
    fr: string;
    en: string;
  };
};
