import CategoryCreate from "@/components/categorys/CategoryCreate";
import commonFetch from "../lib/commonFetch";
import { notFound } from "next/navigation";
import CategoryLists from "@/components/categorys/CategoryLists";

export interface Category {
  id: number;
  name: string;
  count: number;
}

export default async function Categorys() {
  const categorys = await commonFetch<Category[]>("/category", undefined, { cache: "no-store" });
  if (!categorys) notFound();

  return (
    <div className="flex flex-col gap-3 items-center">
      <CategoryLists categorys={categorys} />
      <CategoryCreate />
    </div>
  );
}
