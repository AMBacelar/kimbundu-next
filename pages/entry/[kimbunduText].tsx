import { GetStaticProps, GetStaticPaths } from "next";
import { DictionaryEntryComponent } from "../../components/dictionaryEntry";

import Layout from "../../components/Layout";
import { DictionaryEntry } from "../../interfaces";

import firestore from "../../utils/firestore";

type Props = {
  results?: DictionaryEntry[];
  term: string;
};

const KimbunduEntryPage = ({ results, term }: Props) => {
  if (results.length === 0) {
    return (
      <Layout title="Error | Online Kimbundu dictionary">
        <p>
          <span style={{ color: "red" }}>Error: Word not in dictionary</span>
        </p>
      </Layout>
    );
  }

  return (
    <Layout title={`${term} | Online Kimbundu dictionary`}>
      Found {results.length} results
      {results.map((result) => (
        <DictionaryEntryComponent key={result.id} entry={result} />
      ))}
    </Layout>
  );
};

export default KimbunduEntryPage;

export async function getServerSideProps({ params }) {
  const potentialWord = params.kimbunduText;
  const dictionaryRef = firestore.collection("dictionary");
  const snapshot = await dictionaryRef
    .where("diacriticFree", "==", potentialWord)
    .get();
  const results = [];
  if (snapshot.empty) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    snapshot.forEach((doc) => {
      results.push({ ...doc.data(), id: doc.id });
    });
  }
  return {
    props: {
      term: params.kimbunduText,
      results,
    }, // will be passed to the page component as props
  };
}
