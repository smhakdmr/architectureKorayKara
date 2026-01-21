import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "src", "data", "content.json");

const readContent = async () => {
  const file = await fs.readFile(dataPath, "utf-8");
  return JSON.parse(file);
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
    await fs.writeFile(dataPath, JSON.stringify(content, null, 2), "utf-8");
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json(
      { error: "İçerik kaydedilemedi." },
      { status: 500 }
    );
  }
}
