import PostCreateButton from "@/components/posts/PostCreateButton";
import PostListView from "@/components/posts/PostListView";

export default function Posts({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  return (
    <div>
      <div className="flex mb-2 justify-between">
        <div>게시글 목록</div>
        <PostCreateButton />
      </div>
      <PostListView order={searchParams.order as string} page={searchParams.page as string} />
    </div>
  );
}
