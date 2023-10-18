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
      <div className="flex mb-2 justify-between">
        <div>{category}</div>
        <div className="flex gap-3">
          <LinkButton text="게시글 생성" href="/posts/create" />
          <LinkButton text="카테고리 수정" href="/categorys" />
        </div>
      </div>
      <PostListView data={data} categorys={categorys} />
    </div>
  );
}
