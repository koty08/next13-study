import commonFetch from "@/app/lib/commonFetch";
import { PostData } from "@/app/posts/[category]/page";
import DeleteButton from "@/components/posts/DeleteButton";
import MarkDownViewer from "@/components/posts/MarkDownViewer";
import { TagsList } from "@/components/posts/TagsInputBox";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Post({ params }: { params: { id: string } }) {
  const post = await commonFetch<PostData>("/post", { id: params.id }, { cache: "no-store" });
  // not found handling
  if (!post) return notFound();

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
        <div>{post.tags && <TagsList tags={post.tags.split(",")} />}</div>
        <div className="mt-[30px]">
          <MarkDownViewer content={post.content} />
        </div>
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
