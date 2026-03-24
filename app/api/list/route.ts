import { listFiles } from "@/lib/shelby";
import { NextResponse } from "next/server";

export async function GET() {
  const files = await listFiles();
  const mapped = files.map((f) => ({
    ...f,
    url: /api/download?key=${encodeURIComponent(f.key)}
  }));
  return NextResponse.json(mapped);
}
