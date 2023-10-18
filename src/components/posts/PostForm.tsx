"use client";

import { useRouter } from "next/navigation";
import Button from "../common/Button";
import useForm from "@/hooks/useForm";
import { Category } from "@/app/categorys/page";
import commonFetch from "@/app/lib/commonFetch";
import { useState } from "react";
import TagsInputBox from "./TagsInputBox";
import { PostData } from "@/app/posts/[category]/page";

interface PostPayload {
  title: string;
  content: string;
  author: string;
  categoryId: number;
}

interface PostFormProps {
  type: "CREATE" | "UPDATE";
  post_id?: string;
  originalData?: PostData;
  categorys: Category[];
}

export default function PostForm({ type, post_id, originalData, categorys }: PostFormProps) {
  const router = useRouter();
  const { values, errors, isLoading, handleChange, handleSubmit } = useForm<PostPayload>({
    initialVal: originalData
      ? originalData
      : {
          title: "",
          author: "",
          content: "",
          categoryId: 1,
        },
    onSubmit: async (values) => {
      const res = await commonFetch<{ success: boolean }>(type === "CREATE" ? "/post" : `/post?id=${post_id}`, undefined, {
        method: type === "CREATE" ? "POST" : "PUT",
        body: JSON.stringify({
          ...values,
          tags: tags.join(","),
        }),
      });
      if (res && res.success) {
        router.push("/posts");
        router.refresh();
      }
    },
    validator: PostValidator,
  });
  const [tags, setTags] = useState<string[]>(originalData?.tags ? originalData.tags.split(",") : []);

  return (
    <div className="w-1/2 border p-5 flex flex-col gap-2">
      <DefaultInput label="제목" name="title" value={values.title} handleChange={handleChange} error={errors?.title} />
      <DefaultInput label="작성자" name="author" value={values.author} handleChange={handleChange} error={errors?.author} />
      <label className="block">
        <span className="block font-bold text-slate-700">내용</span>
        <textarea
          name="content"
          value={values.content}
          maxLength={1000}
          className="w-full h-[200px] mt-1 px-2 py-1 appearance-none border border-teal-400 shadow-sm rounded resize-none focus:outline-none focus:border-teal-500"
          onChange={handleChange}
        />
        <p className="text-red-600 font-bold text-sm">{errors?.content}</p>
      </label>
      <div className="block">
        <span className="block font-bold text-slate-700">카테고리</span>
        <select name="categoryId" value={values.categoryId} onChange={handleChange} className="mt-1 border border-teal-400">
          {categorys.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <TagsInputBox tags={tags} setTags={setTags} />
      <div className="flex mt-2 gap-2 justify-end">
        <Button text={type === "CREATE" ? "생성" : "수정"} onClick={handleSubmit} className="w-fit" disabled={isLoading} />
        <Button text="뒤로가기" onClick={() => router.back()} className="w-fit" />
      </div>
    </div>
  );
}

function DefaultInput({
  label,
  name,
  value,
  handleChange,
  error,
}: {
  label: string;
  name: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | undefined;
}) {
  return (
    <label className="block">
      <span className="block font-bold text-slate-700">{label}</span>
      <input
        name={name}
        value={value}
        className="w-full mt-1 px-2 py-1 appearance-none border border-teal-400 shadow-sm rounded focus:outline-none focus:border-teal-500"
        onChange={handleChange}
      />
      <p className="text-red-600 font-bold text-sm">{error}</p>
    </label>
  );
}

function PostValidator({ title, author, content }: PostPayload) {
  const errors: Record<keyof PostPayload, string> = {
    title: "",
    author: "",
    content: "",
    categoryId: "",
  };

  if (!title) {
    errors.title = "제목을 입력해주세요!";
  }

  if (!author) {
    errors.author = "작성자를 입력해주세요!";
  }

  if (!content) {
    errors.content = "내용을 입력해주세요!";
  }

  return errors;
}
