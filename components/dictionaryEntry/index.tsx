import { useRouter } from "next/router";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClassBadge } from "../classBadge";
import type { PublicDictionaryEntry } from "../../types/dictionary";

type Props = {
  entry: PublicDictionaryEntry;
};

const i18n = {
  homonym: {
    en: "homonym",
    fr: "homonyme",
    pt: "homonimo",
  },
  partOfSpeech: {
    en: "Part of speech",
    fr: "Categorie grammaticale",
    pt: "Classe gramatical",
  },
  subtype: {
    en: "Subtype",
    fr: "Sous-type",
    pt: "Subtipo",
  },
  number: {
    en: "Number",
    fr: "Nombre",
    pt: "Numero",
  },
  ptDef: {
    en: "Portuguese definition",
    fr: "Definition portugaise",
    pt: "Definicao em portugues",
  },
  source: {
    en: "Source",
    fr: "Source",
    pt: "Fonte",
  },
  page: {
    en: "Page",
    fr: "Page",
    pt: "Pagina",
  },
  column: {
    en: "Column",
    fr: "Colonne",
    pt: "Coluna",
  },
  review: {
    en: "Editorial review",
    fr: "Revision editoriale",
    pt: "Revisao editorial",
  },
  needsReview: {
    en: "Needs review",
    fr: "A revoir",
    pt: "Revisao pendente",
  },
  reviewed: {
    en: "Checked",
    fr: "Verifie",
    pt: "Verificado",
  },
  related: {
    en: "Related entries",
    fr: "Entrees associees",
    pt: "Entradas relacionadas",
  },
  unavailableSenses: {
    en: "No definition text available yet for this entry.",
    fr: "Pas de texte de definition disponible pour cette entree.",
    pt: "Ainda nao ha texto de definicao disponivel para esta entrada.",
  },
};

const normalizeRefTerm = (term: string) =>
  term
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[.()]/g, "")
    .trim();

export const DictionaryEntryComponent = ({ entry }: Props) => {
  const router = useRouter();
  const { locale } = router;
  const currentLocale = (locale as "pt" | "fr" | "en") || "en";
  const t = (stringPath: keyof typeof i18n) => i18n[stringPath][currentLocale];

  const destinationUrl = `/word/${entry.lemma_normalized}`;
  const classNumber = entry.class_index != null ? String(entry.class_index) : null;

  return (
    <Card className="my-4 border-border/80 bg-card/90 shadow-[0_12px_30px_-24px_rgba(45,31,12,0.6)]">
      <CardHeader className="gap-4">
        <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-start">
          <div className="space-y-3">
            <CardTitle className="text-2xl font-semibold md:text-3xl">
              <Link href={destinationUrl} className="hover:text-primary hover:underline">
                {entry.lemma}
                {entry.homonym_index > 1
                  ? ` (${t("homonym")} ${entry.homonym_index})`
                  : ""}
              </Link>
            </CardTitle>

            <div className="flex flex-wrap gap-2 text-xs">
              {entry.part_of_speech.map((pos) => (
                <span
                  key={`${entry.lemma}-${pos}`}
                  className="rounded-full border border-border/70 bg-muted px-2.5 py-1 font-medium text-foreground"
                >
                  {`${t("partOfSpeech")}: ${pos}`}
                </span>
              ))}

              {entry.subtypes.map((subtype) => (
                <span
                  key={`${entry.lemma}-${subtype}`}
                  className="rounded-full border border-border/70 bg-accent/60 px-2.5 py-1 font-medium text-foreground"
                >
                  {`${t("subtype")}: ${subtype}`}
                </span>
              ))}

              {entry.number && (
                <span className="rounded-full border border-border/70 bg-secondary px-2.5 py-1 font-medium text-foreground">
                  {`${t("number")}: ${entry.number}`}
                </span>
              )}

              <span
                className={
                  entry.needs_review
                    ? "rounded-full border border-amber-300/70 bg-amber-100/70 px-2.5 py-1 font-medium text-amber-900"
                    : "rounded-full border border-emerald-300/70 bg-emerald-100/70 px-2.5 py-1 font-medium text-emerald-900"
                }
              >
                {`${t("review")}: ${entry.needs_review ? t("needsReview") : t("reviewed")}`}
              </span>
            </div>
          </div>

          {classNumber != null && (
            <div className="max-w-sm">
              <ClassBadge classNumber={classNumber} />
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <section className="space-y-3">
          <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            {t("ptDef")}
          </p>
          {entry.senses.length === 0 ? (
            <p className="rounded-xl border border-border/70 bg-muted/55 p-3 text-sm text-muted-foreground">
              {t("unavailableSenses")}
            </p>
          ) : (
            <ol className="space-y-3">
              {entry.senses.map((sense, i) => (
                <li
                  key={`${entry.lemma}-sense-${i}`}
                  className="space-y-2 rounded-xl border border-border/70 bg-background/75 p-3"
                >
                  <p className="text-sm leading-7 text-foreground/90">
                    <span className="mr-2 text-xs font-semibold text-muted-foreground">{i + 1}.</span>
                    {sense.definition_pt}
                  </p>

                  {sense.cross_references.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {sense.cross_references.map((reference) => (
                        <Link
                          key={`${entry.lemma}-sense-ref-${reference}`}
                          href={`/search?term=${encodeURIComponent(normalizeRefTerm(reference))}`}
                          className="rounded-full border border-border/70 bg-muted px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-foreground"
                        >
                          {reference}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ol>
          )}
        </section>

        {entry.cross_references.length > 0 && (
          <section className="space-y-2">
            <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              {t("related")}
            </p>
            <div className="flex flex-wrap gap-2">
              {entry.cross_references.map((reference) => (
                <Link
                  key={`${entry.lemma}-entry-ref-${reference}`}
                  href={`/search?term=${encodeURIComponent(normalizeRefTerm(reference))}`}
                  className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10"
                >
                  {reference}
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border/70 pt-3 text-xs text-muted-foreground">
          <span>
            <strong className="font-semibold text-foreground">{t("source")}:</strong>{" "}
            {entry.source_page != null
              ? `${t("page")} ${entry.source_page}`
              : "-"}
          </span>
          {entry.source_column && (
            <span>
              <strong className="font-semibold text-foreground">{t("column")}:</strong>{" "}
              {entry.source_column}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
