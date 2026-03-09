import { useRouter } from "next/router";
import Link from "next/link";
import { ClassBadge } from "../classBadge";
import { Badge } from "../shared/Badge";
import type { PublicDictionaryEntry } from "../../types/dictionary";

type Props = {
  entry: PublicDictionaryEntry;
  variant?: "full" | "compact";
};

const i18n = {
  homonym: { en: "homonym", fr: "homonyme", pt: "homónimo" },
  ptDef: {
    en: "Portuguese definitions",
    fr: "Définitions portugaises",
    pt: "Definições em português",
  },
  source: { en: "Source", fr: "Source", pt: "Fonte" },
  page: { en: "Page", fr: "Page", pt: "Página" },
  column: { en: "Column", fr: "Colonne", pt: "Coluna" },
  review: { en: "Editorial review", fr: "Révision éditoriale", pt: "Revisão editorial" },
  needsReview: { en: "Needs review", fr: "À revoir", pt: "Revisão pendente" },
  reviewed: { en: "Reviewed", fr: "Vérifié", pt: "Verificado" },
  related: { en: "Related entries", fr: "Entrées associées", pt: "Entradas relacionadas" },
  unavailableSenses: {
    en: "No definition text available yet for this entry.",
    fr: "Pas de texte de définition disponible pour cette entrée.",
    pt: "Ainda não há texto de definição disponível para esta entrada.",
  },
  viewEntry: { en: "View full entry", fr: "Voir l'entrée", pt: "Ver entrada completa" },
};

const normalizeRefTerm = (term: string) =>
  term
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[.()]/g, "")
    .trim();

export const DictionaryEntryComponent = ({ entry, variant = "full" }: Props) => {
  const router = useRouter();
  const { locale } = router;
  const currentLocale = (locale as "pt" | "fr" | "en") || "en";
  const t = (stringPath: keyof typeof i18n) => i18n[stringPath][currentLocale];

  const destinationUrl = `/word/${entry.lemma_normalized}`;
  const classNumber = entry.class_index != null ? String(entry.class_index) : null;

  if (variant === "compact") {
    return (
      <Link
        href={destinationUrl}
        className="group block rounded-xl border border-border/40 bg-card/60 p-5 transition-all hover:border-border/70 hover:bg-card/90 hover:shadow-sm"
      >
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-primary">
            {entry.lemma}
            {entry.homonym_index > 1 && (
              <span className="ml-1.5 align-super text-xs font-normal text-muted-foreground">
                {entry.homonym_index}
              </span>
            )}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {entry.part_of_speech.map((pos) => (
              <Badge key={pos} variant="accent">
                {pos}
              </Badge>
            ))}
            {classNumber != null && (
              <Badge variant="outline">Class {["I","II","III","IV","V","VI","VII","VIII","IX","X"][entry.class_index!]}</Badge>
            )}
          </div>
        </div>
        {entry.senses.length > 0 && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {entry.senses.map((s) => s.definition_pt).join("; ")}
          </p>
        )}
        {entry.cross_references.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {entry.cross_references.slice(0, 4).map((ref) => (
              <span
                key={ref}
                className="rounded-full bg-muted/60 px-2 py-0.5 text-xs text-muted-foreground"
              >
                {ref}
              </span>
            ))}
            {entry.cross_references.length > 4 && (
              <span className="text-xs text-muted-foreground">
                +{entry.cross_references.length - 4}
              </span>
            )}
          </div>
        )}
      </Link>
    );
  }

  return (
    <article className="rounded-2xl border border-border/50 bg-card/80 p-6 shadow-sm md:p-8">
      <header className="mb-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              <Link
                href={destinationUrl}
                className="transition-colors hover:text-primary"
              >
                {entry.lemma}
              </Link>
              {entry.homonym_index > 1 && (
                <span className="ml-2 align-super text-base font-normal text-muted-foreground">
                  {t("homonym")} {entry.homonym_index}
                </span>
              )}
            </h2>

            <div className="flex flex-wrap gap-2">
              {entry.part_of_speech.map((pos) => (
                <Badge key={`${entry.lemma}-${pos}`} variant="accent">
                  {pos}
                </Badge>
              ))}
              {entry.subtypes.map((subtype) => (
                <Badge key={`${entry.lemma}-${subtype}`} variant="default">
                  {subtype}
                </Badge>
              ))}
              {entry.number && (
                <Badge variant="outline">{entry.number}</Badge>
              )}
              <Badge variant={entry.needs_review ? "warning" : "success"}>
                {entry.needs_review ? t("needsReview") : t("reviewed")}
              </Badge>
            </div>
          </div>

          {classNumber != null && (
            <div className="shrink-0">
              <ClassBadge classNumber={classNumber} />
            </div>
          )}
        </div>
      </header>

      <section className="mb-6">
        <h3 className="kimbundu-kicker mb-3">{t("ptDef")}</h3>
        {entry.senses.length === 0 ? (
          <p className="rounded-xl border border-border/40 bg-muted/30 p-4 text-sm text-muted-foreground">
            {t("unavailableSenses")}
          </p>
        ) : (
          <ol className="space-y-3">
            {entry.senses.map((sense, i) => (
              <li
                key={`${entry.lemma}-sense-${i}`}
                className="rounded-xl border border-border/30 bg-background/60 p-4"
              >
                <p className="text-[0.95rem] leading-7 text-foreground/90">
                  <span className="mr-2 inline-flex size-6 items-center justify-center rounded-full bg-primary/8 text-xs font-semibold text-primary">
                    {i + 1}
                  </span>
                  {sense.definition_pt}
                </p>

                {sense.cross_references.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5 pl-8">
                    {sense.cross_references.map((reference) => (
                      <Link
                        key={`${entry.lemma}-sense-ref-${reference}`}
                        href={`/search?term=${encodeURIComponent(normalizeRefTerm(reference))}`}
                        className="rounded-full border border-border/40 bg-muted/40 px-2.5 py-0.5 text-xs text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/8 hover:text-foreground"
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
        <section className="mb-6">
          <h3 className="kimbundu-kicker mb-3">{t("related")}</h3>
          <div className="flex flex-wrap gap-2">
            {entry.cross_references.map((reference) => (
              <Link
                key={`${entry.lemma}-entry-ref-${reference}`}
                href={`/search?term=${encodeURIComponent(normalizeRefTerm(reference))}`}
                className="rounded-full border border-border/50 bg-background/80 px-3 py-1 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-primary/8"
              >
                {reference}
              </Link>
            ))}
          </div>
        </section>
      )}

      <footer className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border/30 pt-4 text-xs text-muted-foreground">
        <span>
          <strong className="font-semibold text-foreground/70">{t("source")}:</strong>{" "}
          {entry.source_page != null ? `${t("page")} ${entry.source_page}` : "\u2014"}
        </span>
        {entry.source_column && (
          <span>
            <strong className="font-semibold text-foreground/70">{t("column")}:</strong>{" "}
            {entry.source_column}
          </span>
        )}
      </footer>
    </article>
  );
};
