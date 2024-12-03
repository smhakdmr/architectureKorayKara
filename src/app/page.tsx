"use client";

import {
  Box,
} from "@mui/material";
import Projects from './projects/page'
import Welcome from './welcome/page'

export default function Home() {

  return (
    <div>
      <main>
        <Welcome />

        <Projects />
      </main>
    </div>
  );
}
