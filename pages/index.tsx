import Link from "next/link";
import Layout from "../components/Layout";
import { SearchBar } from "../components/searchBar";
import { useRouter } from "next/router";

const i18n = {
  greeting: {
    en: "Hello diasporans 👋",
    fr: "Salut les diasporas 👋",
    pt: "Olá diasporos 👋"
  },
  title: {
    en: "Home | 🇦🇴 Online Kimbundu dictionary 🇦🇴",
    fr: "Accueil | 🇦🇴 Dictionnaire Kimbundu en ligne 🇦🇴",
    pt: "Página inicial | 🇦🇴 Dicionário Kimbundu Online 🇦🇴"
  },
}

const IndexPage = () => {
  const router = useRouter();
  const { locale } = router;
  const t = (stringPath: string) => i18n[stringPath][locale];

  return (
    <Layout title={t('title')}>
      <h1>{t('greeting')}</h1>
      <SearchBar />
    </Layout>
  );
};

export default IndexPage;
