import { Category } from "@/app/categorys/page";
import commonFetch from "@/app/lib/commonFetch";
import { PostData } from "@/app/posts/[category]/page";
import PostForm from "@/components/posts/PostForm";
import { notFound } from "next/navigation";

export default async function UpdatePost({ params }: { params: { id: string } }) {
  const post = await commonFetch<PostData>("/post", { id: params.id }, { cache: "no-store" });
  const categorys = await commonFetch<Category[]>(`/category`, undefined, { cache: "no-store" });
  if (!post || !categorys) return notFound();

  return (
    <div className="flex flex-col gap-20 items-center">
      <p className="text-xl font-bold">게시글 수정</p>
      <PostForm type="UPDATE" originalData={post} post_id={params.id} categorys={categorys} />
    </div>
  );
}
