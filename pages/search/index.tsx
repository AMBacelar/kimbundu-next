import Link from "next/link";
import Layout from "../../components/Layout";
import { SearchBar } from "../../components/searchBar";
import { DictionaryEntryComponent } from "../../components/dictionaryEntry";
import { useRouter } from "next/router";
import { Pagination } from "../../components/pagination";
import { searchEntries } from "../../fetch-data/dictionary-server";
import type { PublicDictionaryEntry } from "../../types/dictionary";

const i18n = {
  baseTitle: {
    en: "Kimbundu Dictionary",
    fr: "Dictionnaire Kimbundu",
    pt: "Dicionario Kimbundu",
  },
  searchResult: {
    en: 'Results for "XXXXXX"',
    fr: 'Resultats pour "XXXXXX"',
    pt: 'Resultados para "XXXXXX"',
  },
  count: {
    en: "XXXXXX entries found",
    fr: "XXXXXX entrees trouvees",
    pt: "XXXXXX entradas encontradas",
  },
  noResultsTitle: {
    en: "No dictionary entries matched this search",
    fr: "Aucune entree ne correspond a cette recherche",
    pt: "Nenhuma entrada corresponde a esta pesquisa",
  },
  noResultsBody: {
    en: "Try a shorter term, remove diacritics, or switch query language (Kimbundu / Portuguese).",
    fr: "Essayez un terme plus court, sans diacritiques, ou changez de langue de recherche (kimbundu / portugais).",
    pt: "Tente um termo mais curto, sem diacriticos, ou altere o idioma da pesquisa (kimbundu / portugues).",
  },
  reviewNote: {
    en: "Entries are live while refinement continues through editorial review.",
    fr: "Les entrees sont deja en ligne pendant la revision editoriale continue.",
    pt: "As entradas ja estao publicas enquanto a revisao editorial continua.",
  },
  goHome: {
    en: "Back to dictionary home",
    fr: "Retour a l'accueil du dictionnaire",
    pt: "Voltar para a pagina inicial do dicionario",
  },
};

const SearchResultPage = ({
  results,
  term,
  numPages,
  totalMatches,
}: {
  results: PublicDictionaryEntry[];
  term: string;
  numPages: number;
  totalMatches: number;
}) => {
  const router = useRouter();
  const { locale, query } = router;
  const currentLocale = (locale as "pt" | "fr" | "en") || "en";
  const { targetPage } = query;

  const t = (stringPath: keyof typeof i18n, stringReplace?: string) => {
    let result = i18n[stringPath][currentLocale];
    if (stringReplace) {
      result = result.replace("XXXXXX", stringReplace);
    }
    return result;
  };

  const onPageChange = (page: number) => {
    router.push(`/search?term=${encodeURIComponent(term)}&targetPage=${page}`);
  };

  const currentPage = Math.max(1, parseInt(targetPage as string, 10) || 1);

  return (
    <Layout
      title={`${term} | ${t("baseTitle")}`}
      description={`Dictionary results for ${term}`}
    >
      <div className="space-y-6">
        <section className="kimbundu-surface space-y-4">
          <p className="kimbundu-kicker">{t("baseTitle")}</p>
          <h1 className="kimbundu-section-title">{t("searchResult", term)}</h1>
          <p className="text-sm text-muted-foreground">{t("count", String(totalMatches))}</p>
          <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
            <SearchBar searchTerm={term} />
          </div>
          <p className="text-sm text-muted-foreground">{t("reviewNote")}</p>
        </section>

        {results.length === 0 ? (
          <section className="kimbundu-surface space-y-3">
            <h2 className="text-2xl">{t("noResultsTitle")}</h2>
            <p className="text-muted-foreground">{t("noResultsBody")}</p>
            <Link
              href="/"
              className="inline-flex items-center rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10"
            >
              {t("goHome")}
            </Link>
          </section>
        ) : (
          <section>
            {results.map((result, i) => (
              <DictionaryEntryComponent key={`${result.lemma_normalized}-${i}`} entry={result} />
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

export async function getServerSideProps({
  query,
  res,
}: {
  query: { term?: string; targetPage?: string };
  res: { setHeader: (name: string, value: string) => void };
}) {
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
}
