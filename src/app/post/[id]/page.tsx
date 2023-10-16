import DeleteButton from "@/components/posts/DeleteButton";
import { PostData } from "@/components/posts/PostListView";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Post({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:3000/api/post?id=${params.id}`, { cache: "no-store" });
  // not found handling
  if (res.status !== 200) return notFound();
  const post: PostData = await res.json();

  return (
    <div className="mt-[64px] flex justify-center">
      <div className="w-1/2 flex flex-col gap-5">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <div className="flex gap-2 items-end">
          <h2 className="font-bold">{post.author}</h2>
          <span className="h-fit text-sm text-slate-400">
            {new Intl.DateTimeFormat("ko", { dateStyle: "short", timeStyle: "short" }).format(new Date(post.register_date))}
          </span>
        </div>
        <div>{`${post.views} Views`}</div>
        <div className="mt-[30px] border-l-4 px-3 whitespace-pre-wrap">{post.content}</div>
        <div className="flex gap-2 justify-end">
          <Link
            href={`/post/${params.id}/update`}
            className="w-fit px-2 border cursor-pointer p-1 border hover:border-gray-500 disabled:bg-slate-50 disabled:text-slate-500"
          >
            수정
          </Link>
          <DeleteButton id={params.id} />
        </div>
      </div>
    </div>
  );
}
