import Layout from "../components/Layout";
import { useRouter } from "next/router";

const i18n = {
  greeting: {
    en: "This is the about page",
    fr: "Ceci est la page à propos",
    pt: "Esta é a página sobre",
    kmb: "O site yiyi ya lungu n'etu",
  },
  body: {
    en: "This is an ongoing project to help build a resource that will help the decendants of the Ambundu people learn and keep the Kimbundu language alive",
    fr: "Il s'agit d'un projet en cours pour aider à créer une ressource qui aidera les descendants du peuple Ambundu à apprendre et à garder la langue Kimbundu vivante.",
    pt: "Este é um projeto em andamento para ajudar a construir um recurso que ajudará os descendentes do povo Ambundu a aprender e manter viva a língua Kimbundu.",
    kmb: "Boba o mitutu twamimutela kukwafekesa kutunga o kima kyandakwafesa o alawula Ambundu andala kudilonga ni kulayesao dizwi dya Kimbundu. ",
  },
  about: {
    en: "About",
    fr: "À propos",
    pt: "Sobre Nós",
    kmb: "Ya Lungu n'Etu",
  },
  title: {
    en: "About | 🇦🇴 Online Kimbundu dictionary 🇦🇴",
    fr: "À propos | 🇦🇴 Dictionnaire Kimbundu en ligne 🇦🇴",
    pt: "Sobre Nós | 🇦🇴 Dicionário Kimbundu Online 🇦🇴",
    kmb: "Kulunga ni Etu | 🇦🇴 Dicionário ya Kimbundu Online 🇦🇴",
  },
};

const AboutPage = () => {
  const router = useRouter();
  const { locale } = router;
  const t = (path: string) => i18n[path][locale];
  return (
    <Layout title={t("title")}>
      <h1>{t("about")}</h1>
      <p>{t("greeting")}</p>
      <p>{t("body")}</p>
    </Layout>
  );
};

export default AboutPage;
