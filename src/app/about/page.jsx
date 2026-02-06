"use client";

import { useEffect, useState } from "react";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import ScrollReveal from "../components/ScrollReveal";

const AboutPage = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [about, setAbout] = useState({
    title: "Hakkımızda",
    description: "",
    image: "",
  });

  useEffect(() => {
    let isMounted = true;

    const loadAbout = async () => {
      try {
        const response = await fetch("/api/content");
        const data = await response.json();
        if (isMounted && data?.about) {
          setAbout((prev) => ({ ...prev, ...data.about }));
        }
      } catch (error) {
        if (isMounted) {
          setAbout((prev) => prev);
        }
      }
    };

    loadAbout();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Container maxWidth="lg" sx={{ paddingTop: { xs: 3, sm: 4 }, paddingBottom: { xs: 5, sm: 8 } }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 3, sm: 5 }, padding: { xs: 2, sm: 4 } }}>
        <ScrollReveal direction="up">
          <Typography
            variant={isSmallScreen ? "h4" : "h3"}
            sx={{ fontFamily: "inherit", color: 'var(--color-dark)', letterSpacing: '0.03em' }}
          >
            {about.title || "Hakkımızda"}
          </Typography>
        </ScrollReveal>
        {about.image ? (
          <ScrollReveal direction="up" delay={0.15}>
            <Box
              component="img"
              src={about.image}
              alt={about.title || "Hakkımızda"}
              sx={{
                width: "100%",
                maxHeight: isSmallScreen ? 240 : 420,
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
          </ScrollReveal>
        ) : null}
        <ScrollReveal direction="up" delay={0.25}>
          <Typography
            sx={{
              fontFamily: "inherit",
              fontSize: isSmallScreen ? "1rem" : "1.1rem",
              color: "var(--color-text-secondary)",
              lineHeight: 1.8,
            }}
          >
            {about.description}
          </Typography>
        </ScrollReveal>
      </Box>
    </Container>
  );
};

export default AboutPage;
