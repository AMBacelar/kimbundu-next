import Layout from "../../components/Layout";
import { DictionaryEntry } from "../../interfaces";
import { SearchBar } from "../../components/searchBar";
import { DictionaryEntryComponent } from "../../components/dictionaryEntry";
import { useRouter } from "next/router";
import Typesense from "typesense";
import dot from "dot-object";
import { Pagination } from "../../components/pagination";

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
  results?: DictionaryEntry[];
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

  const onPageChange = (e, data) => {
    e.preventDefault();
    router.push(`/search?term=${term}&targetPage=${data.activePage}`);
  };

  return (
    <Layout title={`${term} | ${t("baseTitle")}`}>
      <h1>{t("searchResult", term)}</h1>
      <SearchBar searchTerm={term} />
      {results.length === 0 ? (
        <div>{t("noResults")}</div>
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

export async function getServerSideProps({ query, res }) {
  res.removeHeader("Cache-Control");
  if (!query.term) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const client = new Typesense.Client({
    nodes: [
      {
        host: process.env.TYPESENSE_HOST,
        port: Number(process.env.TYPESENSE_PORT),
        protocol: process.env.TYPESENSE_PROTOCOL,
      },
    ],
    apiKey: process.env.TYPESENSE_API_KEY,
  });

  const page = query.targetPage || 1;

  const response = await client.collections("entries").documents().search({
    query_by:
      "translations.en,translations.pt,translations.fr,literalTranslations.en,literalTranslations.fr,literalTranslations.pt,kimbunduText",
    q: query.term,
    page,
  });

  const results = response.hits.map((hit) => dot.object(hit.document));
  const numPages = Math.ceil(response.found / response.request_params.per_page);

  return {
    props: {
      term: response.request_params.q,
      results,
      numPages,
    }, // will be passed to the page component as props
  };
}
