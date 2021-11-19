import React from "react";
import type { DictionaryEntry } from "../../interfaces";
import { useRouter } from "next/router";
import Link from "next/link";
import { Card, Flag, Message, Label, Segment } from "semantic-ui-react";
import styles from "./styles.module.scss";
// import { ClassBadge } from "../classBadge";

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
    <div className={styles["wrapper"]}>
      <Card fluid>
        {/* <ClassBadge classNumber={entry.class[0]} /> */}
        <Card.Content>
          <Link href={desinationUrl}>
            <Card.Header>
              <a>{entry.kimbunduText}</a>
            </Card.Header>
          </Link>
          <Card.Meta>{`${t("diaFree")}${entry.diacriticFree}`}</Card.Meta>
          <Card.Description>
            <Message>
              <Flag name="pt" />
              <span>{`${t("ptTrans")}${entry.translations.pt}`}</span>
              {entry.literalTranslations.pt && (
                <p>{`${t("ptLitText")}${entry.literalTranslations.pt}`}</p>
              )}
            </Message>

            <Message>
              <Flag name="uk" />
              <span>{`${t("enTrans")}${entry.translations.en}`}</span>
              {entry.literalTranslations.en && (
                <p>{`${t("enLitText")}${entry.literalTranslations.en}`}</p>
              )}
            </Message>
            <Message>
              <Flag name="fr" />
              <span>{`${t("frTrans")}${entry.translations.fr}`}</span>
              {entry.literalTranslations.en && (
                <p>{`${t("frLitText")}${entry.literalTranslations.fr}`}</p>
              )}
            </Message>
          </Card.Description>
        </Card.Content>
      </Card>
      {/* <p>context:</p>
      <p>class:</p>
      <p>tags:</p> */}
    </div>
  );
};
