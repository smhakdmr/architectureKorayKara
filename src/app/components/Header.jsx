"use client"

import { Old_Standard_TT } from 'next/font/google';
import { Oswald } from 'next/font/google';
import { AppBar, Toolbar, Box, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import Image from 'next/image';
import { useMediaQuery } from '@mui/material';
import Link from 'next/link';
import { Roboto_Condensed } from 'next/font/google';
import { PT_Sans_Narrow } from 'next/font/google';
import { Roboto } from 'next/font/google';

const oldStandart = Old_Standard_TT({
    subsets: ['latin'], // Desteklenen karakter kümesi
    weight: ['400', '700'], // Kullanılacak font ağırlıkları
    style: ['normal', 'italic'], // Normal veya italik stiller
    display: 'swap', // Daha iyi yükleme için "swap" kullanılır
});

const oswald = Oswald({
    subsets: ['latin'], // Desteklenen karakter kümesi
    weight: ['400', '700'], // Kullanılacak font ağırlıkları
    style: ['normal'], // Normal veya italik stiller
    display: 'swap', // Daha iyi yükleme için "swap" kullanılır
})

const robotoCondensed = Roboto_Condensed({
    subsets: ['latin'], // Desteklenen karakter kümesi
    weight: ['400', '700'], // Kullanılacak font ağırlıkları
    style: ['normal'], // Normal veya italik stiller
    display: 'swap', // Daha iyi yükleme için "swap" kullanılır
})

const sansNarrow = PT_Sans_Narrow({
    subsets: ['latin'], // Desteklenen karakter kümesi
    weight: ['400', '700'], // Kullanılacak font ağırlıkları
    style: ['normal'], // Normal veya italik stiller
    display: 'swap', // Daha iyi yükleme için "swap" kullanılır
})

const roboto = Roboto({
    subsets: ['latin'], // Desteklenen karakter kümesi
    weight: ['100', '400', '500', '700'], // Kullanılacak font ağırlıkları
    style: ['normal'], // Normal veya italik stiller
    display: 'swap', // Daha iyi yükleme için "swap" kullanılır
})

export default function DrawerAppBar() {

    const [drawerOpen, setDrawerOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width:600px)'); // Mobil ekran boyutu

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

    return (
        <div className={roboto.className}>
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
                        <Image src="/logo.png" alt='Tasarım Mimarlık' width={120} height={40} style={{backgroundColor:'white'}} />
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
                            <Link href="/contactus" style={{ color: 'black', fontFamily: 'inherit', margin: 5 }}>İletişim</Link>
                            {/* <Button href="/" sx={{ color: 'black', fontFamily: 'inherit' }}>ANA SAYFA</Button> */}
                            {/* <Button href="/projects" sx={{ color: 'black', fontFamily: 'inherit' }}>HAKKINDA</Button> */}
                            {/* <Button href="/projects" sx={{ color: 'black', fontFamily: 'inherit' }}>PROJELER</Button> */}
                            {/* <Button href="/contactus" sx={{ color: 'black', fontFamily: 'inherit' }}>İLETİŞİM</Button> */}
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
            <Divider />
        </div>
    );
}
