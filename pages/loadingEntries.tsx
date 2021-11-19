import Link from "next/link";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { Placeholder } from "semantic-ui-react";
import EntryPlaceholder from "../components/entryPlaceholder";
import { SearchBar } from "../components/searchBar";

const LoadingEntries = () => {
  return (
    <Layout>
      <Placeholder>
        <Placeholder.Header>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Header>
      </Placeholder>
      <SearchBar />
      <EntryPlaceholder />
      <EntryPlaceholder />
    </Layout>
  );
};

export default LoadingEntries;
