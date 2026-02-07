"use client";

import React, { useState } from "react";
import {
  Box,
  IconButton,
  ImageList,
  ImageListItem,
  Typography,
  Container,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const ProjectGallery = ({ projects = [], title = "" }) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0); // -1: sola, 1: saga

  const selectedImages = selectedProject?.images || [];
  const maxSteps = selectedImages.length;

  const imageSlideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "60%" : "-60%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? "-60%" : "60%",
      opacity: 0,
    }),
  };

  const handleOpenProject = (project) => {
    setSelectedProject(project);
    setActiveStep(0);
    setIsModalOpen(true);
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ margin: "auto", paddingTop: { xs: 3, sm: 4 }, paddingBottom: { xs: 5, sm: 8 } }}>
        <Box
          sx={{
            padding: { xs: 2, sm: 4 },
          }}
        >
          {title ? (
            <ScrollReveal direction="up">
              <Typography
                variant={isSmallScreen ? "h4" : "h3"}
                sx={{ fontFamily: "inherit", marginBottom: { xs: 3, sm: 4 }, color: 'var(--color-dark)', letterSpacing: '0.03em' }}
              >
                {title}
              </Typography>
            </ScrollReveal>
          ) : null}
          {projects.length === 0 ? (
            <Typography sx={{ fontFamily: "inherit" }}>
              Henüz proje eklenmedi.
            </Typography>
          ) : (
            <ImageList
              variant="masonry"
              cols={isSmallScreen ? 1 : 3}
              gap={15}
            >
              {projects.map((project, index) => {
                const coverImage = project.images?.[0] || project.coverImage;
                if (!coverImage) {
                  return null;
                }

                return (
                  <ImageListItem
                    key={project.id || project.title || index}
                    sx={{
                      position: "relative",
                      overflow: "hidden",
                      cursor: "pointer",
                      animation: "fadeInUp 0.6s ease both",
                      animationDelay: `${index * 0.1}s`,
                      "@keyframes fadeInUp": {
                        "0%": { opacity: 0, transform: "translateY(30px)" },
                        "100%": { opacity: 1, transform: "translateY(0)" },
                      },
                      "&:hover img": {
                        transform: "scale(1.05)",
                      },
                      "&:hover .title-overlay": {
                        opacity: 1,
                      },
                    }}
                    onClick={() => handleOpenProject(project)}
                  >
                    <img
                      src={coverImage}
                      alt={project.title}
                      loading="lazy"
                      style={{
                        transition: "transform 0.5s ease",
                        display: "block",
                        width: "100%",
                      }}
                    />
                    <Box
                      className="title-overlay"
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: "linear-gradient(to top, rgba(26,26,26,0.85) 0%, rgba(26,26,26,0.4) 60%, transparent 100%)",
                        padding: isSmallScreen ? "20px 16px 14px" : "32px 24px 18px",
                        opacity: 0,
                        transition: "opacity 0.4s ease",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "var(--color-white)",
                          fontFamily: "inherit",
                          fontWeight: 500,
                          fontSize: isSmallScreen ? "0.95rem" : "1.1rem",
                          letterSpacing: "0.03em",
                        }}
                      >
                        {project.title}
                      </Typography>
                      {project.location && (
                        <Typography
                          sx={{
                            color: "var(--color-primary-light)",
                            fontFamily: "inherit",
                            fontSize: "0.78rem",
                            mt: 0.5,
                            opacity: 0.85,
                          }}
                        >
                          {project.location}
                        </Typography>
                      )}
                    </Box>
                  </ImageListItem>
                );
              })}
            </ImageList>
          )}
        </Box>
      </Container>

      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <Box
            sx={{
              position: "fixed",
              inset: 0,
              zIndex: 1300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => { setIsModalOpen(false); setActiveStep(0); }}
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
              }}
            />
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                position: "relative",
                zIndex: 1,
                width: isSmallScreen ? "94vw" : "70vw",
                maxWidth: 960,
                maxHeight: "92vh",
              }}
            >
              <Box
                sx={{
                  overflowY: "auto",
                  maxHeight: "92vh",
                  backgroundColor: "var(--color-white)",
                  borderRadius: isSmallScreen ? "8px" : "12px",
                  boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
                  position: "relative",
                }}
              >
                {/* Kapatma butonu */}
                <IconButton
                  onClick={() => { setIsModalOpen(false); setActiveStep(0); }}
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    zIndex: 10,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    color: "#fff",
                    width: 36,
                    height: 36,
                    "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
                  }}
                >
                  <CloseIcon sx={{ fontSize: 20 }} />
                </IconButton>

                {/* Gorsel Alani */}
                <Box sx={{ position: "relative", backgroundColor: "#111", overflow: "hidden" }}>
                  <AnimatePresence initial={false} mode="popLayout" custom={slideDirection}>
                    <motion.img
                      key={activeStep}
                      src={selectedImages[activeStep]}
                      alt={selectedProject.title}
                      custom={slideDirection}
                      variants={imageSlideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                      style={{
                        width: "100%",
                        height: isSmallScreen ? "45vh" : "65vh",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </AnimatePresence>

                  {/* Gorsel uzerinde oklar */}
                  {maxSteps > 1 && (
                    <>
                      <IconButton
                        onClick={() => { setSlideDirection(-1); setActiveStep((prev) => prev - 1); }}
                        disabled={activeStep === 0}
                        sx={{
                          position: "absolute",
                          left: 12,
                          top: "50%",
                          transform: "translateY(-50%)",
                          backgroundColor: "rgba(255,255,255,0.85)",
                          color: "var(--color-dark)",
                          width: isSmallScreen ? 36 : 44,
                          height: isSmallScreen ? 36 : 44,
                          "&:hover": { backgroundColor: "#fff" },
                          "&.Mui-disabled": { backgroundColor: "rgba(255,255,255,0.4)", color: "rgba(0,0,0,0.25)" },
                        }}
                      >
                        <KeyboardArrowLeft />
                      </IconButton>
                      <IconButton
                        onClick={() => { setSlideDirection(1); setActiveStep((prev) => prev + 1); }}
                        disabled={activeStep === maxSteps - 1}
                        sx={{
                          position: "absolute",
                          right: 12,
                          top: "50%",
                          transform: "translateY(-50%)",
                          backgroundColor: "rgba(255,255,255,0.85)",
                          color: "var(--color-dark)",
                          width: isSmallScreen ? 36 : 44,
                          height: isSmallScreen ? 36 : 44,
                          "&:hover": { backgroundColor: "#fff" },
                          "&.Mui-disabled": { backgroundColor: "rgba(255,255,255,0.4)", color: "rgba(0,0,0,0.25)" },
                        }}
                      >
                        <KeyboardArrowRight />
                      </IconButton>

                      {/* Gorsel sayaci */}
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 12,
                          right: 16,
                          backgroundColor: "rgba(0,0,0,0.55)",
                          color: "#fff",
                          px: 1.5,
                          py: 0.4,
                          borderRadius: "4px",
                          fontSize: "0.8rem",
                          fontWeight: 500,
                          letterSpacing: "0.05em",
                        }}
                      >
                        {activeStep + 1} / {maxSteps}
                      </Box>
                    </>
                  )}
                </Box>

                {/* Icerik Alani */}
                <Box sx={{ p: isSmallScreen ? 2.5 : 4 }}>
                  {/* Baslik */}
                  <Typography
                    variant={isSmallScreen ? "h5" : "h4"}
                    sx={{
                      color: "var(--color-dark)",
                      fontWeight: 600,
                      letterSpacing: "0.02em",
                      mb: 0.5,
                    }}
                  >
                    {selectedProject.title}
                  </Typography>

                  {selectedProject.location && (
                    <Typography
                      sx={{
                        color: "var(--color-text-secondary)",
                        fontSize: "0.9rem",
                        mb: 2.5,
                      }}
                    >
                      {selectedProject.location}
                    </Typography>
                  )}

                  {/* Ayrac */}
                  <Box sx={{ width: 50, height: 2, backgroundColor: "var(--color-primary)", mb: 2.5 }} />

                  {/* Detay kartlari */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: isSmallScreen ? "1fr 1fr" : "repeat(4, 1fr)",
                      gap: isSmallScreen ? 1.5 : 2,
                    }}
                  >
                    {[
                      { label: "Tarih", value: selectedProject.year },
                      { label: "Yapı Türü", value: selectedProject.type },
                      { label: "Parsel Alanı", value: selectedProject.parcelArea },
                      { label: "Yapı Alanı", value: selectedProject.buildingArea },
                    ]
                      .filter((item) => item.value)
                      .map((item, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            backgroundColor: "var(--color-light)",
                            borderRadius: "6px",
                            p: isSmallScreen ? 1.5 : 2,
                            borderLeft: "3px solid var(--color-primary)",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "0.7rem",
                              color: "var(--color-text-muted)",
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                              fontWeight: 600,
                              mb: 0.3,
                            }}
                          >
                            {item.label}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: isSmallScreen ? "0.85rem" : "0.95rem",
                              color: "var(--color-dark)",
                              fontWeight: 500,
                            }}
                          >
                            {item.value}
                          </Typography>
                        </Box>
                      ))}
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </Box>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectGallery;
