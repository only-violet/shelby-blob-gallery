import { deleteFile } from "@/lib/shelby";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { key } = await req.json();
  if (!key) return NextResponse.json({ error: "missing key" }, { status: 400 });

  await deleteFile(key);
  return NextResponse.json({ ok: true });
}
