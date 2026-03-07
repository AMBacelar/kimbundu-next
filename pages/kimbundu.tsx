import Link from "next/link";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

const i18n = {
  title: {
    en: "About Kimbundu | Kimbundu Language Archive",
    fr: "A propos du kimbundu | Archive de la langue Kimbundu",
    pt: "Sobre o kimbundu | Arquivo da lingua Kimbundu",
  },
  heading: {
    en: "Introduction to Kimbundu",
    fr: "Introduction ao kimbundu",
    pt: "Introducao ao kimbundu",
  },
  summary: {
    en: "A concise public introduction for visitors new to Kimbundu language, people, and cultural context.",
    fr: "Une introduction publique concise pour les visiteurs qui decouvrent langue, peuple et contexte culturel kimbundu.",
    pt: "Uma introducao publica concisa para visitantes que estao a conhecer lingua, povo e contexto cultural kimbundu.",
  },
  languageTitle: {
    en: "Language profile",
    fr: "Profil linguistique",
    pt: "Perfil linguistico",
  },
  languageBody1: {
    en: "Kimbundu is a Bantu language of Angola with deep historical continuity and living contemporary usage.",
    fr: "Le kimbundu est une langue bantoue d'Angola, avec profonde continuite historique et usage contemporain vivant.",
    pt: "Kimbundu e uma lingua banta de Angola, com continuidade historica profunda e uso contemporaneo vivo.",
  },
  languageBody2: {
    en: "Its noun class system is central to grammatical agreement and meaning structure, and is essential for both linguistic study and practical learning.",
    fr: "Son systeme de classes nominales est central pour l'accord grammatical et la structure du sens, essentiel pour etude linguistique et apprentissage pratique.",
    pt: "O sistema de classes nominais e central para concordancia gramatical e estrutura de significado, essencial para estudo linguistico e aprendizagem pratica.",
  },
  peopleTitle: {
    en: "People and continuity",
    fr: "Peuple et continuite",
    pt: "Povo e continuidade",
  },
  peopleBody1: {
    en: "Kimbundu is associated with Ambundu-speaking communities and with long historical processes across what is now Angola, including urban and rural transmission over many generations.",
    fr: "Le kimbundu est associe aux communautes ambundu et a de longs processus historiques dans l'Angola actuel, avec transmission urbaine et rurale sur plusieurs generations.",
    pt: "O kimbundu esta associado a comunidades ambundu e a longos processos historicos na Angola atual, com transmissao urbana e rural ao longo de muitas geracoes.",
  },
  peopleBody2: {
    en: "Preserving the language therefore means preserving memory, identity, and shared social knowledge.",
    fr: "Preserver la langue signifie donc preserver memoire, identite et connaissance sociale partagee.",
    pt: "Preservar a lingua significa, portanto, preservar memoria, identidade e conhecimento social partilhado.",
  },
  cultureTitle: {
    en: "Culture and expression",
    fr: "Culture et expression",
    pt: "Cultura e expressao",
  },
  cultureBody: {
    en: "Kimbundu has lived through oral tradition, family transmission, spirituality, music, storytelling, and daily speech. A credible archive must eventually connect lexical data with these wider cultural forms.",
    fr: "Le kimbundu vit par tradition orale, transmission familiale, spiritualite, musique, recit et parole quotidienne. Une archive credible doit relier donnees lexicales et formes culturelles plus larges.",
    pt: "O kimbundu vive por tradicao oral, transmissao familiar, espiritualidade, musica, narrativa e fala quotidiana. Um arquivo credivel deve ligar dados lexicais e formas culturais mais amplas.",
  },
  archiveTitle: {
    en: "How this archive is built",
    fr: "Comment cette archive est construite",
    pt: "Como este arquivo e construido",
  },
  archiveItem1: {
    en: "Publish dependable dictionary access first",
    fr: "Publier d'abord un acces fiable au dictionnaire",
    pt: "Publicar primeiro um acesso fiavel ao dicionario",
  },
  archiveItem2: {
    en: "Keep source references explicit",
    fr: "Garder explicites les references de source",
    pt: "Manter explicitas as referencias de fonte",
  },
  archiveItem3: {
    en: "Improve entries through continuous editorial review",
    fr: "Ameliorer les entrees par revision editoriale continue",
    pt: "Melhorar entradas por revisao editorial continua",
  },
  archiveItem4: {
    en: "Prepare foundations for future texts, audio, stories, songs, and learning tools",
    fr: "Preparer les bases pour textes, audio, recits, chansons et outils pedagogiques",
    pt: "Preparar bases para textos, audio, historias, cancoes e ferramentas de aprendizagem",
  },
  ctaTitle: {
    en: "Explore the live platform",
    fr: "Explorer la plateforme en ligne",
    pt: "Explorar a plataforma ativa",
  },
  ctaDictionary: {
    en: "Open dictionary",
    fr: "Ouvrir le dictionnaire",
    pt: "Abrir dicionario",
  },
  ctaClasses: {
    en: "Browse noun classes",
    fr: "Parcourir les classes nominales",
    pt: "Navegar classes nominais",
  },
  ctaProject: {
    en: "Read project mandate",
    fr: "Lire le mandat du projet",
    pt: "Ler o mandato do projeto",
  },
};

const KimbunduIntroPage = () => {
  const router = useRouter();
  const { locale } = router;
  const currentLocale = (locale as "pt" | "fr" | "en") || "en";
  const t = (path: keyof typeof i18n) => i18n[path][currentLocale];

  return (
    <Layout title={t("title")} description={t("summary")}>
      <div className="space-y-6">
        <section className="kimbundu-surface space-y-3">
          <h1 className="kimbundu-section-title">{t("heading")}</h1>
          <p>{t("summary")}</p>
        </section>

        <section className="kimbundu-surface space-y-3">
          <h2 className="text-2xl">{t("languageTitle")}</h2>
          <p>{t("languageBody1")}</p>
          <p>{t("languageBody2")}</p>
        </section>

        <section className="kimbundu-surface space-y-3">
          <h2 className="text-2xl">{t("peopleTitle")}</h2>
          <p>{t("peopleBody1")}</p>
          <p>{t("peopleBody2")}</p>
        </section>

        <section className="kimbundu-surface space-y-3">
          <h2 className="text-2xl">{t("cultureTitle")}</h2>
          <p>{t("cultureBody")}</p>
        </section>

        <section className="kimbundu-surface space-y-3">
          <h2 className="text-2xl">{t("archiveTitle")}</h2>
          <ul className="space-y-2 text-sm text-foreground/90 md:text-base">
            <li>{t("archiveItem1")}</li>
            <li>{t("archiveItem2")}</li>
            <li>{t("archiveItem3")}</li>
            <li>{t("archiveItem4")}</li>
          </ul>
        </section>

        <section className="kimbundu-surface space-y-3">
          <h2 className="text-2xl">{t("ctaTitle")}</h2>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/"
              className="inline-flex items-center rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10"
            >
              {t("ctaDictionary")}
            </Link>
            <Link
              href="/classes"
              className="inline-flex items-center rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10"
            >
              {t("ctaClasses")}
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10"
            >
              {t("ctaProject")}
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default KimbunduIntroPage;
