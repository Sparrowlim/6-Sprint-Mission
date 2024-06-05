import React, { useEffect, useState } from "react";
import { Articles } from "../../../types/articleTypes";
import { getArticle } from "../../api/api";
import PostCard from "./PostCard";
import useBreakPoint from "../../../hooks/useBreakPoint";

export async function getStaticProps() {
  const bestPosts: Articles = await getArticle("recent", 3);
  return {
    props: {
      initialArticle: bestPosts,
    },
  };
}

const pageSizeMap = {
  desktop: 3,
  tablet: 2,
  mobile: 1,
};

interface BestPostsProps {
  initialArticle: Articles;
}

const BestPosts = ({ initialArticle }: BestPostsProps) => {
  const [article, setArticle] = useState<Articles | null>(initialArticle);
  const [error, setError] = useState<string | null>(null);
  const { device } = useBreakPoint();
  const articleList = article ? article.list : [];

  useEffect(() => {
    async function fetchArticle() {
      const pageSize = pageSizeMap[device];
      if (pageSize === 0) return;
      try {
        const response: Articles = await getArticle("like", pageSize);
        if (!response) {
          throw new Error("게시물을 찾을 수 없습니다");
        }
        setArticle(response);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("알 수 없는 오류 발생");
        }
      }
    }
    fetchArticle();
  }, [device]);

  useEffect(() => {});

  // if (error) {
  //   alert(`오류: ${error}`);
  // }
  return (
    <>
      <h1 className="font-bold text-20px mb-6">베스트 게시글</h1>
      <div className="flex gap-x-6">
        {articleList.map(
          (article) =>
            article && <PostCard key={article.id} article={article} />
        )}
      </div>
    </>
  );
};

export default BestPosts;
