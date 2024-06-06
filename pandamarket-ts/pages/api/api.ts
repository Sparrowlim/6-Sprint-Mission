import instance from "./axiosInstance";
import { Articles, OrderBy, Post } from "../../types/articleTypes";
const BASEURL = process.env.NEXT_PUBLIC_REACT_APP_BASE_URL;

//base GET 선언부
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

// base POST 선언부
export async function POST<T>(
  endpoint: string,
  body?: Record<string, string>,
): Promise<T> {
  try {
    const response = await instance.post<T>(endpoint, body);
    if (response.status !== 200) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    throw error;
  }
}

/**자유게시판 게시글 list 조회  */
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

/** 자유게시판 단일 게시글 조회 */
export async function getArticleById(id: string) {
  return await GET<Post>(`/articles/${id}`);
}

/** 자유게시판 댓글 생성 */
export async function postArticleComment(
  articleId: string,
  content: Record<string, string>,
) {
  return await POST(`/articles/${articleId}/comments`, content);
}
