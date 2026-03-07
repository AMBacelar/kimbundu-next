import { useEffect, useState } from "react";
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
    en: "please understand that this search will not use diacritics, so please remove them from your search phrase",
    fr: "veuillez comprendre que cette recherche n'utilisera pas de signes diacritiques, veuillez donc les supprimer de votre expression de recherche",
    pt: "por favor, entenda que esta pesquisa não usará sinais diacríticos, portanto, remova-os de sua frase de pesquisa",
  },
  searchTerm: {
    en: "Search Term",
    fr: "Terme de recherche",
    pt: "Termo de pesquisa",
  },
};

export const SearchBar = ({ searchTerm, disabled }: Props) => {
  const [searchText, setSearchText] = useState(searchTerm || "");
  const router = useRouter();
  const { locale } = router;
  const t = (stringPath: string) => i18n[stringPath][locale];

  const [analytics, setAnalytics] = useState(null);

  useEffect(() => setAnalytics(getAnalytics(firebase)), []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    logEvent(analytics, "search", { search_term: searchText });
    router.push(`/search?term=${searchText}`);
  };

  return (
    <>
      <p className="mb-3 text-sm text-muted-foreground">{t("note")}</p>
      <form onSubmit={onSubmit} className="flex gap-2">
        <Input
          type="text"
          placeholder={t("searchTerm")}
          name="searchText"
          value={searchText}
          disabled={disabled}
          onChange={(e) => setSearchText(e.target.value)}
          className="max-w-sm"
        />
        <Button type="submit" disabled={disabled} aria-label="Search" size="icon">
          <Search />
        </Button>
      </form>
    </>
  );
};
