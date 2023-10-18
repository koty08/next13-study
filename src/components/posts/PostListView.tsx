import Link from "next/link";
import Pagination from "./Pagination";
import PostCategoryLinks from "./PostCategoryLinks";
import { PostDataResponse } from "@/app/posts/[category]/page";
import { Category } from "@/app/categorys/page";
import { TagsList } from "./TagsInputBox";

export default async function PostListView({ data, categorys }: { data: PostDataResponse; categorys: Category[] | null }) {
  return (
    <div className="flex flex-col gap-8 border-y pt-10 py-4 items-center">
      <PostCategoryLinks categorys={categorys} />
      {data.posts.map((post) => (
        <Link href={`/post/${post.id}`} key={post.id} className="w-1/2 flex flex-col gap-2.5 hover:bg-gray-100 hover:cursor-pointer">
          <div className="flex justify-between border-b-2">
            <div>
              <span>{post.title}</span>
              <span className="text-xs text-gray-400">{` (${post.author})`}</span>
            </div>
            <span>{new Intl.DateTimeFormat("ko", { dateStyle: "short", timeStyle: "short" }).format(new Date(post.register_date))}</span>
          </div>
          <div className="truncate">{post.content}</div>
          {post.tags && <TagsList tags={post.tags.split(",")} />}
        </Link>
      ))}
      <Pagination count={data.count} />
    </div>
  );
}
