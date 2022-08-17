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

type Props = {
  results?: DictionaryEntry[];
  term: string;
  numPages: number;
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
};

const ClassIndexPage = ({ results, term, numPages }: Props) => {
  const router = useRouter();
  const { locale, query } = router;
  const { targetPage } = query;
  const t = (stringPath: string) => i18n[stringPath][locale];
  const classObject = buildClass(term);

  const paginationComponent: React.FC<{ page: number }> = ({ page }) => {
    if (
      (page as any) === "..." ||
      page == parseInt(targetPage as string) ||
      (page === 1 && targetPage === undefined)
    ) {
      return <a className={paginationStyles["pagination-button"]}>{page}</a>;
    }
    return (
      <Link passHref href={`/classes/${term}?targetPage=${page}`}>
        <a className={paginationStyles["pagination-button"]}>{page}</a>
      </Link>
    );
  };

  return (
    <Layout
      title={`${classObject.display} - ${classObject.description[locale]} | ${t(
        "baseTitle"
      )}`}
    >
      {results.map((result) => (
        <DictionaryEntryComponent key={result.id} entry={result} />
      ))}
      <Pagination
        numPages={numPages}
        currentPage={targetPage ? parseInt(targetPage as string) : 1}
        CustomPaginationComponent={paginationComponent}
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
