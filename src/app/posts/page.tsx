import { LinkButton } from "@/components/common/Button";
import PostListView from "@/components/posts/PostListView";
import commonFetch from "../lib/commonFetch";
import { PostDataResponse } from "./[category]/page";
import { notFound } from "next/navigation";
import { Category } from "../categorys/page";

export default async function Posts({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const data = await commonFetch<PostDataResponse>("/posts", { order: searchParams.order, page: searchParams.page }, { cache: "no-store" });
  const categorys = await commonFetch<Category[]>("/category", undefined, { cache: "no-store" });
  if (!data) notFound();

  return (
    <div>
      <div className="flex mb-2 justify-between">
        <div>게시글 목록</div>
        <div className="flex gap-3">
          <LinkButton text="게시글 생성" href="/posts/create" />
          <LinkButton text="카테고리 수정" href="/categorys" />
        </div>
      </div>
      <PostListView data={data} categorys={categorys} />
    </div>
  );
}
