import Link from "next/link";
import { useRouter } from "next/router";
import { DictionaryEntryComponent } from "../../components/dictionaryEntry";
import Layout from "../../components/Layout";
import { Pagination } from "../../components/pagination";
import { getEntry } from "../../fetch-data/get-entry";
import type { PublicDictionaryEntry } from "../../types/dictionary";

type Props = {
  results: PublicDictionaryEntry[];
  term: string;
  numPages: number;
  totalMatches: number;
};

const i18n = {
  errorTitle: {
    en: "Entry not found | Kimbundu Dictionary",
    fr: "Entree introuvable | Dictionnaire Kimbundu",
    pt: "Entrada nao encontrada | Dicionario Kimbundu",
  },
  baseTitle: {
    en: "Kimbundu Dictionary",
    fr: "Dictionnaire Kimbundu",
    pt: "Dicionario Kimbundu",
  },
  errorText: {
    en: "This word was not found in the current public dictionary data.",
    fr: "Ce mot n'a pas ete trouve dans les donnees publiques du dictionnaire.",
    pt: "Esta palavra nao foi encontrada nos dados publicos atuais do dicionario.",
  },
  count: {
    en: "XXXXXX entry variants",
    fr: "XXXXXX variantes d'entree",
    pt: "XXXXXX variantes de entrada",
  },
  heading: {
    en: "Dictionary entry",
    fr: "Entree du dictionnaire",
    pt: "Entrada do dicionario",
  },
  reviewNote: {
    en: "Variant forms and homonyms are grouped below when available.",
    fr: "Les variantes et homonymes sont groupes ci-dessous lorsqu'ils existent.",
    pt: "Formas variantes e homonimos sao agrupados abaixo quando disponiveis.",
  },
  searchLink: {
    en: "Open search",
    fr: "Ouvrir la recherche",
    pt: "Abrir pesquisa",
  },
};

const KimbunduEntryPage = ({ results, term, numPages, totalMatches }: Props) => {
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

  const onPageChange = (page: number) => {
    router.push(`/word/${encodeURIComponent(term)}?targetPage=${page}`);
  };

  const currentPage = Math.max(1, parseInt(targetPage as string, 10) || 1);

  if (!results.length) {
    return (
      <Layout title={t("errorTitle")} description={t("errorText")}>
        <section className="kimbundu-surface space-y-4">
          <h1 className="kimbundu-section-title">{t("errorText")}</h1>
          <Link
            href={`/search?term=${encodeURIComponent(term)}`}
            className="inline-flex items-center rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10"
          >
            {t("searchLink")}
          </Link>
        </section>
      </Layout>
    );
  }

  return (
    <Layout title={`${term} | ${t("baseTitle")}`} description={`Dictionary entry for ${term}`}>
      <div className="space-y-6">
        <section className="kimbundu-surface space-y-3">
          <p className="kimbundu-kicker">{t("heading")}</p>
          <h1 className="kimbundu-section-title">{term}</h1>
          <p className="text-sm text-muted-foreground">{t("count", String(totalMatches))}</p>
          <p className="text-sm text-muted-foreground">{t("reviewNote")}</p>
        </section>

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

export default KimbunduEntryPage;

export async function getServerSideProps({
  params,
  query,
}: {
  params: { kimbunduText: string };
  query: { targetPage?: string };
}) {
  const potentialWord = params.kimbunduText;
  const { results, numPages, totalMatches } = await getEntry(
    potentialWord,
    Number(query.targetPage) || 1
  );

  return {
    props: {
      term: params.kimbunduText,
      results: results ?? [],
      numPages,
      totalMatches,
    },
  };
}
