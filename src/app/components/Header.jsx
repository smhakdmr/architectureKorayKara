"use client"

import { AppBar, Toolbar, Box, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useMediaQuery } from '@mui/material';
import Link from 'next/link';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
    subsets: ['latin'], // Desteklenen karakter kümesi
    weight: ['100', '400', '500', '700'], // Kullanılacak font ağırlıkları
    style: ['normal'], // Normal veya italik stiller
    display: 'swap', // Daha iyi yükleme için "swap" kullanılır
})

export default function DrawerAppBar() {

    const [drawerOpen, setDrawerOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width:600px)'); // Mobil ekran boyutu
    const [scrolled, setScrolled] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen((prev) => !prev);
    };

    const DividerLine = () => (
        <Box
            sx={{
                width: '1px',
                height: '20px',
                backgroundColor: '#ccc',
                marginTop: '5px'
            }}
        />
    )

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={roboto.className}>
            {!scrolled ? (
                <>
                    <AppBar
                        position="static"
                        sx={{
                            backgroundColor: 'white',
                            boxShadow: 'none'
                        }}>
                        {/* Navbar İçeriği */}
                        <Toolbar sx={{ flexDirection: 'column', alignItems: 'center' }}>
                            {/* Logo */}
                            <Box
                                sx={{
                                    mb: 2,
                                    marginTop: 3,
                                    backgroundColor: 'white'
                                }}
                            >
                                <Image src="/logo.png" alt='Tasarım Mimarlık' width={120} height={40} style={{ backgroundColor: 'white' }} />
                            </Box>
                            {/* Marka İsmi */}
                            <Typography
                                variant={"h4"}
                                sx={{
                                    color: "black",
                                    fontWeight: 500,
                                    fontFamily: "inherit",
                                    // marginBottom: 1
                                }}
                            >
                                TASARIM MİMARLIK
                            </Typography>
                            <Typography
                                variant={"h7"}
                                sx={{
                                    color: "black",
                                    fontWeight: 400,
                                    fontFamily: "inherit",
                                    marginBottom: 3,
                                    marginTop: '-4px'

                                }}
                            >
                                PLAN - PROJE - İNŞAAT - TAAHHÜT - TADİLAT
                            </Typography>
                            {/* Menü */}
                            {isMobile ? (
                                // Mobil Menü
                                <>
                                    <IconButton onClick={handleDrawerToggle} sx={{ color: 'black' }}>
                                        <MenuIcon />
                                    </IconButton>
                                    <Drawer
                                        anchor="top"
                                        open={drawerOpen}
                                        onClose={() => setDrawerOpen(false)}
                                    >
                                        <List>
                                            <ListItem onClick={() => setDrawerOpen(false)}>
                                                <Link href="/" style={{ color: 'black', fontFamily: 'inherit', margin: 5 }}>Ana Sayfa</Link>
                                            </ListItem>
                                            <Divider />
                                            <ListItem onClick={() => setDrawerOpen(false)}>
                                                <Link href="/projects" style={{ color: 'black', fontFamily: 'inherit', margin: 5 }}>Hakkımızda</Link>
                                            </ListItem>
                                            <Divider />
                                            <ListItem onClick={() => setDrawerOpen(false)}>
                                                <Link href="/projects" style={{ color: 'black', fontFamily: 'inherit', margin: 5 }}>Projeler</Link>
                                            </ListItem>
                                            <Divider />
                                            <ListItem onClick={() => setDrawerOpen(false)}>
                                                <Link href="/contactus" style={{ color: 'black', fontFamily: 'inherit', margin: 5 }}>Bitmiş Projeler</Link>
                                            </ListItem>
                                            <Divider />
                                            <ListItem onClick={() => setDrawerOpen(false)}>
                                                <Link href="/contactus" style={{ color: 'black', fontFamily: 'inherit', margin: 5 }}>İletişim</Link>
                                            </ListItem>
                                        </List>
                                    </Drawer>
                                </>
                            ) : (
                                // Masaüstü Menü
                                <Box sx={{ display: 'flex', gap: 4 }}>
                                    <Link href="/" style={{ color: 'black', fontFamily: 'inherit', margin: 5 }}>Ana Sayfa</Link>
                                    <DividerLine />
                                    <Link href="/projects" style={{ color: 'black', fontFamily: 'inherit', margin: 5 }}>Hakkımızda</Link>
                                    <DividerLine />
                                    <Link href="/projects" style={{ color: 'black', fontFamily: 'inherit', margin: 5 }}>Projeler</Link>
                                    <DividerLine />
                                    <Link href="/projects" style={{ color: 'black', fontFamily: 'inherit', margin: 5 }}>Tamamlanmış Projeler</Link>
                                    <DividerLine />
                                    <Link href="/contactus" style={{ color: 'black', fontFamily: 'inherit', margin: 5 }}>İletişim</Link>
                                </Box>
                            )}
                        </Toolbar>
                    </AppBar>
                </>
            ) : (
                <>
                    <AppBar
                        position="fixed"
                        sx={{
                            backgroundColor: 'white',
                            boxShadow: scrolled ? '0px 4px 10px rgba(0, 0, 0, 0.1)' : 'none',
                            transition: 'all 0.3s ease',
                            padding: '10px 0px'
                        }}>
                        <Toolbar sx={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                            {/* Logo ve Başlık */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Image src="/logo.png" alt='Tasarım Mimarlık' width={60} height={30} />
                                <Box>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            color: "black",
                                            fontWeight: 500,
                                            fontFamily: "inherit",
                                        }}
                                    >
                                        TASARIM MİMARLIK
                                    </Typography>
                                    <Typography
                                        variant="h7"
                                        sx={{
                                            color: "black",
                                            fontWeight: 400,
                                            fontFamily: "inherit",
                                            marginBottom: 3,
                                            marginTop: '-4px'

                                        }}
                                    >
                                        PLAN - PROJE - İNŞAAT - TAAHHÜT - TADİLAT
                                    </Typography>
                                </Box>
                            </Box>
                            {/* Menü */}
                            <Box sx={{ display: 'flex', gap: 4, marginTop: '1vh' }}>
                                <Link href="/" style={{ color: 'black', fontFamily: 'inherit' }}>Ana Sayfa</Link>
                                <DividerLine />
                                <Link href="/about" style={{ color: 'black', fontFamily: 'inherit' }}>Hakkımızda</Link>
                                <DividerLine />
                                <Link href="/projects" style={{ color: 'black', fontFamily: 'inherit' }}>Projeler</Link>
                                <DividerLine />
                                <Link href="/completed-projects" style={{ color: 'black', fontFamily: 'inherit' }}>Tamamlanmış Projeler</Link>
                                <DividerLine />
                                <Link href="/contact" style={{ color: 'black', fontFamily: 'inherit'}}>İletişim</Link>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </>
            )}
            <Divider />
        </div>
    );
}
