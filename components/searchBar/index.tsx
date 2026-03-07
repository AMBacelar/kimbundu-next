import { useEffect, useId, useState } from "react";
import { useRouter } from "next/router";
import firebase from "../../utils/firebase";
import { getAnalytics, logEvent } from "firebase/analytics";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

type Props = {
  searchTerm?: string;
  disabled?: boolean;
};

const i18n = {
  note: {
    en: "Search ignores diacritics for now. If your term includes accents, try the plain spelling as well.",
    fr: "La recherche ignore les diacritiques pour l'instant. Essayez aussi une graphie sans accents.",
    pt: "A pesquisa ainda ignora diacriticos. Se houver acentos, tente tambem a forma sem acentos.",
  },
  searchTerm: {
    en: "Search the dictionary",
    fr: "Rechercher dans le dictionnaire",
    pt: "Pesquisar no dicionario",
  },
  submit: {
    en: "Search",
    fr: "Rechercher",
    pt: "Pesquisar",
  },
};

export const SearchBar = ({ searchTerm, disabled }: Props) => {
  const [searchText, setSearchText] = useState(searchTerm || "");
  const router = useRouter();
  const { locale } = router;
  const currentLocale = (locale as "pt" | "fr" | "en") || "en";
  const t = (stringPath: keyof typeof i18n) => i18n[stringPath][currentLocale];
  const inputId = useId();

  const [analytics, setAnalytics] = useState<ReturnType<typeof getAnalytics> | null>(null);

  useEffect(() => {
    setAnalytics(getAnalytics(firebase));
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

  return (
    <div className="space-y-3">
      <label htmlFor={inputId} className="block text-sm font-medium text-foreground">
        {t("searchTerm")}
      </label>
      <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Input
          id={inputId}
          type="text"
          placeholder={t("searchTerm")}
          name="searchText"
          value={searchText}
          disabled={disabled}
          onChange={(e) => setSearchText(e.target.value)}
          className="h-10 rounded-xl bg-background/80 px-3 text-base sm:flex-1"
        />
        <Button
          type="submit"
          disabled={disabled || !searchText.trim()}
          aria-label={t("submit")}
          className="h-10 rounded-xl px-4"
        >
          <Search className="mr-2 size-4" />
          {t("submit")}
        </Button>
      </form>
      <p className="text-sm text-muted-foreground">{t("note")}</p>
    </div>
  );
};
