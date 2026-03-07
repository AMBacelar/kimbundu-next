import { useRouter } from "next/router";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
    <div className="my-5 max-w-2xl">
      <Card>
        {classNumber != null && <ClassBadge classNumber={classNumber} />}
        <CardHeader>
          <CardTitle>
            <Link href={destinationUrl} className="hover:underline">
              {entry.lemma}
              {entry.homonym_index > 1
                ? `${t("homonym")}${entry.homonym_index})`
                : ""}
            </Link>
          </CardTitle>
          {entry.part_of_speech.length > 0 && (
            <p className="text-sm text-muted-foreground">
              {t("partOfSpeech")}
              {entry.part_of_speech.join(", ")}
              {entry.subtypes.length > 0 && ` (${entry.subtypes.join(", ")})`}
              {entry.number != null ? ` · ${entry.number}` : ""}
            </p>
          )}
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              <span className="mr-1">🇵🇹</span>
              <strong>{t("ptDef")}:</strong>
              <ul className="mt-2 list-disc pl-5">
                {entry.senses.map((sense, i) => (
                  <li key={i}>{sense.definition_pt}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};
