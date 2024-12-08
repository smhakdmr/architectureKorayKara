"use client";

import Projects from './projects/page'
import Welcome from './welcome/page'
import ContactUs from './contactus/page'

export default function Home() {

  return (
    <div>
      <main>
        <Welcome />

        <Projects />

        <ContactUs />
      </main>
    </div>
  );
}
