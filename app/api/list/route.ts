import { listFiles } from "@/lib/shelby";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const files = await listFiles();
    
    const mapped = files.map((f) => ({
      ...f,
      url: /api/download?key=${encodeURIComponent(f.key)}
    }));

    return NextResponse.json(mapped);
  } catch (error) {
    console.error("[API_LIST_ERROR]", error);
    return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 });
  }
}
