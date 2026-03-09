import Link from "next/link";
import Layout from "../../components/Layout";
import { SearchBar } from "../../components/searchBar";
import { DictionaryEntryComponent } from "../../components/dictionaryEntry";
import { EmptyState } from "../../components/shared/EmptyState";
import { useRouter } from "next/router";
import { Pagination } from "../../components/pagination";
import { searchEntries } from "../../fetch-data/dictionary-server";
import type { PublicDictionaryEntry } from "../../types/dictionary";
import { ArrowLeft } from "lucide-react";

const i18n = {
  baseTitle: {
    en: "Kimbundu Dictionary",
    fr: "Dictionnaire Kimbundu",
    pt: "Dicionário Kimbundu",
  },
  searchResult: {
    en: "Results for",
    fr: "Résultats pour",
    pt: "Resultados para",
  },
  count: {
    en: "entries found",
    fr: "entrées trouvées",
    pt: "entradas encontradas",
  },
  noResultsTitle: {
    en: "No entries matched your search",
    fr: "Aucune entrée ne correspond à cette recherche",
    pt: "Nenhuma entrada corresponde a esta pesquisa",
  },
  noResultsBody: {
    en: "Try a shorter term, remove diacritics, or search in a different language (Kimbundu or Portuguese).",
    fr: "Essayez un terme plus court, sans diacritiques, ou recherchez dans une autre langue.",
    pt: "Tente um termo mais curto, sem diacríticos, ou pesquise em outro idioma.",
  },
  goHome: {
    en: "Back to dictionary",
    fr: "Retour au dictionnaire",
    pt: "Voltar ao dicionário",
  },
  browseSuggestion: {
    en: "Or try browsing by letter",
    fr: "Ou essayez de parcourir par lettre",
    pt: "Ou tente explorar por letra",
  },
};

type PageProps = {
  results: PublicDictionaryEntry[];
  term: string;
  numPages: number;
  totalMatches: number;
};

const SearchResultPage = ({ results, term, numPages, totalMatches }: PageProps) => {
  const router = useRouter();
  const { locale, query } = router;
  const currentLocale = (locale as "pt" | "fr" | "en") || "en";
  const { targetPage } = query;

  const t = (stringPath: keyof typeof i18n) => i18n[stringPath][currentLocale];

  const onPageChange = (page: number) => {
    router.push(`/search?term=${encodeURIComponent(term)}&targetPage=${page}`);
  };

  const currentPage = Math.max(1, parseInt(targetPage as string, 10) || 1);

  return (
    <Layout
      title={`${term} | ${t("baseTitle")}`}
      description={`Dictionary results for ${term}`}
    >
      <div className="space-y-8">
        <div className="space-y-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            {t("goHome")}
          </Link>

          <div className="max-w-2xl">
            <SearchBar searchTerm={term} autoFocus />
          </div>

          {results.length > 0 && (
            <div>
              <h1 className="text-2xl md:text-3xl">
                {t("searchResult")}{" "}
                <span className="text-primary">&ldquo;{term}&rdquo;</span>
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {totalMatches.toLocaleString()} {t("count")}
              </p>
            </div>
          )}
        </div>

        {results.length === 0 ? (
          <EmptyState
            title={t("noResultsTitle")}
            description={t("noResultsBody")}
          >
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center rounded-lg border border-border/60 bg-background/80 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-primary/8"
              >
                {t("goHome")}
              </Link>
              <Link
                href="/browse"
                className="inline-flex items-center rounded-lg border border-border/60 bg-background/80 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-primary/8"
              >
                {t("browseSuggestion")}
              </Link>
            </div>
          </EmptyState>
        ) : (
          <section className="space-y-3">
            {results.map((result, i) => (
              <DictionaryEntryComponent
                key={`${result.lemma_normalized}-${i}`}
                entry={result}
                variant="compact"
              />
            ))}
          </section>
        )}

        <Pagination
          numPages={numPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    </Layout>
  );
};

export default SearchResultPage;

export const getServerSideProps = async ({
  query,
  res,
}: {
  query: { term?: string; targetPage?: string };
  res: { setHeader: (name: string, value: string) => void };
}) => {
  res.setHeader("Cache-Control", "public");
  if (!query.term) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const page = Math.max(1, parseInt(String(query.targetPage), 10) || 1);
  const { results, numPages, totalMatches } = searchEntries(query.term, page);

  return {
    props: {
      term: query.term,
      results,
      numPages,
      totalMatches,
    },
  };
};
