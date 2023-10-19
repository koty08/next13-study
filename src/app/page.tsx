import PostCardView from "@/components/posts/PostCardView";
import commonFetch from "./lib/commonFetch";
import { notFound } from "next/navigation";
import { PostDataResponse } from "./posts/[category]/page";

export default async function Home() {
  const data = await commonFetch<PostDataResponse>("/posts", undefined, { cache: "no-store" });
  if (!data) notFound();

  return (
    <div className="flex flex-col items-center">
      <h1 className="flex my-[40px] text-2xl font-bold">최신 글</h1>
      <PostCardView data={data} />
    </div>
  );
}
