import Link from "next/link";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

const i18n = {
  title: {
    en: "About the Project | Kimbundu Language Archive",
    fr: "A propos du projet | Archive de la langue Kimbundu",
    pt: "Sobre o projeto | Arquivo da lingua Kimbundu",
  },
  heading: {
    en: "About this project",
    fr: "A propos de ce projet",
    pt: "Sobre este projeto",
  },
  mandateTitle: {
    en: "Mandate",
    fr: "Mandat",
    pt: "Mandato",
  },
  mandateBody: {
    en: "kimbundu.org is a public language preservation initiative. Its mandate is to document and publish Kimbundu resources in a form that supports long-term memory, serious study, and practical community use.",
    fr: "kimbundu.org est une initiative publique de preservation linguistique. Son mandat est de documenter et publier des ressources en kimbundu pour la memoire a long terme, l'etude serieuse et l'usage communautaire.",
    pt: "kimbundu.org e uma iniciativa publica de preservacao linguistica. O seu mandato e documentar e publicar recursos em kimbundu para memoria de longo prazo, estudo serio e uso comunitario.",
  },
  whyTitle: {
    en: "Why this work is necessary",
    fr: "Pourquoi ce travail est necessaire",
    pt: "Porque este trabalho e necessario",
  },
  whyBody: {
    en: "Kimbundu carries historical memory, social knowledge, and identity across generations. Building accessible and well-structured materials helps prevent fragmentation and supports future teaching, research, and cultural transmission.",
    fr: "Le kimbundu porte memoire historique, savoir social et identite entre generations. Construire des ressources accessibles et bien structurees limite la fragmentation et soutient enseignement, recherche et transmission culturelle.",
    pt: "O kimbundu transporta memoria historica, conhecimento social e identidade entre geracoes. Construir materiais acessiveis e bem estruturados reduz fragmentacao e apoia ensino, investigacao e transmissao cultural.",
  },
  scopeTitle: {
    en: "Current publication scope",
    fr: "Perimetre actuel de publication",
    pt: "Escopo atual de publicacao",
  },
  scopeItem1: {
    en: "Structured dictionary corpus extracted from historical source material",
    fr: "Corpus de dictionnaire structure extrait de sources historiques",
    pt: "Corpus de dicionario estruturado extraido de fontes historicas",
  },
  scopeItem2: {
    en: "Search and entry pages designed for readability and dependable lookup",
    fr: "Pages de recherche et d'entree concues pour lisibilite et consultation fiable",
    pt: "Paginas de pesquisa e entrada desenhadas para legibilidade e consulta fiavel",
  },
  scopeItem3: {
    en: "Noun class navigation to support grammatical study and learning",
    fr: "Navigation par classes nominales pour etude grammaticale et apprentissage",
    pt: "Navegacao por classes nominais para estudo gramatical e aprendizagem",
  },
  scopeItem4: {
    en: "Visible source metadata and editorial status per entry",
    fr: "Metadonnees de source et statut editorial visibles por entree",
    pt: "Metadados de fonte e estado editorial visiveis por entrada",
  },
  standardsTitle: {
    en: "Editorial standards",
    fr: "Standards editoriaux",
    pt: "Padroes editoriais",
  },
  standardsBody1: {
    en: "Entries are published as soon as they become structurally usable. They are then refined through review, correction, and normalization in successive editorial passes.",
    fr: "Les entrees sont publiees des qu'elles deviennent structurellement utilisables. Elles sont ensuite ameliorees par revision, correction et normalisation en passes editoriales successives.",
    pt: "As entradas sao publicadas assim que se tornam estruturalmente utilizaveis. Depois sao melhoradas por revisao, correcao e normalizacao em passagens editoriais sucessivas.",
  },
  standardsBody2: {
    en: "This approach keeps the archive useful in the present while maintaining a clear path to higher linguistic quality over time.",
    fr: "Cette approche maintient utilite immediate tout en gardant un chemin clair vers meilleure qualite linguistique ao longo du temps.",
    pt: "Esta abordagem mantem utilidade imediata enquanto preserva um caminho claro para maior qualidade linguistica ao longo do tempo.",
  },
  linksTitle: {
    en: "Read next",
    fr: "Lire ensuite",
    pt: "Ler a seguir",
  },
  linkIntro: {
    en: "Introduction to Kimbundu",
    fr: "Introduction ao kimbundu",
    pt: "Introducao ao kimbundu",
  },
  linkDictionary: {
    en: "Open dictionary",
    fr: "Ouvrir le dictionnaire",
    pt: "Abrir dicionario",
  },
};

const AboutPage = () => {
  const router = useRouter();
  const { locale } = router;
  const currentLocale = (locale as "pt" | "fr" | "en") || "en";
  const t = (path: keyof typeof i18n) => i18n[path][currentLocale];

  return (
    <Layout title={t("title")} description={t("mandateBody")}>
      <div className="space-y-6">
        <section className="kimbundu-surface space-y-3">
          <h1 className="kimbundu-section-title">{t("heading")}</h1>
        </section>

        <section className="kimbundu-surface space-y-3">
          <h2 className="text-2xl">{t("mandateTitle")}</h2>
          <p>{t("mandateBody")}</p>
        </section>

        <section className="kimbundu-surface space-y-3">
          <h2 className="text-2xl">{t("whyTitle")}</h2>
          <p>{t("whyBody")}</p>
        </section>

        <section className="kimbundu-surface space-y-3">
          <h2 className="text-2xl">{t("scopeTitle")}</h2>
          <ul className="space-y-2 text-sm text-foreground/90 md:text-base">
            <li>{t("scopeItem1")}</li>
            <li>{t("scopeItem2")}</li>
            <li>{t("scopeItem3")}</li>
            <li>{t("scopeItem4")}</li>
          </ul>
        </section>

        <section className="kimbundu-surface space-y-3">
          <h2 className="text-2xl">{t("standardsTitle")}</h2>
          <p>{t("standardsBody1")}</p>
          <p>{t("standardsBody2")}</p>
        </section>

        <section className="kimbundu-surface space-y-3">
          <h2 className="text-2xl">{t("linksTitle")}</h2>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/kimbundu"
              className="inline-flex items-center rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10"
            >
              {t("linkIntro")}
            </Link>
            <Link
              href="/"
              className="inline-flex items-center rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10"
            >
              {t("linkDictionary")}
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;
