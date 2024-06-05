import React from "react";
import { formatDate } from "../../../utils/utils";
import { Post } from "@/types/articleTypes";
import BestBadge from "../../../public/assets/boards/best_badge.svg";

interface PostCardProps {
  article: Post;
}

const PostCard: React.FC<PostCardProps> = ({ article }) => {
  let date = "";
  if (article?.createdAt) {
    const dateObject = new Date(article.createdAt ?? "");
    date = formatDate(dateObject);
  }
  return (
    <>
      {article && (
        <div className="relative w-[384px] h-[169px] bg-gray-50 rounded-[8px] pt-[30px] px-[24px] pb-[16px]">
          <div className="absolute top-0 left-[24px]">
            <BestBadge />
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex ">
              <div className="text-20px font-semibold text-gray-800">
                {article.title}
              </div>
              {article.image && (
                <div className="w-[72px] h-[72px] py-[14px] px-[12px] rounded-[8px]  border-solid border-[1px] border-gray-200">
                  <img src={article.image} alt={article.title} />
                </div>
              )}
            </div>
            <div className="flex ">
              <div className="text-14px font-normal flex gap-2">
                <div className=" text-gray-600">{article.writer.nickname}</div>
                <div className="text-gray-500 ">{article.likeCount}</div>
              </div>
              <div className="text-14px font-normal text-gray-600 ">{date}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostCard;
