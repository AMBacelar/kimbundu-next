import Link from "next/link";
import { useRouter } from "next/router";
import { DictionaryEntryComponent } from "../../components/dictionaryEntry";
import Layout from "../../components/Layout";
import { Pagination } from "../../components/pagination";
import { getEntry } from "../../fetch-data/get-entry";
import { EmptyState } from "../../components/shared/EmptyState";
import type { PublicDictionaryEntry } from "../../types/dictionary";
import { ArrowLeft, BookOpen } from "lucide-react";

type Props = {
  results: PublicDictionaryEntry[];
  term: string;
  numPages: number;
  totalMatches: number;
};

const i18n = {
  errorTitle: {
    en: "Entry not found | Kimbundu Dictionary",
    fr: "Entrée introuvable | Dictionnaire Kimbundu",
    pt: "Entrada não encontrada | Dicionário Kimbundu",
  },
  baseTitle: {
    en: "Kimbundu Dictionary",
    fr: "Dictionnaire Kimbundu",
    pt: "Dicionário Kimbundu",
  },
  errorText: {
    en: "This word was not found in the current dictionary.",
    fr: "Ce mot n'a pas été trouvé dans le dictionnaire actuel.",
    pt: "Esta palavra não foi encontrada no dicionário atual.",
  },
  errorHelp: {
    en: "It may not yet be published, or try searching with a different spelling.",
    fr: "Il n'est peut-être pas encore publié, ou essayez une orthographe différente.",
    pt: "Pode ainda não estar publicada, ou tente com uma ortografia diferente.",
  },
  count: {
    en: "entry variants",
    fr: "variantes d'entrée",
    pt: "variantes de entrada",
  },
  heading: {
    en: "Dictionary entry",
    fr: "Entrée du dictionnaire",
    pt: "Entrada do dicionário",
  },
  searchLink: {
    en: "Search for this word",
    fr: "Rechercher ce mot",
    pt: "Pesquisar esta palavra",
  },
  backToSearch: {
    en: "Back to search",
    fr: "Retour à la recherche",
    pt: "Voltar à pesquisa",
  },
  backToDictionary: {
    en: "Back to dictionary",
    fr: "Retour au dictionnaire",
    pt: "Voltar ao dicionário",
  },
};

const KimbunduEntryPage = ({ results, term, numPages, totalMatches }: Props) => {
  const router = useRouter();
  const { locale, query } = router;
  const currentLocale = (locale as "pt" | "fr" | "en") || "en";
  const { targetPage } = query;

  const t = (stringPath: keyof typeof i18n) => i18n[stringPath][currentLocale];

  const onPageChange = (page: number) => {
    router.push(`/word/${encodeURIComponent(term)}?targetPage=${page}`);
  };

  const currentPage = Math.max(1, parseInt(targetPage as string, 10) || 1);

  if (!results.length) {
    return (
      <Layout title={t("errorTitle")} description={t("errorText")}>
        <div className="space-y-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            {t("backToDictionary")}
          </Link>

          <EmptyState
            title={t("errorText")}
            description={t("errorHelp")}
            icon={<BookOpen className="size-5" />}
          >
            <Link
              href={`/search?term=${encodeURIComponent(term)}`}
              className="inline-flex items-center rounded-lg border border-border/60 bg-background/80 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-primary/8"
            >
              {t("searchLink")}
            </Link>
          </EmptyState>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${term} | ${t("baseTitle")}`}
      description={`Dictionary entry for ${term}`}
    >
      <div className="space-y-8">
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            {t("backToDictionary")}
          </Link>

          <div>
            <p className="kimbundu-kicker mb-2">{t("heading")}</p>
            <h1>{term}</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {totalMatches} {t("count")}
            </p>
          </div>
        </div>

        <section className="space-y-5">
          {results.map((result, i) => (
            <DictionaryEntryComponent
              key={`${result.lemma_normalized}-${i}`}
              entry={result}
              variant="full"
            />
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

export const getServerSideProps = async ({
  params,
  query,
}: {
  params: { kimbunduText: string };
  query: { targetPage?: string };
}) => {
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
};
