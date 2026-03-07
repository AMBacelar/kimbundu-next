import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Card, Flag, Message } from "semantic-ui-react";
import styles from "./styles.module.scss";
import { ClassBadge } from "../classBadge";
import type { PublicDictionaryEntry } from "../../types/dictionary";

type Props = {
  entry: PublicDictionaryEntry;
};

const i18n = {
  lemma: {
    en: "Kimbundu: ",
    fr: "Kimbundu : ",
    pt: "Kimbundu: ",
  },
  homonym: {
    en: " (homonym ",
    fr: " (homonyme ",
    pt: " (homónimo ",
  },
  partOfSpeech: {
    en: "Part of speech: ",
    fr: "Partie du discours : ",
    pt: "Classe gramatical: ",
  },
  ptDef: {
    en: "Portuguese definition",
    fr: "Définition portugaise",
    pt: "Definição em português",
  },
};

export const DictionaryEntryComponent = ({ entry }: Props) => {
  const router = useRouter();
  const { locale } = router;
  const t = (stringPath: string) => i18n[stringPath][locale];
  const destinationUrl = `/word/${entry.lemma_normalized}`;
  const classNumber =
    entry.class_index != null ? String(entry.class_index) : null;

  return (
    <div className={styles["wrapper"]}>
      <Card fluid>
        {classNumber != null && <ClassBadge classNumber={classNumber} />}
        <Card.Content>
          <Card.Header>
            <Link href={destinationUrl}>
              {entry.lemma}
              {entry.homonym_index > 1
                ? `${t("homonym")}${entry.homonym_index})`
                : ""}
            </Link>
          </Card.Header>
          <Card.Meta>
            {entry.part_of_speech.length > 0 && (
              <span>
                {t("partOfSpeech")}
                {entry.part_of_speech.join(", ")}
                {entry.subtypes.length > 0 &&
                  ` (${entry.subtypes.join(", ")})`}
                {entry.number != null ? ` · ${entry.number}` : ""}
              </span>
            )}
          </Card.Meta>
          <Card.Description>
            <Message>
              <Flag name="pt" />
              <strong>{t("ptDef")}:</strong>
              <ul style={{ marginTop: "0.5em", marginBottom: 0 }}>
                {entry.senses.map((sense, i) => (
                  <li key={i}>{sense.definition_pt}</li>
                ))}
              </ul>
            </Message>
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
};
