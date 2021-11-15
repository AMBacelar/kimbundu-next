import React, { useState } from "react";
import { Form, Radio } from "semantic-ui-react";
import { useRouter } from "next/router";

type Props = {
  searchTerm?: string;
};

export const SearchBar = ({ searchTerm }: Props) => {
  const [searchText, setSearchText] = useState(searchTerm || "");
  const [searchField, setSearchField] = useState("kimbundu");

  const router = useRouter();

  const onSubmit = () => {
    let url = `/search?term=${searchText}&destination=${searchField}`;
    router.push(url);
  };
  return (
    <>
      <p>
        please understand that this search will not use diacritics, so please
        remove them from your search phrase
      </p>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Input
            type="text"
            placeholder={"Search Term"}
            name="searchText"
            value={searchText}
            onChange={(_, { value }) => setSearchText(value)}
          />
          <Form.Button icon="search" />
        </Form.Group>
        <Form.Group inline>
          <label>Search Field:</label>
          <Form.Field
            control={Radio}
            label="Kimbundu Text"
            value="kimbundu"
            checked={searchField === "kimbundu"}
            onChange={() => setSearchField("kimbundu")}
          />
          <Form.Field
            control={Radio}
            label="Portuguese Text"
            value="portuguese"
            checked={searchField === "portuguese"}
            onChange={() => setSearchField("portuguese")}
          />
          <Form.Field
            control={Radio}
            label="English Text"
            value="english"
            checked={searchField === "english"}
            onChange={() => setSearchField("english")}
          />
        </Form.Group>
      </Form>
    </>
  );
};
