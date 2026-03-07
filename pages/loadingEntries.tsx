import Layout from "../components/Layout";
import EntryPlaceholder from "../components/entryPlaceholder";
import { SearchBar } from "../components/searchBar";

const LoadingEntries = () => {
  return (
    <Layout title="Loading dictionary entries | Kimbundu Dictionary">
      <div className="space-y-6">
        <section className="kimbundu-surface animate-pulse space-y-3">
          <div className="h-4 w-40 rounded bg-muted" />
          <div className="h-9 w-2/3 rounded bg-muted" />
          <div className="h-4 w-1/2 rounded bg-muted" />
          <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
            <SearchBar disabled />
          </div>
        </section>

        <EntryPlaceholder />
        <EntryPlaceholder />
      </div>
    </Layout>
  );
};

export default LoadingEntries;
