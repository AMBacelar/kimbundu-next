import Link from "next/link";
import Layout from "../components/Layout";
import { SearchBar } from "../components/searchBar";
import { useRouter } from "next/router";

const i18n = {
  title: {
    en: "Kimbundu Language Archive | Searchable Kimbundu Dictionary",
    fr: "Archive Kimbundu | Dictionnaire kimbundu consultable",
    pt: "Arquivo Kimbundu | Dicionario kimbundu pesquisavel",
  },
  heroKicker: {
    en: "Language preservation platform",
    fr: "Plateforme de preservation linguistique",
    pt: "Plataforma de preservacao linguistica",
  },
  heroTitle: {
    en: "A public dictionary for a living Kimbundu language tradition.",
    fr: "Un dictionnaire public pour une tradition linguistique kimbundu vivante.",
    pt: "Um dicionario publico para uma tradicao viva da lingua kimbundu.",
  },
  heroBody: {
    en: "kimbundu.org publishes a structured dictionary corpus from historical source material and presents it for study, community use, and long-term preservation.",
    fr: "kimbundu.org publie un corpus de dictionnaire structure a partir de sources historiques, pour l'etude, l'usage communautaire et la preservation durable.",
    pt: "kimbundu.org publica um corpus de dicionario estruturado a partir de material historico, para estudo, uso comunitario e preservacao de longo prazo.",
  },
  availableNow: {
    en: "Available now",
    fr: "Disponible maintenant",
    pt: "Disponivel agora",
  },
  nowItem1: {
    en: "Search dictionary entries by Kimbundu lemma and Portuguese definitions.",
    fr: "Recherche des entrees par lemme kimbundu et definitions portugaises.",
    pt: "Pesquisa de entradas por lema kimbundu e definicoes em portugues.",
  },
  nowItem2: {
    en: "Browse noun classes and review class-specific vocabulary pages.",
    fr: "Parcours des classes nominales et pages de vocabulaire par classe.",
    pt: "Navegacao por classes nominais e paginas de vocabulario por classe.",
  },
  nowItem3: {
    en: "Read entry-level source metadata and editorial review status.",
    fr: "Consultation des metadonnees de source et de l'etat editorial de chaque entree.",
    pt: "Consulta de metadados de origem e estado de revisao editorial por entrada.",
  },
  sourceTitle: {
    en: "Source note",
    fr: "Note de source",
    pt: "Nota de fonte",
  },
  sourceBody: {
    en: "This dictionary corpus is extracted from historical materials and is being refined continuously. Some entries remain under editorial review while staying publicly accessible.",
    fr: "Ce corpus provient de materiaux historiques et continue d'etre affine. Certaines entrees restent en revision editoriale tout en etant accessibles publiquement.",
    pt: "Este corpus vem de materiais historicos e continua a ser refinado. Algumas entradas permanecem em revisao editorial, mas seguem acessiveis ao publico.",
  },
  classesLink: {
    en: "Explore noun classes",
    fr: "Explorer les classes nominales",
    pt: "Explorar classes nominais",
  },
  aboutLink: {
    en: "Read project context",
    fr: "Lire le contexte du projet",
    pt: "Ler contexto do projeto",
  },
};

const IndexPage = () => {
  const router = useRouter();
  const { locale } = router;
  const currentLocale = (locale as "pt" | "fr" | "en") || "en";
  const t = (stringPath: keyof typeof i18n) => i18n[stringPath][currentLocale];

  return (
    <Layout title={t("title")} description={t("heroBody")}>
      <div className="space-y-8 md:space-y-10">
        <section className="kimbundu-surface space-y-5">
          <p className="kimbundu-kicker">{t("heroKicker")}</p>
          <h1 className="kimbundu-section-title max-w-4xl">{t("heroTitle")}</h1>
          <p className="max-w-3xl text-base text-muted-foreground md:text-lg">{t("heroBody")}</p>
          <div className="rounded-2xl border border-border/70 bg-background/70 p-4 md:p-5">
            <SearchBar />
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <article className="kimbundu-surface space-y-3">
            <h2 className="text-2xl">{t("availableNow")}</h2>
            <ul className="space-y-2 text-sm text-foreground/90 md:text-base">
              <li>{t("nowItem1")}</li>
              <li>{t("nowItem2")}</li>
              <li>{t("nowItem3")}</li>
            </ul>
            <div className="flex flex-wrap gap-2 pt-2">
              <Link
                href="/classes"
                className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-primary/10"
              >
                {t("classesLink")}
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-primary/10"
              >
                {t("aboutLink")}
              </Link>
            </div>
          </article>

          <article className="kimbundu-surface space-y-3">
            <h2 className="text-2xl">{t("sourceTitle")}</h2>
            <p className="text-sm text-foreground/90 md:text-base">{t("sourceBody")}</p>
          </article>
        </section>
      </div>
    </Layout>
  );
};

export default IndexPage;
