import { useRouter } from "next/router";
import { DictionaryEntryComponent } from "../../components/dictionaryEntry";
import Layout from "../../components/Layout";
import { buildClass } from "../../helpers/build-class";
import { getClass } from "../../fetch-data/get-class";
import { Pagination } from "../../components/pagination";
import { ClassCard } from "../../components/classCard";
import type { PublicDictionaryEntry } from "../../types/dictionary";

const i18n = {
  baseTitle: {
    en: "Kimbundu Dictionary",
    fr: "Dictionnaire Kimbundu",
    pt: "Dicionario Kimbundu",
  },
  heading: {
    en: "Class overview",
    fr: "Vue de la classe",
    pt: "Visao da classe",
  },
  count: {
    en: "XXXXXX entries in this class",
    fr: "XXXXXX entrees dans cette classe",
    pt: "XXXXXX entradas nesta classe",
  },
};

const ClassIndexPage = ({
  results,
  term,
  numPages,
  totalMatches,
}: {
  results: PublicDictionaryEntry[];
  term: string;
  numPages: number;
  totalMatches: number;
}) => {
  const router = useRouter();
  const { locale, query } = router;
  const currentLocale = (locale as "pt" | "fr" | "en") || "en";
  const { targetPage } = query;
  const t = (stringPath: keyof typeof i18n, replaceValue?: string) => {
    let result = i18n[stringPath][currentLocale];
    if (replaceValue) {
      result = result.replace("XXXXXX", replaceValue);
    }
    return result;
  };

  const classObject = buildClass(term);

  const onPageChange = (page: number) => {
    router.push(`/classes/${term}?targetPage=${page}`);
  };

  const currentPage = Math.max(1, parseInt(targetPage as string, 10) || 1);

  return (
    <Layout
      title={`${classObject.display} - ${classObject.description[currentLocale]} | ${t("baseTitle")}`}
      description={classObject.description[currentLocale]}
    >
      <div className="space-y-6">
        <section className="kimbundu-surface space-y-2">
          <p className="kimbundu-kicker">{t("heading")}</p>
          <h1 className="kimbundu-section-title">{`Class ${classObject.display}`}</h1>
          <p className="text-muted-foreground">{t("count", String(totalMatches))}</p>
        </section>

        <ClassCard classIndex={term} />

        <section>
          {results.map((result, i) => (
            <DictionaryEntryComponent key={`${result.lemma_normalized}-${i}`} entry={result} />
          ))}
        </section>

        <Pagination
          numPages={numPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
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
  const { results, numPages, totalMatches } = await getClass(
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
      totalMatches,
    },
  };
}
