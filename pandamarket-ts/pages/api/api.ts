import instance from "./axiosInstance";
import { Articles, OrderBy, Post } from "../../types/articleTypes";
const BASEURL = process.env.NEXT_PUBLIC_REACT_APP_BASE_URL;

export async function GET<T>(
  endpoint: string,
  params?: Record<string, string | number>,
): Promise<T> {
  try {
    const response = await instance.get<T>(endpoint, { params });

    if (response.status !== 200) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    throw error;
  }
}

export async function getArticles(
  orderBy: OrderBy,
  pageSize: number,
  keyword: string = "",
): Promise<Articles> {
  return await GET<Articles>("/articles", {
    orderBy,
    pageSize,
    keyword,
  });
}

export async function getArticleById(id: string) {
  return await GET<Post>(`/articles/${id}`);
}
