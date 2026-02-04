import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { kv } from "@vercel/kv";

const dataPath = path.join(process.cwd(), "src", "data", "content.json");
const KV_KEY = "content";

const isKvEnabled =
  Boolean(process.env.KV_REST_API_URL) && Boolean(process.env.KV_REST_API_TOKEN);

const readContentFromFile = async () => {
  const file = await fs.readFile(dataPath, "utf-8");
  return JSON.parse(file);
};

const readContent = async () => {
  if (!isKvEnabled) {
    return readContentFromFile();
  }

  const data = await kv.get(KV_KEY);
  if (data) {
    return data;
  }

  const fallback = await readContentFromFile();
  await kv.set(KV_KEY, fallback);
  return fallback;
};

export async function GET() {
  try {
    const content = await readContent();
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json(
      { error: "İçerik okunamadı." },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const content = await request.json();
    if (isKvEnabled) {
      await kv.set(KV_KEY, content);
    } else {
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
          { error: "KV bağlantısı bulunamadı. KV env'lerini kontrol edin." },
          { status: 500 }
        );
      }
      await fs.writeFile(dataPath, JSON.stringify(content, null, 2), "utf-8");
    }
    return NextResponse.json(content);
  } catch (error) {
    console.error("Content save error:", error);
    return NextResponse.json(
      { error: "İçerik kaydedilemedi." },
      { status: 500 }
    );
  }
}
