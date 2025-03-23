"use client";

import Projects from './projects/page'
import ContactUs from './contactus/page'
import { Old_Standard_TT } from 'next/font/google';
import { Oswald } from 'next/font/google';
import { Roboto } from 'next/font/google';
import WelcomeBox from "../app/components/WelcomeBox";

const oldStandart = Old_Standard_TT({
  subsets: ['latin'], // Desteklenen karakter kümesi
  weight: ['400', '700'], // Kullanılacak font ağırlıkları
  style: ['normal', 'italic'], // Normal veya italik stiller
  display: 'swap', // Daha iyi yükleme için "swap" kullanılır
});

const oswald = Oswald({
  subsets: ['latin'], // Desteklenen karakter kümesi
  weight: ['400', '700'], // Kullanılacak font ağırlıkları
  style: ['normal'], // Normal veya italik stiller
  display: 'swap', // Daha iyi yükleme için "swap" kullanılır
})

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
