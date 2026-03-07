import Layout from "../components/Layout";
import EntryPlaceholder from "../components/entryPlaceholder";
import { SearchBar } from "../components/searchBar";

const LoadingEntries = () => {
  return (
    <Layout>
      <div className="mb-5 animate-pulse space-y-2">
        <div className="h-7 w-1/2 rounded bg-muted" />
        <div className="h-4 w-1/3 rounded bg-muted" />
      </div>
      <SearchBar disabled />
      <EntryPlaceholder />
      <EntryPlaceholder />
    </Layout>
  );
};

export default LoadingEntries;
