import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";

import { DictionaryEntryComponent } from "../../components/dictionaryEntry";
import Layout from "../../components/Layout";
import { DictionaryEntry } from "../../interfaces";
import { Pagination } from "../../components/pagination";
import { getTagObject } from "../../helpers/tag-parser";
import { getTag } from "../../fetch-data/get-tag";

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

const TagIndexPage = ({
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
  const tagObject = getTagObject(Number(term));

  const onPageChange = (e, data) => {
    e.preventDefault();
    router.push(`/tags/${term}?targetPage=${data.activePage}`);
  };

  return (
    <Layout title={`${tagObject[locale]} | ${t("baseTitle")}`}>
      {/* <ClassCard tagIndex={term} /> */}
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

export default TagIndexPage;

export async function getServerSideProps({ params, query }) {
  const potentialTag = Number(params.tagIndex);

  const { results, numPages } = await getTag(
    potentialTag,
    query.targetPage || 0
  );

  return {
    props: {
      term: params.tagIndex,
      results,
      numPages,
    }, // will be passed to the page component as props
  };
}
