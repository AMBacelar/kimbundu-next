import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { ClassCard } from "../../components/classCard";

const i18n = {
  body: {
    en: "Kimbundu noun classes help organize meaning and agreement. Use this section to browse vocabulary grouped by class and study recurring prefix patterns.",
    fr: "Les classes nominales du kimbundu structurent le sens et l'accord. Cette section permet de parcourir le vocabulaire par classe et d'etudier les prefixes.",
    pt: "As classes nominais do kimbundu organizam sentido e concordancia. Esta secao permite navegar vocabulario por classe e estudar padroes de prefixo.",
  },
  classes: {
    en: "Noun Classes",
    fr: "Classes nominales",
    pt: "Classes nominais",
  },
  title: {
    en: "Kimbundu Noun Classes | Kimbundu Dictionary",
    fr: "Classes nominales du kimbundu | Dictionnaire Kimbundu",
    pt: "Classes nominais do kimbundu | Dicionario Kimbundu",
  },
  kicker: {
    en: "Dictionary structure",
    fr: "Structure du dictionnaire",
    pt: "Estrutura do dicionario",
  },
};

const classIndexes = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const ClassesPage = () => {
  const router = useRouter();
  const { locale } = router;
  const currentLocale = (locale as "pt" | "fr" | "en") || "en";
  const t = (path: keyof typeof i18n) => i18n[path][currentLocale];

  return (
    <Layout title={t("title")} description={t("body")}>
      <div className="space-y-6">
        <section className="kimbundu-surface space-y-3">
          <p className="kimbundu-kicker">{t("kicker")}</p>
          <h1 className="kimbundu-section-title">{t("classes")}</h1>
          <p className="max-w-3xl text-muted-foreground">{t("body")}</p>
        </section>

        <section>
          {classIndexes.map((index) => (
            <ClassCard key={index} classIndex={index} />
          ))}
        </section>
      </div>
    </Layout>
  );
};

export default ClassesPage;
