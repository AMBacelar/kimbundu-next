import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";

import { DictionaryEntryComponent } from "../../components/dictionaryEntry";
import Layout from "../../components/Layout";
import { getEntry } from "../../fetch-data/get-entry";
import { DictionaryEntry } from "../../interfaces";

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
  errorText: {
    en: "Error: Word not found in the dictionary",
    fr: "Erreur : mot introuvable dans le dictionnaire",
    pt: "Erro: palavra não encontrada no dicionário",
  },
  count: {
    en: "Count:",
    fr: "Compter:",
    pt: "Resultado:",
  },
};

const KimbunduEntryPage = ({ results, term }: Props) => {
  const router = useRouter();
  const { locale } = router;
  const t = (stringPath: string) => i18n[stringPath][locale];

  if (results.length === 0) {
    return (
      <Layout title={t("errorTitle")}>
        <p>
          <span style={{ color: "red" }}>{t("errorText")}</span>
        </p>
      </Layout>
    );
  }

  return (
    <Layout title={`${term} | ${t("baseTitle")}`}>
      {`${t("count")} ${results.length}`}
      {results.map((result, i) => (
        <DictionaryEntryComponent key={i} entry={result} />
      ))}
    </Layout>
  );
};

export default KimbunduEntryPage;

export async function getServerSideProps({ params, query }) {
  const potentialWord = params.kimbunduText;
  const { results, numPages } = await getEntry(
    potentialWord,
    query.targetPage || 0
  );

  return {
    props: {
      term: params.kimbunduText,
      results,
      numPages,
    }, // will be passed to the page component as props
  };
}
