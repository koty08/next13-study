import getImageFromContents from "@/app/lib/getImageFromContent";
import { PostDataResponse } from "@/app/posts/[category]/page";
import Image from "next/image";
import Link from "next/link";

export default async function PostCardView({ data }: { data: PostDataResponse }) {
  return (
    <div className="w-3/4 flex flex-wrap gap-y-[20px] gap-x-[2%] justify-center">
      {data.posts.map((post) => {
        const path = getImageFromContents(post.content);
        return (
          <Link href={`/post/${post.id}`} key={post.id} className="w-[49%] max-w-[550px] p-3 border rounded-lg hover:cursor-pointer">
            <div className="flex justify-center relative w-full h-[200px]">
              {path ? (
                <Image fill src={path} alt="image" style={{ objectFit: "contain" }}></Image>
              ) : (
                <Image fill src={"/no-image.png"} alt="image" style={{ objectFit: "contain" }}></Image>
              )}
            </div>
            <div className="text-sm mt-2">
              {new Intl.DateTimeFormat("ko", { dateStyle: "short", timeStyle: "short" }).format(new Date(post.register_date))}
            </div>
            <h2 className="text-lg font-bold">{post.title}</h2>
          </Link>
        );
      })}
    </div>
  );
}
