import { NextRequest, NextResponse } from "next/server";
import prisma from "../prisma";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({}, { status: 404 });
  }

  try {
    const post = await prisma.posts.update({
      where: {
        id: Number(id),
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    if (post !== null) {
      return NextResponse.json(post);
    } else {
      return NextResponse.json(null, { status: 500 });
    }
  } catch {
    return NextResponse.json(null, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    await prisma.posts.create({
      data: {
        ...body,
        register_date: new Date().toISOString(),
        views: 0,
      },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false });
  }
}

export async function PUT(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({}, { status: 404 });
  }
  const body = await request.json();

  try {
    await prisma.posts.update({
      where: {
        id: Number(id),
      },
      data: body,
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false });
  }
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({}, { status: 404 });
  }

  try {
    await prisma.posts.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false });
  }
}
