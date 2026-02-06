"use client";

import Projects from './projects/page'
import ContactUs from './contactus/page'
import { Roboto } from 'next/font/google';
import WelcomeBox from "../app/components/WelcomeBox";
import ScrollReveal from "../app/components/ScrollReveal";

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '400', '500', '700'],
  style: ['normal'],
  display: 'swap',
})

export default function Home() {

  return (
    <main className={roboto.className}>
      <WelcomeBox />

      <ScrollReveal direction="up" delay={0.1}>
        <Projects />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.15}>
        <ContactUs />
      </ScrollReveal>
    </main>
  );
}
