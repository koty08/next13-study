import { NextRequest, NextResponse } from "next/server";
import prisma from "../prisma";

export async function GET(request: NextRequest) {
  const order = request.nextUrl.searchParams.get("order");
  const page = Number(request.nextUrl.searchParams.get("page"));
  const posts = await prisma.posts.findMany({
    skip: page ? (page - 1) * 8 : 0,
    take: 8,
    orderBy: {
      register_date: order === "asc" ? "asc" : "desc",
    },
  });
  const count = await prisma.posts.count();
  return NextResponse.json({
    count: count,
    posts: posts,
  });
}
