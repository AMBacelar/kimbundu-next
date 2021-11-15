import React from "react";
import type { DictionaryEntry } from "../../interfaces";

type Props = {
  entry: DictionaryEntry;
};
export const DictionaryEntryComponent = ({ entry }: Props) => {
  return (
    <div>
      <hr />
      <p>Kimbundu Text: {entry.kimbunduText}</p>
      <p>Diacritic Free: {entry.diacriticFree}</p>
      <p>Portuguese Translation: {entry.translations.pt}</p>
      {entry.literalTranslations.pt && (
        <p>literal translation Portuguese: {entry.literalTranslations.pt}</p>
      )}
      <p>English Translation: {entry.translations.en}</p>
      {entry.literalTranslations.en && (
        <p>literal translation English: {entry.literalTranslations.en}</p>
      )}
      <p>French Translation: {entry.translations.fr}</p>
      {entry.literalTranslations.en && (
        <p>literal translation French: {entry.literalTranslations.fr}</p>
      )}
      <p>context:</p>
      <p>class:</p>
      <p>tags:</p>
    </div>
  );
};
