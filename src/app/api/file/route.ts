import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";

export async function POST(request: NextRequest) {
  const filename = `image-${Date.now()}.png`;

  try {
    const file = await (await request.blob()).arrayBuffer();
    await fs.writeFile(`./public/${filename}`, Buffer.from(file));
    return NextResponse.json({ success: true, filename: filename });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ success: false });
  }
}
