"use client";

import {
    Box,
    Typography,
    Button,
    Container,
    useMediaQuery
} from "@mui/material";
import { useState, useEffect, useRef } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';

const WelcomeBox = () => {

    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const [scrolled, setScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
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

    // Fade-in animasyonu için sayfa yüklenince tetikle
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 300);
        return () => clearTimeout(timer);
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
                    {/* Glassmorphism overlay kutu */}
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: isSmallScreen ? '15px' : '50px',
                            left: isSmallScreen ? '15px' : '50px',
                            background: 'rgba(255, 255, 255, 0.75)',
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            padding: isSmallScreen ? '24px' : '40px',
                            boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.04)',
                            width: isSmallScreen ? '85%' : '22vw',
                            minHeight: isSmallScreen ? 'auto' : '35vh',
                            borderLeft: '3px solid var(--color-primary)',
                            border: '1px solid rgba(255, 255, 255, 0.4)',
                            borderLeftWidth: '3px',
                            borderLeftColor: 'var(--color-primary)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            // Fade-in animasyonu
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                            transition: 'opacity 0.8s ease, transform 0.8s ease',
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    marginBottom: '12px',
                                    fontFamily: "inherit",
                                    color: 'var(--color-dark)',
                                    letterSpacing: '0.02em'
                                }}
                            >
                                {homeContent.title}
                            </Typography>
                            <Typography
                                variant={isSmallScreen ? "body2" : "body1"}
                                sx={{
                                    fontFamily: "inherit",
                                    color: 'var(--color-text-secondary)',
                                    lineHeight: 1.7,
                                    fontSize: isSmallScreen ? '0.85rem' : '0.95rem'
                                }}
                            >
                                {homeContent.description}
                            </Typography>
                        </Box>
                        {/* CTA Butonu */}
                        <Button
                            component={Link}
                            href="/projects"
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                                mt: 3,
                                alignSelf: 'flex-start',
                                color: 'var(--color-dark)',
                                borderColor: 'var(--color-primary)',
                                borderWidth: '1.5px',
                                borderStyle: 'solid',
                                borderRadius: 0,
                                px: 3,
                                py: 1,
                                fontSize: '0.8rem',
                                letterSpacing: '0.08em',
                                fontFamily: 'inherit',
                                textTransform: 'none',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: 'var(--color-dark)',
                                    color: 'var(--color-primary-light)',
                                    borderColor: 'var(--color-dark)',
                                },
                            }}
                        >
                            Projelerimiz
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default WelcomeBox;
