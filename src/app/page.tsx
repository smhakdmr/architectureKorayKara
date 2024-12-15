"use client";

import Projects from './projects/page'
import Welcome from './welcome/page'
import ContactUs from './contactus/page'
import Services from './services/page'
import { Old_Standard_TT } from 'next/font/google';

const oldStandart = Old_Standard_TT({
  subsets: ['latin'], // Desteklenen karakter kümesi
  weight: ['400', '700'], // Kullanılacak font ağırlıkları
  style: ['normal', 'italic'], // Normal veya italik stiller
  display: 'swap', // Daha iyi yükleme için "swap" kullanılır
});

export default function Home() {

  return (
    <div>
      <main className={oldStandart.className}>
        {/* <Welcome /> */}

        {/* <Services /> */}

        <Projects />

        <ContactUs />
      </main>
    </div>
  );
}
