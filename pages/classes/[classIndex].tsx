import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";

import { DictionaryEntryComponent } from "../../components/dictionaryEntry";
import Layout from "../../components/Layout";
import { buildClass } from "../../helpers/build-class";
import { DictionaryEntry } from "../../interfaces";
import firestore from "../../utils/firestore";

type Props = {
  results?: DictionaryEntry[];
  term: string;
  prev: string;
  next: string;
  showPrevious: boolean;
  showNext: boolean;
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

const ClassIndexPage = ({
  results,
  term,
  showPrevious,
  showNext,
  prev,
  next,
}: Props) => {
  const router = useRouter();
  const { locale } = router;
  const t = (stringPath: string) => i18n[stringPath][locale];
  const classObject = buildClass(term);

  return (
    <Layout
      title={`${classObject.display} - ${classObject.description[locale]} | ${t(
        "baseTitle"
      )}`}
    >
      {results.map((result) => (
        <DictionaryEntryComponent key={result.id} entry={result} />
      ))}
      {showPrevious && (
        <Link passHref href={`/classes/${term}?endBefore=${prev}`}>
          <a>Prev</a>
        </Link>
      )}
      {showNext && (
        <Link passHref href={`/classes/${term}?startAt=${next}`}>
          <a>Next</a>
        </Link>
      )}
    </Layout>
  );
};

export default ClassIndexPage;

export async function getServerSideProps({ params, query }) {
  const potentialClass = params.classIndex;
  const { endBefore, startAt } = query;
  const dictionaryRef = firestore.collection("dictionary");
  let snapshot;

  let showPrevious = false;
  let prev;
  let showNext = false;
  let next;

  const results = [];

  if (endBefore) {
    snapshot = await dictionaryRef
      .where("class", "array-contains", potentialClass)
      .orderBy("diacriticFree")
      .endBefore(endBefore)
      .limit(11)
      .get();

    if (snapshot.empty) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    snapshot.forEach((doc) => {
      results.push({ ...doc.data(), id: doc.id });
    });

    if (results.length === 11) {
      showPrevious = true;
      showNext = true;
      prev = results[0].id;
      next = results[results.length - 1].id;
      results.shift();
      results.pop();
    }
  } else if (startAt) {
    showPrevious = true;

    snapshot = await dictionaryRef
      .where("class", "array-contains", potentialClass)
      .orderBy("diacriticFree")
      .startAt(startAt)
      .limit(11)
      .get();

    if (snapshot.empty) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    snapshot.forEach((doc) => {
      results.push({ ...doc.data(), id: doc.id });
    });
    prev = results[0].id;
    if (results.length === 11) {
      showNext = true;
      next = results[results.length - 1].id;
      results.pop();
    }
  } else {
    snapshot = await dictionaryRef
      .where("class", "array-contains", potentialClass)
      .orderBy("diacriticFree")
      .limit(11)
      .get();
    if (snapshot.empty) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    snapshot.forEach((doc) => {
      results.push({ ...doc.data(), id: doc.id });
    });
    if (results.length === 11) {
      showNext = true;
      next = results[results.length - 1].id;
      results.pop();
    }
  }

  return {
    props: {
      term: params.classIndex,
      results,
      showPrevious,
      showNext,
      prev: prev || null,
      next: next || null,
    }, // will be passed to the page component as props
  };
}
