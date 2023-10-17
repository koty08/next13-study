"use client";

import { Category } from "@/app/categorys/page";
import { LinkButton } from "../common/Button";
import { useParams } from "next/navigation";

export default function PostCategoryLinks({ categorys }: { categorys: Category[] | null }) {
  const params = useParams();
  const category = decodeURI(params.category as string);

  if (!categorys) return <></>;

  return (
    <div className="flex w-1/2 justify-start gap-3">
      <LinkButton
        href={`/posts`}
        text={"전체"}
        className={`${category === "undefined" && "bg-green-300"}`}
        additionalText={`${categorys.reduce((p, c) => p + c.count, 0)}`}
      />
      {categorys.map((c) => (
        <LinkButton
          key={c.id}
          href={`/posts/${c.name}`}
          text={c.name}
          additionalText={`${c.count}`}
          className={`${category === c.name && "bg-green-300"}`}
        />
      ))}
    </div>
  );
}
