import React, { useEffect, useState } from "react";
import { getArticleById } from "../api/api";
import { useRouter } from "next/router";
import { Post } from "@/types/articleTypes";
import Profile from "../../public/assets/ui/ic_profile.svg";
import Heart from "../../public/assets/icon/ic_heart.svg";
import { formatDate } from "../../utils/utils";
import { GetServerSideProps } from "next";
import Layout from "@/components/UI/Layout";
import AddComment from "./components/AddComment";
import CommentList from "./components/CommentList";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  if (typeof id !== "string") {
    return {
      notFound: true,
    };
  }
  const initialPost = await getArticleById(id);
  if (!initialPost) {
    return {
      notFound: true,
    };
  }
  return {
    props: { initialPost },
  };
};

interface PostContentProps {
  initialPost: Post;
}

const PostContent = ({ initialPost }: PostContentProps) => {
  const [post, setPost] = useState<Post>(initialPost);
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

  let date = "";
  if (post?.createdAt) {
    const dateObject = new Date(post.createdAt);
    date = formatDate(dateObject);
  }

  return (
    <Layout>
      <div className="mb-[64px] flex flex-col gap-[16px] pt-[33px]">
        <div className="flex flex-col gap-[16px]">
          <div className="text-[20px] font-bold text-gray-800">
            {post?.title}
          </div>
          <div className="flex h-[24px]">
            <div className="flex items-center gap-[8px] pr-[16px]">
              <Profile width="24" height="24" />
              <div className="text-[14px] font-normal text-gray-600">
                {post?.writer.nickname}
              </div>
              <div className="text-[12px] font-normal text-gray-400">
                {date}
              </div>
            </div>
            <div className="flex items-center gap-[6px] border-l border-l-gray-200 pl-[16px]">
              <Heart width="20" height="17" viewBox="-2 -1 20 17" />
              <div className="text-[14px] font-normal text-gray-500">
                {post?.likeCount}
              </div>
            </div>
          </div>
          <hr />
        </div>
        <div className="text-[16px] font-normal text-gray-800">
          {post?.content}
        </div>
      </div>
      <AddComment currentId={id} />
      <CommentList currentId={id} />
    </Layout>
  );
};

export default PostContent;
