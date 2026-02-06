"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  MobileStepper,
  Typography,
  Container,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Grid2 from "@mui/material/Grid2";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const ProjectGallery = ({ projects = [], title = "" }) => {
  const DividerLine = () => (
    <Box
      sx={{
        width: "1px",
        height: "20px",
        backgroundColor: "var(--color-border)",
        marginTop: "10px",
        marginLeft: "1vw",
        marginRight: "1vw",
      }}
    />
  );

  const theme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const selectedImages = selectedProject?.images || [];
  const maxSteps = selectedImages.length;

  const handleOpenProject = (project) => {
    setSelectedProject(project);
    setActiveStep(0);
    setIsModalOpen(true);
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ margin: "auto" }}>
        <Box
          sx={{
            marginTop: "5vh",
            marginBottom: "5vh",
            padding: { xs: 2, sm: 4 },
          }}
        >
          {title ? (
            <ScrollReveal direction="up">
              <Typography
                variant={isSmallScreen ? "h5" : "h4"}
                sx={{ fontFamily: "inherit", marginBottom: "3vh", color: 'var(--color-dark)', letterSpacing: '0.03em' }}
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
                      "&:hover img": {
                        transform: "scale(1.1)",
                        opacity: 0.5,
                      },
                      "&:hover .title-overlay": {
                        opacity: 1,
                      },
                      "&:hover .item-bar": {
                        opacity: 0,
                        visibility: "hidden",
                      },
                    }}
                  >
                    <ScrollReveal direction="up" delay={index * 0.1}>
                    <img
                      srcSet={`${coverImage}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      src={`${coverImage}?w=248&fit=crop&auto=format`}
                      alt={project.title}
                      loading="lazy"
                      style={{
                        transition: "transform 0.3s ease, opacity 0.3s ease",
                      }}
                      onClick={() => handleOpenProject(project)}
                    />
                    <Box
                      className="title-overlay"
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "white",
                        background: "rgb(0 0 0 / 17%)",
                        padding: "5% 10%",
                        alignContent: "center",
                        height: "100%",
                        width: "100%",
                        borderRadius: 0,
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        fontSize: isSmallScreen ? "x-large" : "xx-large",
                        textAlign: "center",
                        fontFamily: "inherit",
                      }}
                      onClick={() => handleOpenProject(project)}
                    >
                      {/* {project.title} */}
                    </Box>
                    </ScrollReveal>
                  </ImageListItem>
                );
              })}
            </ImageList>
          )}
        </Box>
      </Container>

      <AnimatePresence>
        {isModalOpen && (
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
              transition={{ duration: 0.25 }}
              onClick={() => { setIsModalOpen(false); setActiveStep(0); }}
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            />
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ position: "relative", zIndex: 1 }}
            >
              <Box
                sx={{
                  width: isSmallScreen ? "90vw" : "65vw",
                  height: isSmallScreen ? "75vh" : "85vh",
                  maxHeight: "90vh",
                  overflowY: "auto",
                  bgcolor: "background.paper",
                  boxShadow: 20,
                  p: isSmallScreen ? 2 : 4,
                  position: "relative",
                }}
              >
                <IconButton
                  onClick={() => {
                    setIsModalOpen(false);
                    setActiveStep(0);
                  }}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: "gray",
                    zIndex: 2,
                  }}
                >
                  <CloseIcon />
                </IconButton>
                {selectedProject ? (
                  <Grid2>
                    <Box
                      sx={{
                        height: isSmallScreen ? "37vh" : "60vh",
                        maxWidth: isSmallScreen ? "100vw" : "60vw",
                        width: "100%",
                        justifySelf: "center",
                      }}
                    >
                      {selectedImages[activeStep] ? (
                        <img
                          src={selectedImages[activeStep]}
                          alt={selectedProject.title}
                          style={{ width: "100%", height: "100%" }}
                        />
                      ) : null}
                      {maxSteps > 1 ? (
                        <MobileStepper
                          variant="dots"
                          steps={maxSteps}
                          position="static"
                          activeStep={activeStep}
                          sx={{
                            maxWidth: "50vw",
                            justifySelf: "center",
                          }}
                          nextButton={
                            <Button
                              size="large"
                              onClick={() => {
                                setActiveStep(
                                  (prevActiveStep) => prevActiveStep + 1
                                );
                              }}
                              disabled={activeStep === maxSteps - 1}
                            >
                              {theme.direction === "rtl" ? (
                                <KeyboardArrowLeft />
                              ) : (
                                <KeyboardArrowRight />
                              )}
                            </Button>
                          }
                          backButton={
                            <Button
                              size="large"
                              onClick={() => {
                                setActiveStep(
                                  (prevActiveStep) => prevActiveStep - 1
                                );
                              }}
                              disabled={activeStep === 0}
                            >
                              {theme.direction === "rtl" ? (
                                <KeyboardArrowRight />
                              ) : (
                                <KeyboardArrowLeft />
                              )}
                            </Button>
                          }
                        />
                      ) : null}
                    </Box>
                    {!isSmallScreen ? (
                      <Grid
                        container
                        md={12}
                        sx={{ justifyContent: "center", marginTop: "5vh" }}
                      >
                        <Grid item>
                          <Typography
                            variant={isSmallScreen ? "body2" : "body1"}
                            sx={{
                              marginBottom: "1vh",
                              marginTop: "1vh",
                              fontFamily: "inherit",
                            }}
                          >
                            <strong>Konum:</strong>{" "}
                            <a>{selectedProject.location || "-"}</a>
                          </Typography>
                        </Grid>
                        <DividerLine />
                        <Grid item>
                          <Typography
                            variant={isSmallScreen ? "body2" : "body1"}
                            sx={{
                              marginBottom: "1vh",
                              marginTop: "1vh",
                              fontFamily: "inherit",
                            }}
                          >
                            <strong>Tarih:</strong>{" "}
                            <a>{selectedProject.year || "-"}</a>
                          </Typography>
                        </Grid>
                        <DividerLine />
                        <Grid item>
                          <Typography
                            variant={isSmallScreen ? "body2" : "body1"}
                            sx={{
                              marginBottom: "1vh",
                              marginTop: "1vh",
                              fontFamily: "inherit",
                            }}
                          >
                            <strong>Yapı Türü:</strong>{" "}
                            <a>{selectedProject.type || "-"}</a>
                          </Typography>
                        </Grid>
                        <DividerLine />
                        <Grid item>
                          <Typography
                            variant={isSmallScreen ? "body2" : "body1"}
                            sx={{
                              marginBottom: "1vh",
                              marginTop: "1vh",
                              fontFamily: "inherit",
                            }}
                          >
                            <strong>Parsel Alanı:</strong>{" "}
                            <a>{selectedProject.parcelArea || "-"}</a>
                          </Typography>
                        </Grid>
                        <DividerLine />
                        <Grid item>
                          <Typography
                            variant={isSmallScreen ? "body2" : "body1"}
                            sx={{
                              marginBottom: "1vh",
                              marginTop: "1vh",
                              fontFamily: "inherit",
                            }}
                          >
                            <strong>Yapı Alanı:</strong>{" "}
                            <a>{selectedProject.buildingArea || "-"}</a>
                          </Typography>
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid2
                        container
                        md={12}
                        sx={{ justifyContent: "center", marginTop: "6vh" }}
                      >
                        <Grid2 size={12}>
                          <Typography
                            variant={isSmallScreen ? "body2" : "body1"}
                            sx={{
                              marginBottom: "1vh",
                              marginTop: "1vh",
                              fontFamily: "inherit",
                            }}
                          >
                            <strong>Konum:</strong>{" "}
                            <a>{selectedProject.location || "-"}</a>
                          </Typography>
                        </Grid2>
                        <Grid2 size={12}>
                          <Typography
                            variant={isSmallScreen ? "body2" : "body1"}
                            sx={{
                              marginBottom: "1vh",
                              marginTop: "1vh",
                              fontFamily: "inherit",
                            }}
                          >
                            <strong>Tarih:</strong>{" "}
                            <a>{selectedProject.year || "-"}</a>
                          </Typography>
                        </Grid2>
                        <Grid2 size={12}>
                          <Typography
                            variant={isSmallScreen ? "body2" : "body1"}
                            sx={{
                              marginBottom: "1vh",
                              marginTop: "1vh",
                              fontFamily: "inherit",
                            }}
                          >
                            <strong>Yapı Türü:</strong>{" "}
                            <a>{selectedProject.type || "-"}</a>
                          </Typography>
                        </Grid2>
                        <Grid2 size={12}>
                          <Typography
                            variant={isSmallScreen ? "body2" : "body1"}
                            sx={{
                              marginBottom: "1vh",
                              marginTop: "1vh",
                              fontFamily: "inherit",
                            }}
                          >
                            <strong>Parsel Alanı:</strong>{" "}
                            <a>{selectedProject.parcelArea || "-"}</a>
                          </Typography>
                        </Grid2>
                        <Grid2 size={12}>
                          <Typography
                            variant={isSmallScreen ? "body2" : "body1"}
                            sx={{
                              marginBottom: "1vh",
                              marginTop: "1vh",
                              fontFamily: "inherit",
                            }}
                          >
                            <strong>Yapı Alanı:</strong>{" "}
                            <a>{selectedProject.buildingArea || "-"}</a>
                          </Typography>
                        </Grid2>
                      </Grid2>
                    )}
                  </Grid2>
                ) : null}
              </Box>
            </motion.div>
          </Box>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectGallery;
