import React, { useState } from "react";
import { Form, Radio } from "semantic-ui-react";
import { useRouter } from "next/router";

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
  search: {
    en: "Search",
    fr: "Chercher",
    pt: "Procurar",
  },
  searchTerm: {
    en: "Search Term",
    fr: "Terme de recherche",
    pt: "Termo de pesquisa",
  },
  searchField: {
    en: "Search Field:",
    fr: "Champ de recherche :",
    pt: "Campo de Pesquisa:",
  },
  kimSearch: {
    en: "search in Kimbundu",
    fr: "rechercher à Kimbundu",
    pt: "pesquisar em Kimbundu",
  },
  ptSearch: {
    en: "search in Portuguese",
    fr: "rechercher en portugais",
    pt: "pesquisar em portugues",
  },
  frSearch: {
    en: "search in French",
    fr: "recherche en français",
    pt: "pesquisar em francês",
  },
  enSearch: {
    en: "search in English",
    fr: "recherche en anglais",
    pt: "pesquisa em Inglês",
  },
};

export const SearchBar = ({ searchTerm, disabled }: Props) => {
  const [searchText, setSearchText] = useState(searchTerm || "");

  const router = useRouter();
  const { locale, query } = router;
  const t = (stringPath: string) => i18n[stringPath][locale];

  const onSubmit = () => {
    let url = `/search?term=${searchText}`;
    router.push(url);
  };
  return (
    <>
      <p>{t("note")}</p>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Input
            type="text"
            placeholder={t("searchTerm")}
            name="searchText"
            value={searchText}
            disabled={disabled}
            onChange={(_, { value }) => setSearchText(value)}
          />
          <Form.Button disabled={disabled} aria-label="Search" icon="search" />
        </Form.Group>
      </Form>
    </>
  );
};
