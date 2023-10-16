import Link from "next/link";
import Pagination from "./Pagination";

export interface PostData {
  id: number;
  title: string;
  content: string;
  author: string;
  register_date: string;
  views: number;
}

interface PostDataResponse {
  count: number;
  posts: PostData[];
}

export default async function PostListView({ order, page }: { order: string; page: string }) {
  // SSR 호출
  const res = await fetch(`http://localhost:3000/api/posts/?order=${order}&page=${page}`, { cache: "no-store" });
  const data: PostDataResponse = await res.json();

  return (
    <div className="flex flex-col gap-8 border-y pt-10 py-4 items-center">
      {data.posts.map((post) => (
        <Link href={`/post/${post.id}`} key={post.id} className="w-1/2 hover:bg-gray-100 hover:cursor-pointer">
          <div className="flex justify-between border-b-2 mb-2.5">
            <div>
              <span>{post.title}</span>
              <span className="text-xs text-gray-400">{` (${post.author})`}</span>
            </div>
            <span>{new Intl.DateTimeFormat("ko", { dateStyle: "short", timeStyle: "short" }).format(new Date(post.register_date))}</span>
          </div>
          <div className="truncate">{post.content}</div>
        </Link>
      ))}
      <Pagination page={Number(page)} count={data.count} />
    </div>
  );
}
