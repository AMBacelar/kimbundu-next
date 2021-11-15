import Link from "next/link";
import Layout from "../components/Layout";
import { SearchBar } from "../components/searchBar";

const IndexPage = () => {
  return (
    <Layout title="Home | Online Kimbundu dictionary">
      <h1>Hello diasporans 👋</h1>
      <SearchBar />
    </Layout>
  );
};

export default IndexPage;
