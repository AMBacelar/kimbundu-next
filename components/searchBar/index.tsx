import React, { useState } from "react";
import { Form, Radio } from "semantic-ui-react";
import { useRouter } from "next/router";

type Props = {
  searchTerm?: string;
};

const i18n = {
  note: {
    en: "please understand that this search will not use diacritics, so please remove them from your search phrase",
    fr: "veuillez comprendre que cette recherche n'utilisera pas de signes diacritiques, veuillez donc les supprimer de votre expression de recherche",
    pt: "por favor, entenda que esta pesquisa não usará sinais diacríticos, portanto, remova-os de sua frase de pesquisa"
  },
  search: {
    en: "Search",
    fr: "Chercher",
    pt: "Procurar"
  },
  searchTerm: {
    en: 'Search Term',
    fr: 'Terme de recherche',
    pt: 'Termo de pesquisa'
  },
  searchField: {
    en: 'Search Field:',
    fr: 'Champ de recherche :',
    pt: 'Campo de Pesquisa:'
  },
  kimSearch: {
    en: 'search in Kimbundu',
    fr: 'rechercher à Kimbundu',
    pt: 'pesquisar em Kimbundu'
  },
  ptSearch: {
    en: 'search in Portuguese',
    fr: 'rechercher en portugais',
    pt: 'pesquisar em portugues'
  },
  frSearch: {
    en: 'search in French',
    fr: 'recherche en français',
    pt: 'pesquisar em francês'
  },
  enSearch: {
    en: 'search in English',
    fr: 'recherche en anglais',
    pt: 'pesquisa em Inglês'
  },
}

export const SearchBar = ({ searchTerm }: Props) => {
  const [searchText, setSearchText] = useState(searchTerm || "");
  const [searchField, setSearchField] = useState("kimbundu");

  const router = useRouter();
  const { locale } = router;
  const t = (stringPath: string) => i18n[stringPath][locale];

  const onSubmit = () => {
    let url = `/search?term=${searchText}&destination=${searchField}`;
    router.push(url);
  };
  return (
    <>
      <p>{t('note')}</p>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Input
            type="text"
            placeholder={t('searchTerm')}
            name="searchText"
            value={searchText}
            onChange={(_, { value }) => setSearchText(value)}
          />
          <Form.Button aria-label="Search" icon="search" />
        </Form.Group>
        <Form.Group inline>
          <label>{t('searchField')}</label>
          <Form.Field
            control={Radio}
            label={t('kimSearch')}
            value="kimbundu"
            checked={searchField === "kimbundu"}
            onChange={() => setSearchField("kimbundu")}
          />
          <Form.Field
            control={Radio}
            label={t('ptSearch')}
            value="portuguese"
            checked={searchField === "portuguese"}
            onChange={() => setSearchField("portuguese")}
          />
          <Form.Field
            control={Radio}
            label={t('frSearch')}
            value="french"
            checked={searchField === "french"}
            onChange={() => setSearchField("french")}
          />
          <Form.Field
            control={Radio}
            label={t('enSearch')}
            value="english"
            checked={searchField === "english"}
            onChange={() => setSearchField("english")}
          />
        </Form.Group>
      </Form>
    </>
  );
};
