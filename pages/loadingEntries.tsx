import Layout from "../components/Layout";
import { Placeholder } from "semantic-ui-react";
import EntryPlaceholder from "../components/entryPlaceholder";
import { SearchBar } from "../components/searchBar";

const LoadingEntries = () => {
  return (
    <Layout>
      <Placeholder style={{ marginBottom: 20 }}>
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
