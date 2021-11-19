import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";

import { DictionaryEntryComponent } from "../../components/dictionaryEntry";
import Layout from "../../components/Layout";
import { DictionaryEntry } from "../../interfaces";
import firestore from "../../utils/firestore";

type Props = {
  results?: DictionaryEntry[];
  term: string;
};

const i18n = {
  errorTitle: {
    en: "Error | Online Kimbundu dictionary",
    fr: "Erreur | Dictionnaire Kimbundu en ligne",
    pt: "Erro | Dicionário Kimbundu online",
  },
  baseTitle: {
    en: "Online Kimbundu dictionary",
    fr: "Dictionnaire Kimbundu en ligne",
    pt: "Dicionário Kimbundu online",
  },
  count: {
    en: "Count:",
    fr: "Compter:",
    pt: "Resultado:",
  },
};

const ClassIndexPage = ({ results, term }: Props) => {
  const router = useRouter();
  const { locale } = router;
  const t = (stringPath: string) => i18n[stringPath][locale];

  return (
    <Layout title={`${term} | ${t("baseTitle")}`}>
      {`${t("count")} ${results.length}`}
      {results.map((result) => (
        <DictionaryEntryComponent key={result.id} entry={result} />
      ))}
    </Layout>
  );
};

export default ClassIndexPage;

export async function getServerSideProps({ params }) {
  const potentialClass = params.classIndex;
  const dictionaryRef = firestore.collection("dictionary");
  const snapshot = await dictionaryRef
    .where("class", "array-contains", potentialClass)
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
      term: params.classIndex,
      results,
    }, // will be passed to the page component as props
  };
}
