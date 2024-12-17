"use client"

import React from "react";
import {
    Box,
    Button,
    Divider,
    IconButton,
    ImageList,
    ImageListItem,
    MobileStepper,
    Modal,
    Typography,
    useMediaQuery
} from "@mui/material";
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const Projects = () => {

    const DividerLine = () => (
        <Box
            sx={{
                width: '1px',
                height: '20px',
                backgroundColor: 'black',
                marginTop: '10px',
                marginLeft: '1vw',
                marginRight: '1vw'
            }}
        />
    )

    const itemData = [
        {
            img: '/images/villa1.png',
            title: 'Açık Garajlı Villa',
            featured: true,
        },
        {
            img: '/images/villa2.png',
            title: 'Ahşap Duvarlı Ledli Villa',
        },
        {
            img: '/images/villa3.png',
            title: 'Doğa İçinde Açık Tonlar Villa',
        },
        {
            img: '/images/villa4.png',
            title: 'Ağaç Ev Görünümlü Villa',
        },
        {
            img: '/images/villa5.png',
            title: 'Lüks Malikane',
        },
        {
            img: '/images/villa6.png',
            title: 'Asma Balkonlu Altı Garaj Villa',
        },
        {
            img: '/images/villa7.png',
            title: 'Basketball',
        },
        {
            img: '/images/villa8.png',
            title: 'Fern',
        },
        {
            img: '/images/villa9.png',
            title: 'Mushrooms',
        }
    ];
    const steps = [
        {
            label: 'Select campaign settings',
            description: `For each ad campaign that you create, you can control how much
                    you're willing to spend on clicks and conversions, which networks
                    and geographical locations you want your ads to show on, and more.`,
        },
        {
            label: 'Create an ad group',
            description:
                'An ad group contains one or more ads which target a shared set of keywords.',
        },
        {
            label: 'Create an ad',
            description: `Try out different ad text to see what brings in the most customers,
                    and learn how to enhance your ads using features like ad extensions.
                    If you run into any problems with your ads, find out how to tell if
                    they're running and how to resolve approval issues.`,
        },
    ];

    const theme = useTheme();
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalPhoto, setModalPhoto] = useState("");
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = steps.length;

    return (
        <>
        <Box
          sx={{
            background: `url('/mimarlik4.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '90vw',
            height: '60vh',
            justifySelf: "center",
            marginTop: '5vh'
        }}>

        </Box>
            <Box
                sx={{
                    marginTop: '5vh',
                }}
            >
                <ImageList
                    variant="masonry"
                    cols={isSmallScreen ? 1 : 3}
                    gap={15}
                    sx={{
                        justifySelf: "center",
                        width: isSmallScreen ? '80vw' : '90vw',
                    }}
                >
                    {itemData.map((item) => (
                        <ImageListItem
                            key={item.img}
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
                            <img
                                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                src={`${item.img}?w=248&fit=crop&auto=format`}
                                alt={item.title}
                                loading="lazy"
                                style={{
                                    transition: "transform 0.3s ease, opacity 0.3s ease",
                                }}
                                onClick={(e) => {
                                    setModalPhoto(item.img)
                                    setIsModalOpen(true)
                                }}
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
                                    fontFamily: "inherit"
                                }}
                                onClick={() => {
                                    setModalPhoto(item.img)
                                    setIsModalOpen(true)
                                }}
                            >
                                {/* {item.title} */}
                            </Box>
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>
            <Modal
                open={isModalOpen}
                onClose={() => { setIsModalOpen(false) }}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: isSmallScreen ? '95vw' : '65vw',
                    height: '85vh',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    bgcolor: 'background.paper',
                    boxShadow: 20,
                    p: isSmallScreen ? 2 : 4,
                }}>
                    <IconButton
                        onClick={() => setIsModalOpen(false)}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: 'gray', // İsteğe bağlı renk
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={12}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Box
                                    sx={{
                                        height: isSmallScreen ? '37vh' : '60vh',
                                        maxWidth: isSmallScreen ? '100vw' : '60vw',
                                        width: '100%',
                                    }}
                                >
                                    <img
                                        src={modalPhoto}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                </Box>
                                <MobileStepper
                                    sx={{
                                        width: '50%',
                                        justifySelf: "center"
                                    }}
                                    variant="dots"
                                    steps={maxSteps}
                                    position="static"
                                    activeStep={activeStep}
                                    nextButton={
                                        <Button
                                            size="large"
                                            onClick={() => {
                                                setActiveStep((prevActiveStep) => prevActiveStep + 1)
                                            }}
                                            disabled={activeStep === maxSteps - 1}
                                        >
                                            {theme.direction === 'rtl' ? (
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
                                                setActiveStep((prevActiveStep) => prevActiveStep - 1);
                                            }}
                                            disabled={activeStep === 0}
                                        >
                                            {theme.direction === 'rtl' ? (
                                                <KeyboardArrowRight />
                                            ) : (
                                                <KeyboardArrowLeft />
                                            )}
                                        </Button>
                                    }
                                />
                            </Box>
                        </Grid>
                        <Grid container md={12} sx={{ justifyContent: "center" }}>
                            <Grid item>
                                <Typography variant={isSmallScreen ? "body2" : "body1"}
                                    sx={{
                                        marginBottom: '1vh',
                                        marginTop: '1vh',
                                        fontFamily: "inherit",
                                        marginLeft: "2vw"
                                    }}
                                >
                                    <strong>Konum:</strong> <a >İstanbul - Şile - Ağva</a>
                                </Typography>
                            </Grid>
                            <DividerLine />
                            <Grid item >
                                <Typography variant={isSmallScreen ? "body2" : "body1"}
                                    sx={{
                                        marginBottom: '1vh',
                                        marginTop: '1vh',
                                        fontFamily: "inherit",
                                    }}>
                                    <strong>Tarih:</strong> <a >2021</a>
                                </Typography>
                            </Grid>
                            <DividerLine />
                            <Grid item>
                                <Typography variant={isSmallScreen ? "body2" : "body1"}
                                    sx={{
                                        marginBottom: '1vh',
                                        marginTop: '1vh',
                                        fontFamily: "inherit",
                                    }}>
                                    <strong>Yapı Türü:</strong><a > Apartman</a>
                                </Typography>
                            </Grid>
                            <DividerLine />
                            <Grid item>
                                <Typography variant={isSmallScreen ? "body2" : "body1"}
                                    sx={{
                                        marginBottom: '1vh',
                                        marginTop: '1vh',
                                        fontFamily: "inherit",
                                    }}>
                                    <strong>Parsel Alanı:</strong> <a >501.33 m²</a>
                                </Typography>
                            </Grid>
                            <DividerLine />
                            <Grid item>
                                <Typography variant={isSmallScreen ? "body2" : "body1"}
                                    sx={{
                                        marginBottom: '1vh',
                                        marginTop: '1vh',
                                        fontFamily: "inherit",
                                    }}>
                                    <strong>Yapı Alanı:</strong> <a >226.84 m²</a>
                                </Typography>
                                {/* <Divider /> */}
                                {/* <Typography variant={isSmallScreen ? "body2" : "body1"}
                                sx={{
                                    marginBottom: '1vh',
                                    marginTop: '1vh',
                                    fontFamily: "inherit"
                                }}>
                                <strong>Oda Sayısı:</strong> <a >5+1</a>
                            </Typography>  */}
                                {/* <DividerLine /> */}
                            </Grid>
                        </Grid>
                        {/* </Grid> */}


                        {/* Sağ taraf (Detaylar) */}
                    </Grid>
                </Box>
            </Modal>
        </>
    );
};

export default Projects;
