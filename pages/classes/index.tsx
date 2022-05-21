import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { ClassCard } from "../../components/classCard";

const i18n = {
  greeting: {
    en: "This is the classes page",
    fr: "",
    pt: "",
  },
  body: {
    en: "To make organising the words easier, the Kimbundu language has categorised the words into multiple classes to make classifying the words easier",
    fr: "",
    pt: "",
  },
  classes: {
    en: "Classes",
    fr: "",
    pt: "",
  },
  title: {
    en: "The Classes of Kimbundu | 🇦🇴 Online Kimbundu dictionary 🇦🇴",
    fr: "",
    pt: "",
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
