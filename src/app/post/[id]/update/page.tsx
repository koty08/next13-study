import PostForm from "@/components/posts/PostForm";
import { PostData } from "@/components/posts/PostListView";
import { notFound } from "next/navigation";

export default async function UpdatePost({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:3000/api/post?id=${params.id}`, { cache: "no-store" });
  // not found handling
  if (res.status !== 200) return notFound();
  const post: PostData = await res.json();

  return (
    <div className="flex flex-col gap-20 items-center">
      <p className="text-xl font-bold">게시글 수정</p>
      <PostForm type="UPDATE" originalData={post} post_id={params.id} />
    </div>
  );
}
