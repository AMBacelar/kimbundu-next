import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { ClassCard } from "../../components/classCard";

const i18n = {
  greeting: {
    en: "This is the classes page",
    fr: "Ceci est la page des cours",
    pt: "Esta é a página das aulas",
  },
  body: {
    en: "To make organising the words easier, the Kimbundu language has categorised the words into multiple classes to make classifying the words easier",
    fr: "Pour faciliter l'organisation des mots, la langue Kimbundu a classé les mots en plusieurs classes pour faciliter la classification des mots.",
    pt: "Para facilitar a organização das palavras, a língua Kimbundu categorizou as palavras em várias classes para facilitar a classificação das palavras",
  },
  classes: {
    en: "Classes",
    fr: "Des classes",
    pt: "Classes de palavras",
  },
  title: {
    en: "The Classes of Kimbundu | 🇦🇴 Online Kimbundu dictionary 🇦🇴",
    fr: "Les Classes du Kimbundu | 🇦🇴 Dictionnaire Kimbundu en ligne 🇦🇴",
    pt: "As Classes de Kimbundu | 🇦🇴 Dicionário Kimbundo Online 🇦🇴",
  },
};

const classIndexes = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const ClassesPage = () => {
  const router = useRouter();
  const { locale } = router;
  const t = (path: string) => i18n[path][locale];
  return (
    <Layout title={t("title")}>
      <h1>{t("classes")}</h1>
      <p>{t("body")}</p>
      {classIndexes.map((index) => (
        <ClassCard classIndex={index} />
      ))}
    </Layout>
  );
};

export default ClassesPage;
