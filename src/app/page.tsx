"use client";

import Projects from './projects/page'
import ContactUs from './contactus/page'
import { Box } from '@mui/material';
import WelcomeBox from "../app/components/WelcomeBox";
import ScrollReveal from "../app/components/ScrollReveal";

export default function Home() {

  return (
    <main>
      <WelcomeBox />

      <Box sx={{ display: 'flex', justifyContent: 'center', py: { xs: 5, sm: 6 } }}>
        <div className="section-divider" />
      </Box>

      <ScrollReveal direction="up" delay={0.1}>
        <Projects />
      </ScrollReveal>

      <Box sx={{ display: 'flex', justifyContent: 'center', py: { xs: 5, sm: 6 } }}>
        <div className="section-divider" />
      </Box>

      <ScrollReveal direction="up" delay={0.15}>
        <ContactUs />
      </ScrollReveal>
    </main>
  );
}
