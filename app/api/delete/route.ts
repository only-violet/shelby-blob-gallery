import { deleteFile } from "@/lib/shelby";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { key } = await req.json();

    if (!key) {
      return NextResponse.json({ error: "Missing file key" }, { status: 400 });
    }

    const success = await deleteFile(key);

    if (!success) {
      return NextResponse.json({ error: "Failed to delete file from Shelby" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, key });
  } catch (error: any) {
    console.error("[API_DELETE_ERROR]", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" }, 
      { status: 500 }
    );
  }
}
