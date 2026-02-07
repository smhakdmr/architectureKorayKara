import { NextResponse } from "next/server";
import { createToken, verifyRequest } from "@/lib/auth";

/**
 * POST /api/auth — Admin girisi
 * Body: { password: string }
 * Basarili: { token: string }
 */
export async function POST(request) {
  try {
    const { password } = await request.json();

    if (!process.env.ADMIN_PASSWORD) {
      console.error("ADMIN_PASSWORD env degiskeni tanimli degil.");
      return NextResponse.json(
        { error: "Sunucu yapılandırma hatası." },
        { status: 500 }
      );
    }

    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Şifre hatalı." },
        { status: 401 }
      );
    }

    const token = createToken();
    return NextResponse.json({ token });
  } catch {
    return NextResponse.json(
      { error: "Giriş işlemi başarısız." },
      { status: 500 }
    );
  }
}

/**
 * GET /api/auth — Token dogrulama
 * Header: Authorization: Bearer <token>
 */
export async function GET(request) {
  const isValid = verifyRequest(request);

  if (!isValid) {
    return NextResponse.json({ valid: false }, { status: 401 });
  }

  return NextResponse.json({ valid: true });
}
