import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "data", "content.json");

export async function GET() {
  try {
    const raw = await fs.readFile(FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return NextResponse.json({
      mindmap: parsed.mindmap ?? {},
      images: parsed.images ?? {},
    });
  } catch {
    return NextResponse.json({ mindmap: {}, images: {} });
  }
}

export async function POST(req: Request) {
  // Edição só é permitida em desenvolvimento (o filesystem de produção é read-only).
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "A edição só está disponível no localhost (dev)." },
      { status: 403 },
    );
  }
  const body = await req.json();
  const data = {
    mindmap: body?.mindmap ?? {},
    images: body?.images ?? {},
  };
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(data, null, 2) + "\n", "utf-8");
  return NextResponse.json({ ok: true });
}
