import { Articles, OrderBy } from "../../types/articleTypes";

const BASEURL = "https://panda-market-api.vercel.app";

export async function getArticle(
  orderBy: OrderBy,
  pageSize: number,
  keyword: string = ""
) {
  try {
    const params = new URLSearchParams({
      orderBy,
      pageSize: pageSize.toString(),
      keyword,
    });
    const response = await fetch(`${BASEURL}/articles?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const body: Articles = await response.json();
    return body;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    throw error;
  }
}
