import { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

type Props = {
  children?: ReactNode;
  title?: string;
  description?: string;
  image?: string;
};

const i18n = {
  about: {
    en: "About",
    fr: "À propos",
    pt: "Sobre Nós",
  },
  home: {
    en: "Home",
    fr: "Accueil",
    pt: "Pagina inicial",
  },
  defaultDescription: {
    en: "(Soon to be) The first place you should look to learn Kimbundu",
    fr: "(Bientôt) Le premier endroit où vous devriez chercher pour apprendre le Kimbundu",
    pt: "(Em breve) O primeiro lugar que você deve procurar para aprender Kimbundu",
  },
};

const LOCALES = ["pt", "fr", "en"] as const;

const Layout = ({
  children,
  title = "This is the default title",
  description,
}: Props) => {
  const router = useRouter();
  const hostname = "https://www.kimbundu.org/";
  const { pathname, asPath, query, locale } = router;

  const t = (path: string) => i18n[path][locale];
  const trueDescription = description || t("defaultDescription");

  const changeLocale = (lang: string) =>
    router.push({ pathname, query }, asPath, { locale: lang });

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={trueDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${hostname}${router.asPath}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/angola-flag-button-square-icon-256.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`${hostname}${router.asPath}`} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={trueDescription} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-status-bar" content="#90cdf4" />
        <meta property="twitter:image" content="/angola-flag-button-square-icon-256.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="alternate" hrefLang="en" href={`${hostname}en${asPath}`} />
        <link rel="alternate" hrefLang="fr" href={`${hostname}fr${asPath}`} />
        <link rel="alternate" hrefLang="pt" href={`${hostname}pt${asPath}`} />
      </Head>

      <header className="border-b bg-background">
        <nav className="mx-auto flex max-w-4xl items-center gap-6 px-4 py-3">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-foreground",
              pathname === "/" ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {t("home")}
          </Link>
          <Link
            href="/about"
            className={cn(
              "text-sm font-medium transition-colors hover:text-foreground",
              pathname === "/about" ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {t("about")}
          </Link>

          <div className="ml-auto flex items-center gap-1">
            {LOCALES.map((lang) => (
              <button
                key={lang}
                onClick={() => changeLocale(lang)}
                className={cn(
                  "rounded px-2 py-1 text-xs font-semibold uppercase transition-colors hover:bg-muted",
                  locale === lang
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {lang}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6">
        {children}
      </main>

      <footer className="border-t">
        <div className="mx-auto max-w-4xl px-4 py-4 text-sm text-muted-foreground">
          © Adilson Bacelar {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default Layout;
