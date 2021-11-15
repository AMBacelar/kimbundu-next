import Link from "next/link";
import Layout from "../../components/Layout";
import firestore from "../../utils/firestore";
import { DictionaryEntry } from "../../interfaces";
import { SearchBar } from "../../components/searchBar";
import { DictionaryEntryComponent } from "../../components/dictionaryEntry";
import { useRouter } from "next/router";

type Props = {
  results?: DictionaryEntry[];
  term: string;
};

const i18n = {
  baseTitle: {
    en: "Online Kimbundu dictionary",
    fr: "Dictionnaire Kimbundu en ligne",
    pt: "Dicionário Kimbundu online"
  },
  searchResult: {
    en: "Search results for \"XXXXXX\" 🧐 ",
    fr: "Résultats de la recherche pour \"XXXXXX\" 🧐",
    pt: "Resultados da pesquisa para \"XXXXXX\" 🧐"
  },
  noResults: {
    en: "No results found | please make sure that you are searching in the correct language",
    fr: "Aucun résultat trouvé | s'il vous plaît assurez-vous que vous recherchez dans la bonne langue",
    pt: "Nenhum resultado encontrado | certifique-se de que está pesquisando no idioma correto"
  },
}

const SearchResultPage = ({ results, term }: Props) => {
  const router = useRouter();
  const { locale } = router;
  const t = (stringPath: string, stringReplace?: string) => {
    let result = i18n[stringPath][locale];
    if (stringReplace) {
      result = result.replace('XXXXXX', stringReplace)
    }
    return result;
  };

  return (
    <Layout title={`${term} | ${t('baseTitle')}`} >
      <h1>{t('searchResult', term)}</h1>
      <SearchBar />
      {results.length === 0 ? (
        <div>{t('noResults')}</div>
      ) : (
        results.map((result) => (
          <DictionaryEntryComponent key={result.id} entry={result} />
        ))
      )}
    </Layout>
  )
};

export default SearchResultPage;

export async function getServerSideProps({ query }) {
  if (!query.term) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  let field;
  switch (query.destination) {
    case "kimbundu":
      field = "diacriticFree";
      break;
    case "english":
      field = "translations.en_df";
      break;
    case "portuguese":
      field = "translations.pt_df";
      break;
    case "french":
      field = "translations.fr_df";
      break;
  }
  // const potentialWord = params.kimbunduText;
  const dictionaryRef = firestore.collection("dictionary");
  const snapshot = await dictionaryRef.where(field, "==", query.term).get();
  const results = [];
  if (snapshot.empty) {
    console.log("No matching documents.");
  } else {
    snapshot.forEach((doc) => {
      results.push({ ...doc.data(), id: doc.id });
    });
  }
  return {
    props: {
      term: query.term,
      results,
    }, // will be passed to the page component as props
  };
}
