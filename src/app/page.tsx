"use client";

import Projects from './projects/page'
import ContactUs from './contactus/page'
import { Box } from '@mui/material';
import WelcomeBox from "../app/components/WelcomeBox";

export default function Home() {

  return (
    <main>
      <WelcomeBox />

      <Box sx={{ display: 'flex', justifyContent: 'center', py: { xs: 5, sm: 6 } }}>
        <div className="section-divider" />
      </Box>

      <Projects />

      <Box sx={{ display: 'flex', justifyContent: 'center', py: { xs: 5, sm: 6 } }}>
        <div className="section-divider" />
      </Box>

      <ContactUs />
    </main>
  );
}
