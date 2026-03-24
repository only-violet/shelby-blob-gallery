import { downloadBlob } from "@/lib/shelby";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  if (!key) return new Response("Missing key", { status: 400 });

  const blob: any = await downloadBlob(key);

  return new Response(blob.stream as any, {
    headers: {
      "Content-Type": blob.contentType || "application/octet-stream",
      "Content-Disposition": inline; filename="${key}",
    },
  });
}
