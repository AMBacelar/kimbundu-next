import Link from "next/link";
import Layout from "../components/Layout";
import { SearchBar } from "../components/searchBar";
import { DictionaryEntryComponent } from "../components/dictionaryEntry";
import { Pagination } from "../components/pagination";
import { useRouter } from "next/router";
import {
  getAvailableLetters,
  getEntriesByLetter,
  getTotalPublishableCount,
} from "../fetch-data/dictionary-server";
import type { PublicDictionaryEntry } from "../types/dictionary";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

type LetterInfo = { letter: string; count: number };

type PageProps = {
  letters: LetterInfo[];
  selectedLetter: string | null;
  entries: { results: PublicDictionaryEntry[]; numPages: number; totalMatches: number } | null;
  totalCount: number;
  currentPage: number;
};

const i18n = {
  title: {
    en: "Browse the Dictionary | Kimbundu Language Archive",
    fr: "Parcourir le dictionnaire | Archive Kimbundu",
    pt: "Explorar o dicionário | Arquivo Kimbundu",
  },
  heading: {
    en: "Browse the dictionary",
    fr: "Parcourir le dictionnaire",
    pt: "Explorar o dicionário",
  },
  kicker: {
    en: "Discovery",
    fr: "Découverte",
    pt: "Descoberta",
  },
  body: {
    en: "Select a letter to explore dictionary entries alphabetically.",
    fr: "Sélectionnez une lettre pour explorer les entrées du dictionnaire.",
    pt: "Selecione uma letra para explorar as entradas do dicionário.",
  },
  entriesFor: {
    en: "Entries starting with",
    fr: "Entrées commençant par",
    pt: "Entradas começando por",
  },
  count: {
    en: "entries",
    fr: "entrées",
    pt: "entradas",
  },
  totalEntries: {
    en: "entries in the dictionary",
    fr: "entrées dans le dictionnaire",
    pt: "entradas no dicionário",
  },
  classesTitle: {
    en: "Browse by noun class",
    fr: "Parcourir par classe nominale",
    pt: "Explorar por classe nominal",
  },
  classesBody: {
    en: "Kimbundu nouns are organized into ten classes based on prefix patterns. Each class carries grammatical meaning.",
    fr: "Les noms kimbundu sont organisés en dix classes basées sur des préfixes. Chaque classe porte un sens grammatical.",
    pt: "Os nomes em kimbundu são organizados em dez classes baseadas em padrões de prefixo. Cada classe carrega significado gramatical.",
  },
  viewAll: {
    en: "View all noun classes",
    fr: "Voir toutes les classes nominales",
    pt: "Ver todas as classes nominais",
  },
  backToAll: {
    en: "All letters",
    fr: "Toutes les lettres",
    pt: "Todas as letras",
  },
  orSearch: {
    en: "Or search for a specific word",
    fr: "Ou recherchez un mot spécifique",
    pt: "Ou pesquise uma palavra específica",
  },
};

const NOUN_CLASSES = [
  { display: "I", label: { en: "People, animated beings", fr: "Personnes, êtres animés", pt: "Pessoas, seres animados" }, prefix: "mu- / a-" },
  { display: "II", label: { en: "Inanimate beings, plants", fr: "Êtres inanimés, plantes", pt: "Seres inanimados, plantas" }, prefix: "mu- / mi-" },
  { display: "III", label: { en: "People, animals, augmentatives", fr: "Personnes, animaux, augmentatifs", pt: "Pessoas, animais, aumentativos" }, prefix: "ki- / i-" },
  { display: "IV", label: { en: "Objects of magnitude", fr: "Objets de grandeur", pt: "Objetos de grandeza" }, prefix: "ri- / ma-" },
  { display: "V", label: { en: "Abstract terms", fr: "Termes abstraits", pt: "Termos abstratos" }, prefix: "u- / mau-" },
];

