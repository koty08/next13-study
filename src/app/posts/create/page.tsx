import { Category } from "@/app/categorys/page";
import commonFetch from "@/app/lib/commonFetch";
import PostForm from "@/components/posts/PostForm";
import { notFound } from "next/navigation";

export default async function CreatePost() {
  const categorys = await commonFetch<Category[]>("/category", undefined, { cache: "no-store" });
  if (!categorys) notFound();

  return (
    <div className="flex flex-col gap-20 items-center">
      <p className="text-xl font-bold">게시글 생성</p>
      <PostForm type="CREATE" categorys={categorys} />
    </div>
  );
}
