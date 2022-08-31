import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";

import { DictionaryEntryComponent } from "../../components/dictionaryEntry";
import Layout from "../../components/Layout";
import { buildClass } from "../../helpers/build-class";
import { DictionaryEntry } from "../../interfaces";
import { getClass } from "../../fetch-data/get-class";
import { Pagination } from "../../components/pagination";
import paginationStyles from "../../components/pagination/pagination.module.scss";

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
  results?: DictionaryEntry[];
  term: string;
  numPages: number;
}) => {
  const router = useRouter();
  const { locale, query } = router;
  const { targetPage } = query;
  const t = (stringPath: string) => i18n[stringPath][locale];
  const classObject = buildClass(term);

  const onPageChange = (e, data) => {
    e.preventDefault();
    router.push(`/classes/${term}?targetPage=${data.activePage}`);
  };

  return (
    <Layout
      title={`${classObject.display} - ${classObject.description[locale]} | ${t(
        "baseTitle"
      )}`}
    >
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

export async function getServerSideProps({ params, query }) {
  const potentialClass = params.classIndex;

  const { results, numPages } = await getClass(
    potentialClass,
    query.targetPage || 0
  );

  return {
    props: {
      term: params.classIndex,
      results,
      numPages,
    }, // will be passed to the page component as props
  };
}
