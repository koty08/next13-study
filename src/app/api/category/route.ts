import { NextRequest, NextResponse } from "next/server";
import prisma from "../prisma";

export async function GET() {
  const categorys = await prisma.category.findMany({
    include: {
      _count: true,
    },
  });
  return NextResponse.json(
    categorys.map((e) => ({
      id: e.id,
      name: e.name,
      count: e._count.posts,
    }))
  );
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    await prisma.category.create({
      data: body,
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false });
  }
}
