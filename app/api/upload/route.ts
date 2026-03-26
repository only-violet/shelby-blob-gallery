import { uploadFile } from "@/lib/shelby";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Chuyển đổi file sang Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Tạo key duy nhất bằng timestamp + tên file gốc
    const key = ${Date.now()}-${file.name.replace(/\s+/g, "_")};

    await uploadFile({
      key,
      body: buffer,
      contentType: file.type  "application/octet-stream",
    });

    return NextResponse.json({ 
      success: true, 
      key 
    });
  } catch (error: any) {
    console.error("[API_UPLOAD_ERROR]", error);
    return NextResponse.json(
      { error: error.message  "Internal Server Error" }, 
      { status: 500 }
    );
  }
}
