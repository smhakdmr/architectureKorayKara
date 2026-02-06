"use client";

import {
    Box,
    Container,
    IconButton,
    Typography,
    useMediaQuery
} from "@mui/material";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {

    const isSmallScreen = useMediaQuery('(max-width:600px)');

    const SocialButton = styled(IconButton)(() => ({
        color: "var(--color-text-muted)",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
            transform: "scale(1.15)",
            color: "var(--color-primary)",
        },
    }));

    const FooterLink = styled(Link)(() => ({
        color: "var(--color-text-muted)",
        textDecoration: "none",
        fontSize: "0.9rem",
        transition: "color 0.3s ease",
        display: "block",
        marginBottom: "10px",
        fontFamily: "inherit",
        "&:hover": {
            color: "var(--color-primary)",
        },
    }));

    const SectionTitle = ({ children }) => (
        <Typography
            variant="subtitle1"
            sx={{
                color: "var(--color-primary)",
                fontWeight: 600,
                fontFamily: "inherit",
                letterSpacing: "0.12em",
                fontSize: "0.8rem",
                mb: 2.5,
                textTransform: "uppercase",
            }}
        >
            {children}
        </Typography>
    );

    const ContactItem = ({ icon, children }) => (
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: { xs: 0.7, sm: 1 }, mb: 1.5, minWidth: 0 }}>
            {icon}
            <Typography
                variant="body2"
                sx={{
                    color: "var(--color-text-muted)",
                    fontFamily: "inherit",
                    lineHeight: 1.7,
                    fontSize: { xs: "0.76rem", sm: "0.85rem" },
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                    minWidth: 0,
                }}
            >
                {children}
            </Typography>
        </Box>
    );

    return (
        <footer>
            <Box sx={{ backgroundColor: "var(--color-dark)", pt: { xs: 5, sm: 6 }, pb: 2 }}>
                <Container maxWidth="lg">
                    <Grid
                        container
                        spacing={{ xs: 3, sm: 6 }}
                        sx={{ mb: 4 }}
                    >
                        {/* Marka - sadece masaüstünde */}
                        <Grid item sm={6} md={4} sx={{ display: { xs: "none", sm: "block" } }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: { xs: 1, sm: 2 } }}>
                                <Image src="/logo.png" alt="Tasarım Mimarlık" width={40} height={20} style={{ filter: "invert(1) brightness(2)" }} />
                                <Typography
                                    sx={{
                                        color: "var(--color-white)",
                                        fontWeight: 500,
                                        fontFamily: "inherit",
                                        letterSpacing: "0.06em",
                                        fontSize: "1.1rem",
                                    }}
                                >
                                    TASARIM MİMARLIK
                                </Typography>
                            </Box>
                            {/* Açıklama - sadece masaüstünde */}
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "var(--color-text-muted)",
                                    fontFamily: "inherit",
                                    lineHeight: 1.8,
                                    fontSize: "0.85rem",
                                    mb: 2.5,
                                    display: { xs: "none", sm: "block" },
                                }}
                            >
                                Kentsel tasarım kollarında yenilikçi ve ilerici bir düşünce anlayışını
                                işbirlikçi tasarım uygulamalarıyla yakalama arayışı içinde 2013 yılından
                                bu yana hizmet vermekteyiz.
                            </Typography>
                            <Box sx={{ display: "flex", gap: 0.5, ml: -1 }}>
                                <SocialButton aria-label="instagram" size="small">
                                    <InstagramIcon fontSize="small" />
                                </SocialButton>
                                <SocialButton aria-label="linkedin" size="small">
                                    <LinkedInIcon fontSize="small" />
                                </SocialButton>
                                <SocialButton aria-label="facebook" size="small">
                                    <FacebookIcon fontSize="small" />
                                </SocialButton>
                            </Box>
                        </Grid>

                        {/* Hızlı Linkler */}
                        <Grid item xs={6} sm={3} md={2}>
                            <SectionTitle>Sayfalar</SectionTitle>
                            <FooterLink href="/">Ana Sayfa</FooterLink>
                            <FooterLink href="/about">Hakkımızda</FooterLink>
                            <FooterLink href="/projects">Projeler</FooterLink>
                            <FooterLink href="/completed-projects">Tamamlanmış Projeler</FooterLink>
                            <FooterLink href="/contactus">İletişim</FooterLink>
                        </Grid>

                        {/* Hizmetler - Müşteri onayı sonrası aktif edilecek */}
                        {/* <Grid item xs={6} sm={3} md={2.5}>
                            <SectionTitle>Hizmetler</SectionTitle>
                            <Typography variant="body2" sx={{ color: "var(--color-text-muted)", fontFamily: "inherit", mb: 1.2, fontSize: "0.85rem" }}>
                                Mimari Proje ve Uygulama
                            </Typography>
                            <Typography variant="body2" sx={{ color: "var(--color-text-muted)", fontFamily: "inherit", mb: 1.2, fontSize: "0.85rem" }}>
                                Modelleme ve Rendering
                            </Typography>
                            <Typography variant="body2" sx={{ color: "var(--color-text-muted)", fontFamily: "inherit", mb: 1.2, fontSize: "0.85rem" }}>
                                Mimari Animasyon
                            </Typography>
                        </Grid> */}

                        {/* İletişim */}
                        <Grid item xs={6} sm={6} md={3.5}>
                            <SectionTitle>İletişim</SectionTitle>
                            <ContactItem icon={<PlaceIcon sx={{ color: "var(--color-primary-dark)", fontSize: 18, mt: 0.3 }} />}>
                                Kavacık Mah. Yeni Sokak Vip Plaza<br />
                                No:5 D:6 Kavacık-Beykoz / İstanbul
                            </ContactItem>
                            <ContactItem icon={<PhoneIcon sx={{ color: "var(--color-primary-dark)", fontSize: 18, mt: 0.3 }} />}>
                                +90 (555) 555 5555
                            </ContactItem>
                            <ContactItem icon={<EmailIcon sx={{ color: "var(--color-primary-dark)", fontSize: 18, mt: 0.3 }} />}>
                                info@tasarimmimarlik.com
                            </ContactItem>
                        </Grid>
                    </Grid>

                    {/* Alt Çizgi + Copyright */}
                    <Box
                        sx={{
                            borderTop: "1px solid var(--color-dark-soft)",
                            pt: 2.5,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: isSmallScreen ? "column" : "row",
                            gap: 1,
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                color: "var(--color-text-muted)",
                                opacity: 0.6,
                                fontSize: "0.78rem",
                                fontFamily: "inherit",
                            }}
                        >
                            © {new Date().getFullYear()} Tasarım Mimarlık. Tüm hakları saklıdır.
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: "var(--color-text-muted)",
                                opacity: 0.4,
                                fontSize: "0.72rem",
                                fontFamily: "inherit",
                            }}
                        >
                            Akdemir Software
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </footer>
    );
};

export default Footer;
