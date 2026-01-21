"use client";

import {
    Box,
    Typography,
    Container,
    useMediaQuery
} from "@mui/material";
import { useState, useEffect } from 'react';

const WelcomeBox = () => {

    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const [scrolled, setScrolled] = useState(false);
    const [homeContent, setHomeContent] = useState({
        heroImage: "/mimarlik4.png",
        title: "Tasarım Mimarlık",
        description: "Tasarım Mimarlık, kentsel tasarım kollarında yenilikçi ve ilerici bir düşünce ve zihniyet anlayışını işbirlikçi tasarım uygulamalarıyla yakalama arayışı içinde 2013 yılında kurulmuştur."
    });

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200)
                setScrolled(true);
            else
                setScrolled(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        let isMounted = true;

        const loadHomeContent = async () => {
            try {
                const response = await fetch("/api/content");
                const data = await response.json();
                if (isMounted && data?.home) {
                    setHomeContent((prev) => ({
                        ...prev,
                        ...data.home
                    }));
                }
            } catch (error) {
                if (isMounted) {
                    setHomeContent((prev) => prev);
                }
            }
        };

        loadHomeContent();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <Container maxWidth="lg" sx={{ margin: 'auto' }}>
            <Box sx={{ padding: { xs: 2, sm: 4 } }}>
                <Box
                    sx={{
                        position: "relative",
                        background: `url('${homeContent.heroImage}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '80vw',
                        height: '60vh',
                        justifySelf: "center",
                        marginTop: scrolled ? '30vh' : '3vh',
                        justifyContent: 'center'
                    }}>
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: isSmallScreen ? '15px' : '50px',
                            left: isSmallScreen ? '15px' : '50px',
                            backgroundColor: 'white',
                            padding: '40px',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                            width: isSmallScreen ? '300px' : '20vw',
                            height: isSmallScreen ? '30vh' : '35vh'
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px', fontFamily: "inherit" }}>
                            {homeContent.title}
                        </Typography>
                        <Typography variant={isSmallScreen ? "body2" : "body3"} sx={{ fontFamily: "inherit" }}>
                            {homeContent.description}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default WelcomeBox;
