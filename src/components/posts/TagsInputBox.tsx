"use client";

import { Dispatch, SetStateAction, useState } from "react";

export default function TagsInputBox({ tags, setTags }: { tags: string[]; setTags: Dispatch<SetStateAction<string[]>> }) {
  const [input, setInput] = useState<string>("");

  const onInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setTags((prev) => [...prev, input]);
      setInput("");
    }
  };

  const onTagDelete = (event: React.MouseEvent<HTMLSpanElement>) => {
    const tag = (event.target as HTMLSpanElement).getAttribute("data-text");
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  return (
    <div className="mt-1 flex flex-col gap-3">
      <span className="block font-bold text-slate-700">{"태그 (선택)"}</span>
      <input
        className="w-1/3 px-2 py-1 appearance-none border border-teal-400 shadow-sm rounded focus:outline-none focus:border-teal-500"
        value={input}
        onChange={onInputChanged}
        onKeyDown={onInputKeyDown}
      />
      <TagsList tags={tags} onXClick={onTagDelete} />
    </div>
  );
}

export function TagsList({ tags, onXClick }: { tags: string[]; onXClick?: (event: React.MouseEvent<HTMLElement>) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, i) => (
        <div key={i} className="flex gap-2 items-center border px-2.5 py-2 rounded-2xl bg-teal-100">
          <span>{tag}</span>
          {onXClick && (
            <span data-text={tag} className="text-xs hover:cursor-pointer hover:text-red-500 hover:font-bold" onClick={onXClick}>
              ✕
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
