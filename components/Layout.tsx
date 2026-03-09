import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

type Props = {
  children?: ReactNode;
  title?: string;
  description?: string;
  image?: string;
};

const i18n = {
  home: {
    en: "Dictionary",
    fr: "Dictionnaire",
    pt: "Dicionário",
  },
  browse: {
    en: "Browse",
    fr: "Explorer",
    pt: "Explorar",
  },
  classes: {
    en: "Noun Classes",
    fr: "Classes nominales",
    pt: "Classes nominais",
  },
  about: {
    en: "About",
    fr: "À propos",
    pt: "Sobre",
  },
  language: {
    en: "Language",
    fr: "Langue",
    pt: "Idioma",
  },
  menu: {
    en: "Menu",
    fr: "Menu",
    pt: "Menu",
  },
  footerMission: {
    en: "Built for long-term Kimbundu language preservation and open-access learning.",
    fr: "Conçu pour la préservation du kimbundu et un accès public à l'apprentissage.",
    pt: "Construído para preservação da língua kimbundu e aprendizagem de acesso público.",
  },
  defaultDescription: {
    en: "A public Kimbundu language preservation project with searchable historical dictionary data.",
    fr: "Projet public de préservation du kimbundu avec un dictionnaire historique consultable.",
    pt: "Projeto público de preservação do kimbundu com dicionário histórico pesquisável.",
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const changeLocale = (lang: string) =>
    router.push({ pathname, query }, asPath, { locale: lang });

  const isDictionaryRoute =
    pathname === "/" || pathname.startsWith("/search") || pathname.startsWith("/word");

  const navItems = [
    { href: "/", label: t("home"), active: isDictionaryRoute },
    { href: "/browse", label: t("browse"), active: pathname === "/browse" },
    { href: "/classes", label: t("classes"), active: pathname.startsWith("/classes") },
    { href: "/about", label: t("about"), active: pathname === "/about" || pathname === "/kimbundu" },
  ];

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [asPath, currentLocale]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="flex min-h-screen flex-col">
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

      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
          <Link href="/" className="group flex items-baseline gap-2">
            <span className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary md:text-xl">
              kimbundu
            </span>
            <span className="text-xs font-medium tracking-wide text-muted-foreground">.org</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            <nav className="flex items-center gap-0.5" aria-label="Global">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    item.active
                      ? "bg-primary/8 text-foreground"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="ml-3 flex items-center gap-0.5 border-l border-border/40 pl-3">
              {LOCALES.map((lang) => (
                <button
                  key={lang}
                  onClick={() => changeLocale(lang)}
                  className={cn(
                    "rounded-md px-2 py-1.5 text-xs font-semibold uppercase transition-colors",
                    currentLocale === lang
                      ? "bg-primary/10 text-foreground"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  )}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="flex items-center justify-center rounded-lg p-2 text-foreground transition-colors hover:bg-muted/60 md:hidden"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-expanded={isMobileMenuOpen}
            aria-label={t("menu")}
          >
            {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="border-t border-border/40 bg-background/95 backdrop-blur-lg md:hidden">
            <nav className="mx-auto max-w-6xl space-y-1 px-4 py-3" aria-label="Mobile">
              {navItems.map((item) => (
                <Link
                  key={`mobile-${item.href}`}
                  href={item.href}
                  className={cn(
                    "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    item.active
                      ? "bg-primary/8 text-foreground"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="border-t border-border/40 px-4 py-3">
              <p className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {t("language")}
              </p>
              <div className="flex items-center gap-1">
                {LOCALES.map((lang) => (
                  <button
                    key={`mobile-locale-${lang}`}
                    onClick={() => changeLocale(lang)}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-xs font-semibold uppercase transition-colors",
                      currentLocale === lang
                        ? "bg-primary/10 text-foreground"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    )}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-12">
          {children}
        </div>
      </main>

      <footer className="mt-auto border-t border-border/40 bg-card/40">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6">
          <div className="grid gap-8 md:grid-cols-[2fr_1fr_1fr]">
            <div>
              <p className="mb-1 text-base font-bold tracking-tight text-foreground">
                kimbundu<span className="font-normal text-muted-foreground">.org</span>
              </p>
              <p className="max-w-sm text-sm text-muted-foreground">
                {t("footerMission")}
              </p>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold tracking-[0.1em] text-muted-foreground uppercase">
                Navigate
              </p>
              <nav className="flex flex-col gap-2" aria-label="Footer">
                {navItems.map((item) => (
                  <Link
                    key={`footer-${item.href}`}
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold tracking-[0.1em] text-muted-foreground uppercase">
                {t("language")}
              </p>
              <div className="flex flex-col gap-2">
                {LOCALES.map((lang) => (
                  <button
                    key={`footer-locale-${lang}`}
                    onClick={() => changeLocale(lang)}
                    className={cn(
                      "w-fit text-sm transition-colors",
                      currentLocale === lang
                        ? "font-medium text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {lang === "en" ? "English" : lang === "fr" ? "Français" : "Português"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-border/40 pt-6">
            <p className="text-xs text-muted-foreground">
              &copy; Adilson Bacelar {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
