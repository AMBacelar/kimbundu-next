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
    fr: "A propos",
    pt: "Sobre",
  },
  home: {
    en: "Dictionary",
    fr: "Dictionnaire",
    pt: "Dicionario",
  },
  classes: {
    en: "Noun classes",
    fr: "Classes nominales",
    pt: "Classes nominais",
  },
  translate: {
    en: "Translator beta",
    fr: "Traducteur beta",
    pt: "Tradutor beta",
  },
  language: {
    en: "Language",
    fr: "Langue",
    pt: "Idioma",
  },
  projectTitle: {
    en: "Kimbundu Language Archive",
    fr: "Archive de la langue Kimbundu",
    pt: "Arquivo da lingua Kimbundu",
  },
  projectTagline: {
    en: "Digital preservation, dictionary access, and long-term language stewardship.",
    fr: "Preservation numerique, dictionnaire public, et transmission linguistique.",
    pt: "Preservacao digital, dicionario publico e transmissao linguistica.",
  },
  editorialNotice: {
    en: "Historical dictionary entries are published now and refined continuously through editorial review.",
    fr: "Les entrees historiques sont publiees et ameliorees progressivement par revision editoriale.",
    pt: "As entradas historicas ja estao publicas e continuam em revisao editorial progressiva.",
  },
  defaultDescription: {
    en: "A public Kimbundu language preservation project with searchable historical dictionary data.",
    fr: "Projet public de preservation du kimbundu avec un dictionnaire historique consultable.",
    pt: "Projeto publico de preservacao do kimbundu com dicionario historico pesquisavel.",
  },
  footerContext: {
    en: "Built for long-term Kimbundu language preservation and open access learning.",
    fr: "Concu pour la preservation du kimbundu et un acces public a l'apprentissage.",
    pt: "Construido para preservacao da lingua kimbundu e aprendizagem de acesso publico.",
  },
};

const LOCALES = ["pt", "fr", "en"] as const;

const Layout = ({
  children,
  title = "Kimbundu Language Archive",
  description,
}: Props) => {
  const router = useRouter();
  const hostname = "https://www.kimbundu.org/";
  const { pathname, asPath, query, locale } = router;
  const currentLocale = (locale as "pt" | "fr" | "en") || "en";

  const t = (path: keyof typeof i18n) => i18n[path][currentLocale];
  const trueDescription = description || t("defaultDescription");

  const changeLocale = (lang: string) =>
    router.push({ pathname, query }, asPath, { locale: lang });

  const isDictionaryRoute =
    pathname === "/" || pathname.startsWith("/search") || pathname.startsWith("/word");

  const navItems = [
    { href: "/", label: t("home"), active: isDictionaryRoute },
    { href: "/classes", label: t("classes"), active: pathname.startsWith("/classes") },
    { href: "/about", label: t("about"), active: pathname === "/about" },
    { href: "/translate", label: t("translate"), active: pathname === "/translate" },
  ];

  return (
    <div className="min-h-screen">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={trueDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${hostname}${router.asPath}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={trueDescription} />
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

      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 md:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <Link href="/" className="group space-y-1">
              <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                kimbundu.org
              </p>
              <p className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                {t("projectTitle")}
              </p>
              <p className="max-w-xl text-sm text-muted-foreground">{t("projectTagline")}</p>
            </Link>

            <div className="flex flex-col gap-3 lg:ml-auto lg:items-end">
              <nav className="flex flex-wrap gap-1.5" aria-label="Global">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                      item.active
                        ? "border-primary/40 bg-primary/10 text-foreground"
                        : "border-transparent bg-muted/70 text-muted-foreground hover:border-border hover:bg-card hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-1.5">
                <span className="mr-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  {t("language")}
                </span>
                {LOCALES.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => changeLocale(lang)}
                    className={cn(
                      "rounded-md border px-2 py-1 text-xs font-semibold uppercase transition-colors",
                      currentLocale === lang
                        ? "border-primary/40 bg-primary/10 text-foreground"
                        : "border-transparent text-muted-foreground hover:border-border hover:bg-muted"
                    )}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border/70 bg-accent/45 px-3 py-2 text-xs text-muted-foreground md:text-sm">
            {t("editorialNotice")}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-10">{children}</main>

      <footer className="mt-12 border-t border-border/70 bg-card/50">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 md:flex-row md:items-end md:justify-between md:px-6">
          <div>
            <p className="text-sm font-semibold text-foreground">Kimbundu Language Archive</p>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{t("footerContext")}</p>
          </div>
          <p className="text-sm text-muted-foreground">Copyright Adilson Bacelar {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
