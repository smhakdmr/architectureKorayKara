"use client"

import React from "react";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import Image from 'next/image';


const Services = () => {

    const isSmallScreen = useMediaQuery('(max-width:600px)');

    return (
        <Box sx={{
            color: "white",
            paddingTop: '5vh',
            backgroundColor: "#181818",
        }}>
            <Typography
                variant="h1"
                align="center"
                gutterBottom
                sx={{
                    fontFamily: "inherit",
                    fontSize: isSmallScreen ? "1.7rem" : "3rem",
                    color: "white",
                    textAlign: "center",
                    marginTop: isSmallScreen ? 20 : 5,
                    marginLeft: isSmallScreen ? 2 : 20,
                    marginRight: isSmallScreen ? 2 : 20,
                    marginBottom: isSmallScreen ? 20 : 20
                }}
            >
                <span style={{ color: "#CFBBB0" }}>Tasarım Mimarlık</span>  olarak hem Türkiye'de hem de dünyanın diğer
                ülkelerinde mimari ve iç mimari çalışmalara hayat veriyoruz.
            </Typography>
            {/* "Neler Yapıyoruz?" Başlığı */}
            <Typography
                variant="h1"
                align="center"
                gutterBottom
                sx={{
                    fontFamily: "inherit",
                    fontWeight: 500,
                    fontSize: isSmallScreen ? "2rem" : "3rem",
                    color: "white",
                    marginTop: 5,
                    marginBottom: 5
                }}
            >
                Hizmetlerimiz
            </Typography>

            {/* Kartlar */}
            <Grid
                container
                spacing={2}
                direction={isSmallScreen ? "column" : "row"}
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {[
                    {
                        image: '/services1.png', // Görsel URL'si
                        title: "Mimari Proje ve Uygulama",
                    },
                    {
                        image: '/services2.png', // Görsel URL'si
                        title: "Modelleme ve Rendering",
                    },
                    {
                        image: '/services3.png', // Görsel URL'si
                        title: "Mimari Animasyon",
                    },
                    {
                        image: '/services4.png', // Görsel URL'si
                        title: "360 Sanal Tur",
                    },
                ].map((item, index) => (
                    <Grid item xs={12} sm={3} md={3} key={index}>
                        <Box
                            sx={{
                                position: "relative",
                                overflow: "hidden",
                                width: isSmallScreen ? '70vw' : '21vw',
                                height: '30vh',
                                "&:hover img": {
                                    transform: "scale(1.05)", // Görsel biraz büyüyor
                                    transition: "transform 0.3s ease",
                                },
                            }}
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                layout="fill"
                                objectFit="cover"
                                style={{
                                    transition: "transform 0.3s ease",
                                }}
                            />
                            {/* Sağ Alt Card */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: 70,
                                    backgroundColor: "#ffffffba",
                                    color: "black",
                                    borderRadius: 0,
                                    py: 1,
                                    px: 1,
                                    boxShadow: 3,
                                    width: "80%",
                                }}
                            >
                                <Typography>
                                    {item.title}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Services;
