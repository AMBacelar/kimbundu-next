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

const SearchResultPage = ({ results, term }: Props) => (
  <Layout title={`Search for ${term} | Online Kimbundu dictionary`}>
    <h1>Search results for {term} 🧐 </h1>
    <SearchBar />
    <hr />
    {results.length === 0 ? (
      <div>No results found</div>
    ) : (
      results.map((result) => (
        <DictionaryEntryComponent key={result.id} entry={result} />
      ))
    )}
  </Layout>
);

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
