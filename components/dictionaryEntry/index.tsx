import React, { useEffect, useState } from "react";
import type { DictionaryEntry } from "../../interfaces";
import { useRouter } from "next/router";
import Link from "next/link";
import { Card, Flag, Message } from "semantic-ui-react";
import styles from "./styles.module.scss";
import { ClassBadge } from "../classBadge";
import { getTagObject } from "../../helpers/tag-parser";
import { getTag } from "../../fetch-data/get-tag";

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
  tag: {
    en: "Tags: ",
    fr: "Tags: ",
    pt: "Etiqueta: ",
  },
  otherWordsWithTag: {
    en: "other words with the tag",
    fr: "d'autres mots avec le tag",
    pt: "outras palavras com a etiqueta",
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

const RelatedWords = ({ tag, locale }) => {
  const [relatedWords, setRelatedWords] = useState([]);
  useEffect(() => {
    (async () => {
      const words = await getTag(tag.index, 1);
      const relatedWords = words.results.map(
        ({ kimbunduText, diacriticFree }) => ({ kimbunduText, diacriticFree })
      );
      setRelatedWords(relatedWords);
    })();
  }, []);
  const t = (stringPath: string) => i18n[stringPath][locale];

  if (relatedWords.length === 0) return null;

  const renderedWords = relatedWords.map((word, i) => (
    <Link key={i} passHref href={`/word/${word.diacriticFree}`}>
      <em>
        <a>{` ${word.kimbunduText}`}</a>
        {i !== relatedWords.length - 1 && ","}
      </em>
    </Link>
  ));

  return (
    <Card fluid key={tag.index}>
      <Card.Content>
        <p>
          {`${t("otherWordsWithTag")}`}{" "}
          <Link passHref href={`/tags/${tag.index}`}>
            <a>{tag[locale]}</a>
          </Link>
          :
        </p>
        <div> {renderedWords}</div>
      </Card.Content>
    </Card>
  );
};

export const DictionaryEntryComponent = ({ entry }: Props) => {
  const router = useRouter();
  const { locale } = router;
  const t = (stringPath: string) => i18n[stringPath][locale];
  const desinationUrl = `/word/${entry.diacriticFree}`;

  const tagList = entry.tags.map((tag) => {
    const tagObject = getTagObject(tag);
    return (
      <Link passHref href={`/tags/${tagObject.index}`}>
        <a>{tagObject[locale]}</a>
      </Link>
    );
  });

  const relatedWords = entry.tags.map((tag) => {
    const tagObject = getTagObject(tag);
    return (
      <RelatedWords key={tagObject.index} tag={tagObject} locale={locale} />
    );
  });

  return (
    <div className={styles["wrapper"]}>
      <Card fluid>
        {entry.class && <ClassBadge classNumber={entry.class} />}
        <Card.Content>
          <Card.Header>
            <Link passHref href={desinationUrl}>
              <a>{entry.kimbunduText}</a>
            </Link>
          </Card.Header>
          <Card.Meta>{`${t("diaFree")}${entry.diacriticFree}`}</Card.Meta>
          {entry.tags.length > 0 && (
            <Card.Meta>
              {`${t("tag")}`}
              {tagList}
            </Card.Meta>
          )}
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
        {entry.tags.length > 0 && relatedWords}
      </Card>
      {/* <p>context:</p>*/}
    </div>
  );
};
