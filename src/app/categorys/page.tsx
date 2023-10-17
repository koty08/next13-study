import CategoryCreate from "@/components/categorys/CategoryCreate";
import commonFetch from "../lib/commonFetch";
import { notFound } from "next/navigation";

export interface Category {
  id: number;
  name: string;
  count: number;
}

export default async function Categorys() {
  const categorys = await commonFetch<Category[]>("/category", undefined, { cache: "no-store" });
  if (!categorys) notFound();

  return (
    <div className="flex flex-col gap-2">
      {categorys.map((c) => (
        <div key={c.id} className="w-fit border p-2">
          {c.name}
        </div>
      ))}
      <CategoryCreate />
    </div>
  );
}
