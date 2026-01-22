"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Box, CircularProgress } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

const waitForImages = (timeoutMs = 5000) =>
  new Promise((resolve) => {
    const start = Date.now();

    const check = () => {
      const images = Array.from(document.images || []);
      const pending = images.filter((img) => !img.complete);

      if (pending.length === 0) {
        resolve();
        return;
      }

      if (Date.now() - start > timeoutMs) {
        resolve();
        return;
      }

      setTimeout(check, 120);
    };

    check();
  });

const AppShell = ({ children }) => {
  const pathname = usePathname();
  const [isLoaded, setIsLoaded] = useState(false);
  const hasMounted = useRef(false);

  useEffect(() => {
    const handleLoad = () => setIsLoaded(true);

    if (document.readyState === "complete") {
      setIsLoaded(true);
      return;
    }

    window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    let cancelled = false;
    setIsLoaded(false);

    const run = async () => {
      await waitForImages();
      if (!cancelled) {
        setIsLoaded(true);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return (
    <>
      {!isLoaded ? (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffffff",
            zIndex: 2000,
          }}
        >
          <CircularProgress />
        </Box>
      ) : null}
      <Box sx={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.2s ease" }}>
        <Header />
        <main className="site-main">{children}</main>
        <Footer />
      </Box>
    </>
  );
};

export default AppShell;
