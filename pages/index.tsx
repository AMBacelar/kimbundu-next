import Link from "next/link";
import Layout from "../components/Layout";
import { SearchBar } from "../components/searchBar";
import { useRouter } from "next/router";
import { getFeaturedEntries, getTotalPublishableCount } from "../fetch-data/dictionary-server";
import type { PublicDictionaryEntry } from "../types/dictionary";
import { BookOpen, Layers, Search } from "lucide-react";

type Props = {
  featured: PublicDictionaryEntry[];
  totalCount: number;
};

const i18n = {
  title: {
    en: "Kimbundu Language Archive | Searchable Kimbundu Dictionary",
    fr: "Archive Kimbundu | Dictionnaire kimbundu consultable",
    pt: "Arquivo Kimbundu | Dicionário kimbundu pesquisável",
  },
  heroKicker: {
    en: "Language preservation platform",
    fr: "Plateforme de préservation linguistique",
    pt: "Plataforma de preservação linguística",
  },
  heroTitle: {
    en: "A living dictionary for the Kimbundu language",
    fr: "Un dictionnaire vivant pour la langue kimbundu",
    pt: "Um dicionário vivo para a língua kimbundu",
  },
  heroBody: {
    en: "Explore, search, and discover one of Angola's most significant linguistic traditions. Built from historical source material and refined through continuous editorial work.",
    fr: "Explorez, recherchez et découvrez l'une des traditions linguistiques les plus importantes d'Angola. Construit à partir de sources historiques et affiné par un travail éditorial continu.",
    pt: "Explore, pesquise e descubra uma das tradições linguísticas mais significativas de Angola. Construído a partir de material histórico e refinado por trabalho editorial contínuo.",
  },
  stats: {
    en: "entries · 10 noun classes · Portuguese definitions",
    fr: "entrées · 10 classes nominales · Définitions portugaises",
    pt: "entradas · 10 classes nominais · Definições em português",
  },
  featuredTitle: {
    en: "Featured words",
    fr: "Mots en vedette",
    pt: "Palavras em destaque",
  },
  featuredBody: {
    en: "A selection from the dictionary to spark your exploration.",
    fr: "Une sélection du dictionnaire pour inspirer votre exploration.",
    pt: "Uma seleção do dicionário para inspirar a sua exploração.",
  },
  discoverTitle: {
    en: "Discover Kimbundu",
    fr: "Découvrir le kimbundu",
    pt: "Descobrir o kimbundu",
  },
  browseTitle: {
    en: "Browse by letter",
    fr: "Explorer par lettre",
    pt: "Explorar por letra",
  },
  browseBody: {
    en: "Walk through the dictionary alphabetically and discover words you haven't searched for yet.",
    fr: "Parcourez le dictionnaire alphabétiquement et découvrez des mots inattendus.",
    pt: "Percorra o dicionário alfabeticamente e descubra palavras que ainda não pesquisou.",
  },
  classesTitle: {
    en: "Noun classes",
    fr: "Classes nominales",
    pt: "Classes nominais",
  },
  classesBody: {
    en: "Study how Kimbundu organizes meaning through its noun class system — central to grammar and understanding.",
    fr: "Étudiez comment le kimbundu organise le sens par son système de classes nominales — central pour la grammaire.",
    pt: "Estude como o kimbundu organiza significado através do seu sistema de classes nominais — central para a gramática.",
  },
  aboutTitle: {
    en: "About the language",
    fr: "À propos de la langue",
    pt: "Sobre a língua",
  },
  aboutBody: {
    en: "Learn about Kimbundu — its people, its history, and why preserving it matters for future generations.",
    fr: "Découvrez le kimbundu — son peuple, son histoire, et pourquoi sa préservation est essentielle.",
    pt: "Conheça o kimbundu — o seu povo, a sua história, e porque a sua preservação importa para as gerações futuras.",
  },
  missionKicker: {
    en: "Why this archive exists",
    fr: "Pourquoi cette archive existe",
    pt: "Porque este arquivo existe",
  },
  missionTitle: {
    en: "Preserving language is preserving memory",
    fr: "Préserver la langue, c'est préserver la mémoire",
    pt: "Preservar a língua é preservar a memória",
  },
  missionBody: {
    en: "Kimbundu carries historical memory, social knowledge, and identity across generations. This archive publishes a structured dictionary corpus from historical source material and presents it for study, community use, and long-term preservation.",
    fr: "Le kimbundu porte mémoire historique, savoir social et identité entre générations. Cette archive publie un corpus de dictionnaire structuré à partir de sources historiques pour l'étude, l'usage communautaire et la préservation durable.",
    pt: "O kimbundu transporta memória histórica, conhecimento social e identidade entre gerações. Este arquivo publica um corpus de dicionário estruturado a partir de material histórico para estudo, uso comunitário e preservação de longo prazo.",
  },
  missionLink: {
    en: "Read about the project",
    fr: "Lire à propos du projet",
    pt: "Ler sobre o projeto",
  },
  viewEntry: {
    en: "View entry",
    fr: "Voir l'entrée",
    pt: "Ver entrada",
  },
};

