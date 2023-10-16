import PostForm from "@/components/posts/PostForm";

export default function CreatePost() {
  return (
    <div className="flex flex-col gap-20 items-center">
      <p className="text-xl font-bold">게시글 생성</p>
      <PostForm type="CREATE" />
    </div>
  );
}
