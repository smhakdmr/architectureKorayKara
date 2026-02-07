import { NextResponse } from "next/server";
import sharp from "sharp";
import { v2 as cloudinary } from "cloudinary";
import { verifyRequest } from "@/lib/auth";

const MAX_SIZE_BYTES = 400 * 1024;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const compressToWebp = async (buffer) => {
  const image = sharp(buffer);
  const metadata = await image.metadata();
  const originalWidth = metadata.width || 0;
  const targetWidth = originalWidth > 2000 ? 2000 : originalWidth || null;

  let outputBuffer = await image
    .resize(targetWidth ? { width: targetWidth } : undefined)
    .webp({ quality: 80 })
    .toBuffer();

  const qualitySteps = [75, 70, 65, 60, 55, 50];
  for (const quality of qualitySteps) {
    if (outputBuffer.length <= MAX_SIZE_BYTES) {
      return outputBuffer;
    }
    outputBuffer = await sharp(buffer)
      .resize(targetWidth ? { width: targetWidth } : undefined)
      .webp({ quality })
      .toBuffer();
  }

  const resizeSteps = [1600, 1400, 1200, 1000, 900, 800];
  for (const width of resizeSteps) {
    if (outputBuffer.length <= MAX_SIZE_BYTES) {
      return outputBuffer;
    }
    outputBuffer = await sharp(buffer)
      .resize({ width })
      .webp({ quality: 60 })
      .toBuffer();
  }

  return outputBuffer;
};

const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "architecture-koray",
        resource_type: "image",
        format: "webp",
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      }
    );

    uploadStream.end(buffer);
  });

export async function POST(request) {
  // Yetkilendirme kontrolu
  if (!verifyRequest(request)) {
    return NextResponse.json(
      { error: "Yetkisiz erişim." },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file.arrayBuffer !== "function") {
      return NextResponse.json(
        { error: "Dosya bulunamadı." },
        { status: 400 }
      );
    }

    if (!file.type?.startsWith("image/")) {
      return NextResponse.json(
        { error: "Yalnızca görsel dosyaları yüklenebilir." },
        { status: 400 }
      );
    }

    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return NextResponse.json(
        { error: "Cloudinary bilgileri eksik." },
        { status: 500 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const compressedBuffer = await compressToWebp(buffer);
    const uploadResult = await uploadToCloudinary(compressedBuffer);

    return NextResponse.json({ url: uploadResult.secure_url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        error: "Görsel yüklenemedi.",
        details:
          process.env.NODE_ENV === "development"
            ? error?.message || "Bilinmeyen hata"
            : undefined,
      },
      { status: 500 }
    );
  }
}
