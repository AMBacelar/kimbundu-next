import Layout from "../../components/Layout";
import { SearchBar } from "../../components/searchBar";
import { DictionaryEntryComponent } from "../../components/dictionaryEntry";
import { useRouter } from "next/router";
import { Pagination } from "../../components/pagination";
import { searchEntries } from "../../fetch-data/dictionary-server";
import type { PublicDictionaryEntry } from "../../types/dictionary";

const i18n = {
  baseTitle: {
    en: "Online Kimbundu dictionary",
    fr: "Dictionnaire Kimbundu en ligne",
    pt: "Dicionário Kimbundu online",
  },
  searchResult: {
    en: 'Search results for "XXXXXX" 🧐 ',
    fr: 'Résultats de la recherche pour "XXXXXX" 🧐',
    pt: 'Resultados da pesquisa para "XXXXXX" 🧐',
  },
  noResults: {
    en: "No results found | please make sure that you are searching in the correct language",
    fr: "Aucun résultat trouvé | s'il vous plaît assurez-vous que vous recherchez dans la bonne langue",
    pt: "Nenhum resultado encontrado | certifique-se de que está pesquisando no idioma correto",
  },
};

const SearchResultPage = ({
  results,
  term,
  numPages,
}: {
  results: PublicDictionaryEntry[];
  term: string;
  numPages: number;
}) => {
  const router = useRouter();
  const { locale, query } = router;
  const { targetPage } = query;

  const t = (stringPath: string, stringReplace?: string) => {
    let result = i18n[stringPath][locale];
    if (stringReplace) {
      result = result.replace("XXXXXX", stringReplace);
    }
    return result;
  };

  const onPageChange = (page: number) => {
    router.push(`/search?term=${term}&targetPage=${page}`);
  };

  return (
    <Layout title={`${term} | ${t("baseTitle")}`}>
      <h1 className="mb-4 text-2xl font-bold">{t("searchResult", term)}</h1>
      <SearchBar searchTerm={term} />
      {results.length === 0 ? (
        <div className="mt-4 text-muted-foreground">{t("noResults")}</div>
      ) : (
        results.map((result, i) => (
          <DictionaryEntryComponent key={i} entry={result} />
        ))
      )}
      <Pagination
        numPages={numPages}
        currentPage={targetPage ? parseInt(targetPage as string) : 1}
        onPageChange={onPageChange}
      />
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
  const { results, numPages } = searchEntries(query.term, page);

  return {
    props: {
      term: query.term,
      results,
      numPages,
    },
  };
}
