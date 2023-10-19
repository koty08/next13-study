import { Category } from "@/app/categorys/page";
import commonFetch from "@/app/lib/commonFetch";
import { LinkButton } from "@/components/common/Button";
import PostListView from "@/components/posts/PostListView";
import { notFound } from "next/navigation";

export interface PostData {
  id: number;
  title: string;
  content: string;
  author: string;
  register_date: string;
  views: number;
  categoryId: number;
  tags: string | null;
}

export interface PostDataResponse {
  count: number;
  posts: PostData[];
}

export default async function Posts({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { [key: string]: string | undefined };
}) {
  // SSR 호출
  const category = decodeURI(params.category);
  const data = await commonFetch<PostDataResponse>(
    "/posts",
    { order: searchParams.order, page: searchParams.page, category: category },
    { cache: "no-store" }
  );
  const categorys = await commonFetch<Category[]>("/category", undefined, { cache: "no-store" });
  if (!data || !categorys || !categorys.map((c) => c.name).includes(category)) notFound();

  return (
    <div>
      <h1 className="flex text-2xl mb-5 justify-center">{category}</h1>
      <PostListView data={data} categorys={categorys} />
    </div>
  );
}
