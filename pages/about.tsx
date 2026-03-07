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
  missionTitle: {
    en: "Mission",
    fr: "Mission",
    pt: "Missao",
  },
  missionBody: {
    en: "kimbundu.org is a digital preservation effort focused on documenting, sharing, and teaching Kimbundu through high-quality public resources.",
    fr: "kimbundu.org est un effort de preservation numerique pour documenter, partager et enseigner le kimbundu via des ressources publiques de qualite.",
    pt: "kimbundu.org e um esforco de preservacao digital para documentar, partilhar e ensinar kimbundu com recursos publicos de qualidade.",
  },
  nowTitle: {
    en: "What is already available",
    fr: "Ce qui est deja disponible",
    pt: "O que ja esta disponivel",
  },
  nowItem1: {
    en: "A structured dictionary corpus extracted from historical source material.",
    fr: "Un corpus de dictionnaire structure extrait de materiaux historiques.",
    pt: "Um corpus de dicionario estruturado extraido de material historico.",
  },
  nowItem2: {
    en: "Search and entry pages with source-aware metadata and editorial status indicators.",
    fr: "Pages de recherche et d'entree avec metadonnees de source et statut editorial.",
    pt: "Paginas de pesquisa e entrada com metadados de origem e estado editorial.",
  },
  nowItem3: {
    en: "Noun class browsing to support linguistic structure and learning.",
    fr: "Navigation par classes nominales pour soutenir la structure linguistique et l'apprentissage.",
    pt: "Navegacao por classes nominais para apoiar estrutura linguistica e aprendizagem.",
  },
  processTitle: {
    en: "Editorial process",
    fr: "Processus editorial",
    pt: "Processo editorial",
  },
  processBody: {
    en: "Entries are published as soon as they are structurally usable. Refinement, correction, and enrichment continue over time to improve linguistic quality and educational value.",
    fr: "Les entrees sont publiees des qu'elles sont structurellement utilisables. La correction et l'enrichissement se poursuivent pour renforcer la qualite linguistique et pedagogique.",
    pt: "As entradas sao publicadas assim que estao estruturalmente utilizaveis. Correcao e enriquecimento continuam ao longo do tempo para elevar qualidade linguistica e pedagogica.",
  },
};

const AboutPage = () => {
  const router = useRouter();
  const { locale } = router;
  const currentLocale = (locale as "pt" | "fr" | "en") || "en";
  const t = (path: keyof typeof i18n) => i18n[path][currentLocale];

  return (
    <Layout title={t("title")} description={t("missionBody")}>
      <div className="space-y-6">
        <section className="kimbundu-surface space-y-3">
          <h1 className="kimbundu-section-title">{t("heading")}</h1>
          <h2 className="text-2xl">{t("missionTitle")}</h2>
          <p>{t("missionBody")}</p>
        </section>

        <section className="kimbundu-surface space-y-3">
          <h2 className="text-2xl">{t("nowTitle")}</h2>
          <ul className="space-y-2 text-sm text-foreground/90 md:text-base">
            <li>{t("nowItem1")}</li>
            <li>{t("nowItem2")}</li>
            <li>{t("nowItem3")}</li>
          </ul>
        </section>

        <section className="kimbundu-surface space-y-3">
          <h2 className="text-2xl">{t("processTitle")}</h2>
          <p>{t("processBody")}</p>
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;
