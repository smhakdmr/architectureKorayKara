"use client";

import Projects from './projects/page'
import ContactUs from './contactus/page'
import { Roboto } from 'next/font/google';
import WelcomeBox from "../app/components/WelcomeBox";

const roboto = Roboto({
  subsets: ['latin'], // Desteklenen karakter kümesi
  weight: ['100', '400', '500', '700'], // Kullanılacak font ağırlıkları
  style: ['normal'], // Normal veya italik stiller
  display: 'swap', // Daha iyi yükleme için "swap" kullanılır
})

export default function Home() {

  return (
    <main className={roboto.className}>
      <WelcomeBox />

      <Projects />

      <ContactUs />
    </main>
  );
}
