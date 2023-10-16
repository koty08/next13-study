"use client";

import { useRouter } from "next/navigation";
import Button from "../common/Button";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  const onDeleteClicked = async () => {
    const res = await fetch(`http://localhost:3000/api/post?id=${id}`, { method: "DELETE" }).then((response) => response.json());
    console.log(res);
    if (res.success) {
      router.push("/posts");
      router.refresh();
    }
  };

  return <Button text="삭제" className="w-fit px-2" onClick={onDeleteClicked} />;
}
