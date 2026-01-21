import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "public", "uploads");

const ensureUploadDir = async () => {
  await fs.mkdir(uploadDir, { recursive: true });
};

const getFileName = (originalName) => {
  const extension = path.extname(originalName || "").toLowerCase();
  const safeExtension = extension && extension.length <= 10 ? extension : "";
  const timestamp = Date.now();
  const randomPart = Math.random().toString(16).slice(2);
  return `upload-${timestamp}-${randomPart}${safeExtension}`;
};

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file.arrayBuffer !== "function") {
      return NextResponse.json(
        { error: "Dosya bulunamadı." },
        { status: 400 }
      );
    }

    await ensureUploadDir();
    const fileName = getFileName(file.name);
    const filePath = path.join(uploadDir, fileName);
    const buffer = Buffer.from(await file.arrayBuffer());

    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ url: `/uploads/${fileName}` });
  } catch (error) {
    return NextResponse.json(
      { error: "Görsel yüklenemedi." },
      { status: 500 }
    );
  }
}
