import type { Metadata } from "next";
import "./globals.css";
import AppShell from "../app/components/AppShell";
import { Roboto, Playfair_Display, Cormorant_Garamond, Lora, Merriweather } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '400', '500', '700'],
  style: ['normal'],
  display: 'swap',
  variable: '--font-body',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-playfair',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-cormorant',
})

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-lora',
})

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-merriweather',
})

export const metadata: Metadata = {
  title: "Tasarım Mimarlık | Plan - Proje - İnşaat - Taahhüt - Tadilat",
  description: "Tasarım Mimarlık, kentsel tasarım kollarında yenilikçi ve ilerici bir düşünce ve zihniyet anlayışını işbirlikçi tasarım uygulamalarıyla yakalama arayışı içinde 2013 yılında kurulmuştur.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${playfair.variable} ${cormorant.variable} ${lora.variable} ${merriweather.variable} ${roboto.className}`}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
