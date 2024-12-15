"use client"

import * as React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Button } from '@mui/material';
import Image from 'next/image';
import { Old_Standard_TT } from 'next/font/google';

const oldStandart = Old_Standard_TT({
    subsets: ['latin'], // Desteklenen karakter kümesi
    weight: ['400', '700'], // Kullanılacak font ağırlıkları
    style: ['normal', 'italic'], // Normal veya italik stiller
    display: 'swap', // Daha iyi yükleme için "swap" kullanılır
});

export default function DrawerAppBar() {

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
        <div className={oldStandart.className}>
            <AppBar
                position="static"
                sx={{
                    backgroundColor: 'white',
                    boxShadow: 'none'
                }}>
                {/* Logo ve Menü */}
                <Toolbar sx={{ flexDirection: 'column' }}>
                    {/* Logo */}
                    <Box
                        sx={{
                            mb: 2,
                            marginTop: 3
                        }}
                    >
                        <Image src="/logo.png" alt='Tasarım Mimarlık' width={150} height={50} />
                    </Box>
                    <Typography
                        variant={"h4"}
                        sx={{
                            color: "black",
                            fontWeight: 400,
                            fontFamily: "inherit",
                            marginBottom: 1
                        }}
                    >
                        Tasarım Mimarlık
                    </Typography>
                    {/* Menü Linkleri */}
                    <Box sx={{ display: 'flex', gap: 4 }}>
                        <Button href="#" sx={{ color: 'black', fontFamily: 'inherit' }}>ANA SAYFA</Button>
                        <DividerLine />
                        <Button href="#" sx={{ color: 'black', fontFamily: 'inherit' }}>HAKKINDA</Button>
                        <DividerLine />
                        <Button href="#" sx={{ color: 'black', fontFamily: 'inherit' }}>PROJELER</Button>
                        <DividerLine />
                        <Button href="#" sx={{ color: 'black', fontFamily: 'inherit' }}>İLETİŞİM</Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    );
}