const IndexPage = ({ featured, totalCount }: Props) => {
  const router = useRouter();
  const { locale } = router;
  const currentLocale = (locale as "pt" | "fr" | "en") || "en";
  const t = (stringPath: keyof typeof i18n) => i18n[stringPath][currentLocale];

  return (
    <Layout title={t("title")} description={t("heroBody")}>
      <div className="space-y-16">
        {/* Hero */}
        <section className="space-y-6 pt-4 md:pt-8">
          <div className="space-y-4">
            <p className="kimbundu-kicker">{t("heroKicker")}</p>
            <h1 className="max-w-3xl">{t("heroTitle")}</h1>
            <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
              {t("heroBody")}
            </p>
          </div>

          <div className="max-w-2xl">
            <SearchBar size="large" />
          </div>

          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              {totalCount.toLocaleString()}
            </span>{" "}
            {t("stats")}
          </p>
        </section>

        {/* Featured words */}
        {featured.length > 0 && (
          <section>
            <div className="mb-6">
              <h2>{t("featuredTitle")}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{t("featuredBody")}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((entry, i) => (
                <Link
                  key={`${entry.lemma_normalized}-${i}`}
                  href={`/word/${entry.lemma_normalized}`}
                  className="group rounded-xl border border-border/40 bg-card/60 p-5 transition-all hover:border-border/70 hover:bg-card/90 hover:shadow-sm"
                >
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-xl font-semibold text-foreground group-hover:text-primary">
                      {entry.lemma}
                    </span>
                    {entry.part_of_speech[0] && (
                      <span className="text-xs text-primary/70">
                        {entry.part_of_speech[0]}
                      </span>
                    )}
                  </div>
                  {entry.senses[0]?.definition_pt && (
                    <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {entry.senses[0].definition_pt}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Discovery pathways */}
        <section>
          <h2 className="mb-6">{t("discoverTitle")}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href="/browse"
              className="group kimbundu-surface flex flex-col gap-3 transition-all hover:shadow-md"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/8 text-primary">
                <Search className="size-5" />
              </div>
              <h3 className="text-lg group-hover:text-primary">{t("browseTitle")}</h3>
              <p className="text-sm text-muted-foreground">{t("browseBody")}</p>
            </Link>

            <Link
              href="/classes"
              className="group kimbundu-surface flex flex-col gap-3 transition-all hover:shadow-md"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/8 text-primary">
                <Layers className="size-5" />
              </div>
              <h3 className="text-lg group-hover:text-primary">{t("classesTitle")}</h3>
              <p className="text-sm text-muted-foreground">{t("classesBody")}</p>
            </Link>

            <Link
              href="/kimbundu"
              className="group kimbundu-surface flex flex-col gap-3 transition-all hover:shadow-md"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/8 text-primary">
                <BookOpen className="size-5" />
              </div>
              <h3 className="text-lg group-hover:text-primary">{t("aboutTitle")}</h3>
              <p className="text-sm text-muted-foreground">{t("aboutBody")}</p>
            </Link>
          </div>
        </section>

        {/* Mission */}
        <section className="kimbundu-surface-elevated">
          <p className="kimbundu-kicker mb-3">{t("missionKicker")}</p>
          <h2 className="mb-4 max-w-2xl">{t("missionTitle")}</h2>
          <p className="mb-6 max-w-3xl text-base text-muted-foreground">
            {t("missionBody")}
          </p>
          <Link
            href="/about"
            className="inline-flex items-center rounded-lg border border-border/60 bg-background/80 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-primary/8"
          >
            {t("missionLink")}
          </Link>
        </section>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const getServerSideProps = async () => {
  const featured = getFeaturedEntries(6);
  const totalCount = getTotalPublishableCount();

  return {
    props: { featured, totalCount },
  };
};
