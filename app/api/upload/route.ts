import { uploadFile } from "@/lib/shelby";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const key = ${Date.now()}-${file.name};

  await uploadFile({
    key,
    body: buffer,
    contentType: file.type
  });

  return NextResponse.json({ key });
}
