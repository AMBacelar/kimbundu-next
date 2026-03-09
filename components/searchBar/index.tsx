import { useEffect, useId, useState } from "react";
import { useRouter } from "next/router";
import firebase from "../../utils/firebase";
import { getAnalytics, logEvent } from "firebase/analytics";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  searchTerm?: string;
  disabled?: boolean;
  size?: "default" | "large";
  autoFocus?: boolean;
};

const i18n = {
  placeholder: {
    en: "Search by Kimbundu word or Portuguese definition\u2026",
    fr: "Rechercher par mot kimbundu ou définition portugaise\u2026",
    pt: "Pesquisar por palavra kimbundu ou definição em português\u2026",
  },
  submit: {
    en: "Search",
    fr: "Rechercher",
    pt: "Pesquisar",
  },
  label: {
    en: "Search the dictionary",
    fr: "Rechercher dans le dictionnaire",
    pt: "Pesquisar no dicionário",
  },
};

export const SearchBar = ({
  searchTerm,
  disabled,
  size = "default",
  autoFocus = false,
}: Props) => {
  const [searchText, setSearchText] = useState(searchTerm || "");
  const router = useRouter();
  const { locale } = router;
  const currentLocale = (locale as "pt" | "fr" | "en") || "en";
  const t = (stringPath: keyof typeof i18n) => i18n[stringPath][currentLocale];
  const inputId = useId();

  const [analytics, setAnalytics] = useState<ReturnType<typeof getAnalytics> | null>(null);

  useEffect(() => {
    if (firebase) setAnalytics(getAnalytics(firebase));
  }, []);

  useEffect(() => {
    setSearchText(searchTerm || "");
  }, [searchTerm]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanText = searchText.trim();
    if (!cleanText) return;

    if (analytics) {
      logEvent(analytics, "search", { search_term: cleanText });
    }

    router.push(`/search?term=${encodeURIComponent(cleanText)}`);
  };

  const isLarge = size === "large";

  return (
    <form onSubmit={onSubmit} className="w-full">
      <label htmlFor={inputId} className="sr-only">
        {t("label")}
      </label>
      <div
        className={cn(
          "flex items-center gap-2 rounded-xl border border-border/60 bg-background/90 shadow-sm transition-all focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-ring/20",
          isLarge ? "px-4 py-3 md:px-5 md:py-4" : "px-3 py-2"
        )}
      >
        <Search
          className={cn(
            "shrink-0 text-muted-foreground",
            isLarge ? "size-5" : "size-4"
          )}
          aria-hidden="true"
        />
        <input
          id={inputId}
          type="text"
          placeholder={t("placeholder")}
          name="searchText"
          value={searchText}
          disabled={disabled}
          autoFocus={autoFocus}
          onChange={(e) => setSearchText(e.target.value)}
          className={cn(
            "min-w-0 flex-1 border-none bg-transparent outline-none placeholder:text-muted-foreground/60",
            isLarge ? "text-base md:text-lg" : "text-sm"
          )}
        />
        <button
          type="submit"
          disabled={disabled || !searchText.trim()}
          className={cn(
            "shrink-0 rounded-lg bg-primary font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-40 disabled:hover:bg-primary",
            isLarge ? "px-5 py-2 text-sm md:px-6 md:text-base" : "px-4 py-1.5 text-sm"
          )}
        >
          {t("submit")}
        </button>
      </div>
    </form>
  );
};
