"use client";

import {
    AppBar,
    Box,
    Container,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    useMediaQuery
} from "@mui/material";
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useState } from "react";
import { styled } from '@mui/material/styles';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {

    const GradientBox = styled(Box)(({ theme }) => ({
        backgroundColor: "#CFBBB0",
        padding: theme.spacing(2, 0),
        position: "relative",
        overflow: "hidden",
    }));

    const FooterSection = styled(Box)(({ theme }) => ({
        padding: theme.spacing(2),
        borderRadius: theme.spacing(2),
        backdropFilter: "blur(10px)",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
        },
    }));

    const SocialButton = styled(IconButton)(({ theme }) => ({
        margin: theme.spacing(0, 1),
        color: "#000",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
            transform: "scale(1.2)",
            color: theme.palette.primary.main,
        },
    }));

    return (
        <footer>
            <GradientBox>
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                            <FooterSection>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: "#000",
                                        mb: 2,
                                        fontWeight: "bold",
                                    }}
                                >
                                    About Us
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#000", opacity: 0.7 }}
                                >
                                    We are dedicated to providing innovative solutions and exceptional
                                    service to our customers worldwide.
                                </Typography>
                            </FooterSection>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <FooterSection >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: "#000",
                                        mb: 2,
                                        fontWeight: "bold",
                                    }}
                                >
                                    Contact
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#000", opacity: 0.7 }}
                                >
                                    Email: info@example.com
                                    <br />
                                    Phone: +1 234 567 890
                                    <br />
                                    Address: 123 Innovation Street
                                </Typography>
                            </FooterSection>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <FooterSection >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: "#000",
                                        mb: 2,
                                        fontWeight: "bold",
                                    }}
                                >
                                    Quick Links
                                </Typography>
                                <Typography
                                    component="div"
                                    sx={{ color: "#000", opacity: 0.7 }}
                                >
                                    <Box component="span" sx={{ display: "block", mb: 1, cursor: "pointer" }}>
                                        Privacy Policy
                                    </Box>
                                    <Box component="span" sx={{ display: "block", mb: 1, cursor: "pointer" }}>
                                        Terms of Service
                                    </Box>
                                    <Box component="span" sx={{ display: "block", cursor: "pointer" }}>
                                        FAQ
                                    </Box>
                                </Typography>
                            </FooterSection>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <FooterSection >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: "#000",
                                        mb: 2,
                                        fontWeight: "bold",
                                    }}
                                >
                                    Follow Us
                                </Typography>
                                <Box sx={{ display: "flex", justifyContent: "center" }}>
                                    <SocialButton aria-label="facebook">
                                        <FacebookIcon />
                                    </SocialButton>
                                    <SocialButton aria-label="twitter">
                                        <TwitterIcon />
                                    </SocialButton>
                                    <SocialButton aria-label="instagram">
                                        <InstagramIcon />
                                    </SocialButton>
                                    <SocialButton aria-label="linkedin">
                                        <LinkedInIcon />
                                    </SocialButton>
                                </Box>
                            </FooterSection>
                        </Grid>
                    </Grid>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            mt: 2,
                            pt: 1,
                            borderTop: "1px solid rgba(0,0,0,0.1)",
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{ color: "#000", opacity: 0.7 }}
                        >
                            © 2024 Akdemir Software. All rights reserved.
                        </Typography>
                    </Box>
                </Container>
            </GradientBox>
        </footer>
    );
};

export default Footer;
