import Link from "next/link";

export default function Pagination({ page, count }: { page: number; count: number }) {
  const calcPage = Math.floor(count / 8);
  if (isNaN(page)) page = 1;

  return (
    <div className="flex gap-3">
      {[...Array(calcPage + 1).keys()].map((e) => {
        const idx = e + 1;
        return (
          <Link
            href={`/posts?page=${idx}`}
            key={idx}
            className={`hover:font-bold hover:underline decoration-2 ${page === idx && "font-bold underline"}`}
          >
            {idx}
          </Link>
        );
      })}
    </div>
  );
}
