import BestPosts from "./components/BestPosts";
import AllPost from "./components/AllPost";
import { Articles } from "@/types/articleTypes";
import Layout from "@/components/UI/Layout";
interface IndexProps {
  initialBestArticle: Articles;
  initialAllArticle: Articles;
}
const index: React.FC<IndexProps> = ({
  initialAllArticle,
  initialBestArticle,
}) => {
  return (
    <Layout>
      <BestPosts initialArticle={initialBestArticle} />
      <AllPost initialArticle={initialAllArticle} />
    </Layout>
  );
};

export default index;
