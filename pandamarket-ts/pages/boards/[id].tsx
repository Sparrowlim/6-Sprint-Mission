import React, { useEffect, useState } from "react";
import { getArticleById } from "../api/api";
import { useRouter } from "next/router";
import { Post } from "@/types/articleTypes";
import { th } from "date-fns/locale";

const PostContent = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;
  let stringId = "";
  if (Array.isArray(id)) {
    stringId = id[0];
  } else if (typeof id === "string") {
    stringId = id;
  } else {
    throw new Error("id is not string");
  }
  useEffect(() => {
    async function fetchArticle() {
      if (id) {
        try {
          const response = await getArticleById(stringId);
          if (!response) {
            throw new Error("게시물을 찾을 수 없습니다");
          }
          setPost(response);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("알 수 없는 오류 발생");
          }
        }
      }
    }
    fetchArticle();
  }, [id]);
  console.log(post);
  return <div>[id]</div>;
};

export default PostContent;
