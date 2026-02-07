import nodemailer from 'nodemailer';

export async function POST(req) {
  const { fullName, email, phone, message } = await req.json();

  // Env degiskenleri kontrolu
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error("SMTP_USER veya SMTP_PASS env degiskenleri tanimli degil.");
    return new Response(
      JSON.stringify({ error: "Sunucu yapilandirma hatasi." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.SMTP_TO || process.env.SMTP_USER,
      subject: `Yeni İletişim Formu Mesajı: ${fullName}`,
      text: `Gönderen: ${fullName}\nE-posta: ${email}\nTelefon: ${phone}\n\nMesaj:\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: 'Mail başarıyla gönderildi.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Mail gönderim hatası:', error);
    return new Response(
      JSON.stringify({ error: 'Mail gönderilirken bir hata oluştu.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
