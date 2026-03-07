import { useRouter } from "next/router";
import { DictionaryEntryComponent } from "../../components/dictionaryEntry";
import Layout from "../../components/Layout";
import { buildClass } from "../../helpers/build-class";
import { getClass } from "../../fetch-data/get-class";
import { Pagination } from "../../components/pagination";
import { ClassCard } from "../../components/classCard";
import type { PublicDictionaryEntry } from "../../types/dictionary";

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
};

const ClassIndexPage = ({
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
  const t = (stringPath: string) => i18n[stringPath][locale];
  const classObject = buildClass(term);

  const onPageChange = (page: number) => {
    router.push(`/classes/${term}?targetPage=${page}`);
  };

  return (
    <Layout
      title={`${classObject.display} - ${classObject.description[locale]} | ${t(
        "baseTitle"
      )}`}
    >
      <ClassCard classIndex={term} />
      {results.map((result, i) => (
        <DictionaryEntryComponent key={i} entry={result} />
      ))}
      <Pagination
        numPages={numPages}
        currentPage={targetPage ? parseInt(targetPage as string) : 1}
        onPageChange={onPageChange}
      />
    </Layout>
  );
};

export default ClassIndexPage;

export async function getServerSideProps({
  params,
  query,
}: {
  params: { classIndex: string };
  query: { targetPage?: string };
}) {
  const potentialClass = params.classIndex;
  const { results, numPages } = await getClass(
    potentialClass,
    Number(query.targetPage) || 1
  );

  if (results.length === 0) {
    return {
      redirect: {
        destination: "/classes",
        permanent: false,
      },
    };
  }

  return {
    props: {
      term: params.classIndex,
      results,
      numPages,
    },
  };
}
