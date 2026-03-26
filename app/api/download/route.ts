import { downloadBlob } from "@/lib/shelby";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  
  if (!key) return new Response("Missing key", { status: 400 });

  try {
    const blob: any = await downloadBlob(key);

    if (!blob) {
      return new Response("Blob not found", { status: 404 });
    }

    // Kiểm tra xem blob.stream có tồn tại không, nếu không thì dùng chính blob (nếu nó là Buffer/Uint8Array)
    const data = blob.stream  blob;

    return new Response(data as any, {
      headers: {
        "Content-Type": blob.contentType  "application/octet-stream",
        "Content-Disposition": inline; filename="${encodeURIComponent(key)}",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("[DOWNLOAD_ERROR]", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