const BrowsePage = ({
  letters,
  selectedLetter,
  entries,
  totalCount,
  currentPage,
}: PageProps) => {
  const router = useRouter();
  const { locale } = router;
  const currentLocale = (locale as "pt" | "fr" | "en") || "en";
  const t = (stringPath: keyof typeof i18n) => i18n[stringPath][currentLocale];

  const onPageChange = (page: number) => {
    router.push(`/browse?letter=${selectedLetter}&page=${page}`);
  };

  return (
    <Layout title={t("title")} description={t("body")}>
      <div className="space-y-10">
        {/* Header */}
        <section className="space-y-4">
          {selectedLetter && (
            <Link
              href="/browse"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" />
              {t("backToAll")}
            </Link>
          )}
          <div>
            <p className="kimbundu-kicker mb-2">{t("kicker")}</p>
            <h1>{t("heading")}</h1>
            <p className="mt-2 text-muted-foreground">
              {selectedLetter
                ? `${t("entriesFor")} "${selectedLetter}"`
                : t("body")}
            </p>
          </div>
        </section>

        {/* Alphabet strip */}
        <section>
          <div className="flex flex-wrap gap-1.5">
            {letters.map(({ letter, count }) => (
              <Link
                key={letter}
                href={`/browse?letter=${letter}`}
                className={cn(
                  "group relative flex min-w-[2.75rem] flex-col items-center rounded-lg border px-2 py-2 text-center transition-all",
                  selectedLetter === letter
                    ? "border-primary/40 bg-primary/10 text-foreground shadow-sm"
                    : "border-border/40 bg-card/50 text-foreground hover:border-border/70 hover:bg-card/80"
                )}
              >
                <span className="text-lg font-semibold leading-tight">{letter}</span>
                <span className="text-[10px] leading-tight text-muted-foreground">
                  {count}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Results for selected letter */}
        {selectedLetter && entries && (
          <section className="space-y-4">
            <div className="flex items-baseline gap-3">
              <h2>
                {t("entriesFor")} &ldquo;{selectedLetter}&rdquo;
              </h2>
              <span className="text-sm text-muted-foreground">
                {entries.totalMatches} {t("count")}
              </span>
            </div>

            <div className="space-y-3">
              {entries.results.map((entry, i) => (
                <DictionaryEntryComponent
                  key={`${entry.lemma_normalized}-${i}`}
                  entry={entry}
                  variant="compact"
                />
              ))}
            </div>

            <Pagination
              numPages={entries.numPages}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          </section>
        )}

        {/* When no letter selected: show discovery content */}
        {!selectedLetter && (
          <>
            <section className="space-y-3">
              <p className="text-sm text-muted-foreground">{t("orSearch")}</p>
              <div className="max-w-xl">
                <SearchBar />
              </div>
            </section>

            <section className="kimbundu-surface">
              <h2 className="mb-2">{t("classesTitle")}</h2>
              <p className="mb-5 text-sm text-muted-foreground">{t("classesBody")}</p>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {NOUN_CLASSES.map((cls, i) => (
                  <Link
                    key={cls.display}
                    href={`/classes/${i}`}
                    className="group flex items-center gap-3 rounded-lg border border-border/30 bg-background/50 p-3 transition-all hover:border-border/60 hover:bg-background/80"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/8 text-sm font-bold text-primary">
                      {cls.display}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground group-hover:text-primary">
                        {cls.label[currentLocale]}
                      </p>
                      <p className="text-xs text-muted-foreground">{cls.prefix}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-4">
                <Link
                  href="/classes"
                  className="inline-flex items-center rounded-lg border border-border/60 bg-background/80 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-primary/8"
                >
                  {t("viewAll")}
                </Link>
              </div>
            </section>

            <p className="text-center text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">
                {totalCount.toLocaleString()}
              </span>{" "}
              {t("totalEntries")}
            </p>
          </>
        )}
      </div>
    </Layout>
  );
};

export default BrowsePage;

export const getServerSideProps = async ({
  query,
}: {
  query: { letter?: string; page?: string };
}) => {
  const letters = getAvailableLetters();
  const totalCount = getTotalPublishableCount();
  const selectedLetter = query.letter?.toUpperCase() || null;
  const page = Math.max(1, parseInt(String(query.page), 10) || 1);

  let entries = null;
  if (selectedLetter) {
    entries = getEntriesByLetter(selectedLetter, page);
  }

  return {
    props: {
      letters,
      selectedLetter,
      entries,
      totalCount,
      currentPage: page,
    },
  };
};
