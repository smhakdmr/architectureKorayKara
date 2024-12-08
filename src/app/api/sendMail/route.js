import nodemailer from 'nodemailer';

export async function POST(req) {
  // Gelen isteğin gövdesini alıyoruz
  const { fullName, email, phone, message } = await req.json();

  try {
    // Nodemailer ile bir transport oluşturuyoruz
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "ilyassemihakdemir@gmail.com",
        pass: "miso rlzd rour jhuk",
      },
    });


    // Gönderilecek e-posta için ayarlar
    const mailOptions = {
      from: "semihman@hotmail.com",
      to: 'ilyassemihakdemir@gmail.com', // Alıcının e-posta adresi
      subject: `Yeni İletişim Formu Mesajı: ${fullName}`,
      text: `Gönderen: ${fullName} \n (${email}) \n Telefon No: ${phone} \n Mesaj:\n${message}`,
    };

    // Mail gönderme işlemi
    await transporter.sendMail(mailOptions);

    // Başarılı yanıt döndürme
    return new Response(JSON.stringify({ message: 'Mail başarıyla gönderildi.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Mail gönderim hatası:', error);
    return new Response(JSON.stringify({ error: 'Mail gönderilirken bir hata oluştu.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
