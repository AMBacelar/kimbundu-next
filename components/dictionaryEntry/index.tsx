import React from "react";
import type { DictionaryEntry } from "../../interfaces";
import { useRouter } from "next/router";
import Link from "next/link";

type Props = {
  entry: DictionaryEntry;
};

const i18n = {
  kimText: {
    en: "Kimbundu Text: ",
    fr: "Texte de Kimbundu : ",
    pt: "Texto Kimbundu: ",
  },
  diaFree: {
    en: "Diacritic free: ",
    fr: "Sans signe diacritique : ",
    pt: "Sem diacríticos: ",
  },
  ptTrans: {
    en: "Portuguese Translation: ",
    fr: "Traduction portugaise : ",
    pt: "Tradução para o português: ",
  },
  ptLitText: {
    en: "Portuguese Literal Translation: ",
    fr: "Traduction littérale portugaise : ",
    pt: "Tradução literal do português: ",
  },
  enTrans: {
    en: "English Translation: ",
    fr: "Traduction anglaise : ",
    pt: "Tradução do inglês: ",
  },
  enLitText: {
    en: "English Literal Translation: ",
    fr: "Traduction littérale en anglais : ",
    pt: "Tradução literal em inglês: ",
  },
  frTrans: {
    en: "French Translation: ",
    fr: "Traduction française : ",
    pt: "Tradução francesa: ",
  },
  frLitText: {
    en: "French Literal Translation: ",
    fr: "Traduction littérale française : ",
    pt: "Tradução literal em francês: ",
  },
};

export const DictionaryEntryComponent = ({ entry }: Props) => {
  const router = useRouter();
  const { locale } = router;
  const t = (stringPath: string) => i18n[stringPath][locale];
  const desinationUrl = `/entry/${entry.diacriticFree}`;
  return (
    <div>
      <hr />
      <Link href={desinationUrl}>
        <a>{entry.kimbunduText}</a>
      </Link>
      <p>{`${t("diaFree")}${entry.diacriticFree}`}</p>
      <p>{`${t("ptTrans")}${entry.translations.pt}`}</p>
      {entry.literalTranslations.pt && (
        <p>{`${t("ptLitText")}${entry.literalTranslations.pt}`}</p>
      )}
      <p>{`${t("enTrans")}${entry.translations.en}`}</p>
      {entry.literalTranslations.en && (
        <p>{`${t("enLitText")}${entry.literalTranslations.en}`}</p>
      )}
      <p>{`${t("frTrans")}${entry.translations.fr}`}</p>
      {entry.literalTranslations.en && (
        <p>{`${t("frLitText")}${entry.literalTranslations.fr}`}</p>
      )}
      {/* <p>context:</p>
      <p>class:</p>
      <p>tags:</p> */}
    </div>
  );
};
