"use client"

import {
    Box,
    Typography,
    useMediaQuery
} from "@mui/material";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

const Welcome = () => {

    const isSmallScreen = useMediaQuery('(max-width:600px)');

    return (
        <>
            <Box
                sx={{
                    background: `
            linear-gradient(to bottom, rgb(0, 0, 0, 0) 0%, #181818 100%),
            url('/mainPage3.png')
          `,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh',
                    position: 'relative',
                    scrollSnapAlign: 'start'
                }}
            >
                <Typography
                    variant={isSmallScreen ? "h3" : "h2"}
                    sx={{
                        position: "absolute",
                        width: "50vw",
                        top: isSmallScreen ? "20%" : "30%",
                        left: isSmallScreen ? "5%" : "15%",
                        color: "white",
                        fontWeight: 600,
                        fontFamily: "inherit"
                    }}
                >
                    BAŞLIK
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        position: "absolute",
                        width: isSmallScreen ? "90vw" : "50vw",
                        top: isSmallScreen ? "32%" : "50%",
                        left: isSmallScreen ? "5%" : "15%",
                        color: "white",
                        fontFamily: "inherit",
                        fontWeight: 400,
                        fontSize: "1.2rem"
                    }}
                >
                    Açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama
                    açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama
                    açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama
                    açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama
                </Typography>
                <Box
                    sx={{
                        position: "absolute", // Sayfanın tamamında sabit kalmasını sağlar
                        color: "white",
                        width: "20vw",
                        bottom: "5vh", // Sayfanın altından 5vh yukarıda
                        left: "50%", // Yatayda ortalamak için
                        transform: "translateX(-50%)", // Ortalamayı tam yapmak için
                        textAlign: "center",
                        fontWeight: "bold",
                        animation: "bounce 2s infinite", // Animasyonu ekledik
                        "@keyframes bounce": {
                            "0%, 100%": {
                                transform: "translate(-50%, 0)", // Başlangıç ve bitiş pozisyonu
                            },
                            "50%": {
                                transform: "translate(-50%, -10px)", // Yukarı çıkış pozisyonu
                            },
                        },
                    }}
                >
                    <KeyboardDoubleArrowDownIcon sx={{ width: "2em", height: "2em" }} />
                </Box>
            </Box>
        </>
    );
};

export default Welcome;
