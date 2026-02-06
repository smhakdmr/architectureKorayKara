"use client"

import { AppBar, Toolbar, Box, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useMediaQuery } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
    subsets: ['latin'], // Desteklenen karakter kümesi
    weight: ['100', '400', '500', '700'], // Kullanılacak font ağırlıkları
    style: ['normal'], // Normal veya italik stiller
    display: 'swap', // Daha iyi yükleme için "swap" kullanılır
})

export default function DrawerAppBar() {

    const [drawerOpen, setDrawerOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width:600px)');
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    const handleDrawerToggle = () => {
        setDrawerOpen((prev) => !prev);
    };

    const menuItems = [
        { href: '/', label: 'Ana Sayfa' },
        { href: '/about', label: 'Hakkımızda' },
        { href: '/projects', label: 'Projeler' },
        { href: '/completed-projects', label: 'Tamamlanmış Projeler' },
        { href: '/contactus', label: 'İletişim' },
    ];

    const isActive = (href) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    const NavLink = ({ href, children }) => (
        <Box
            component={Link}
            href={href}
            sx={{
                position: 'relative',
                color: isActive(href) ? 'var(--color-primary-dark)' : 'var(--color-dark)',
                fontFamily: 'inherit',
                textDecoration: 'none',
                padding: '5px 0',
                fontSize: '0.9rem',
                letterSpacing: '0.04em',
                transition: 'color 0.3s ease',
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-2px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: isActive(href) ? '100%' : '0%',
                    height: '2px',
                    backgroundColor: 'var(--color-primary)',
                    transition: 'width 0.3s ease',
                },
                '&:hover::after': {
                    width: '100%',
                },
                '&:hover': {
                    color: 'var(--color-primary-dark) !important',
                },
            }}
        >
            {children}
        </Box>
    );

    const DividerLine = () => (
        <Box
            sx={{
                width: '1px',
                height: '20px',
                backgroundColor: 'var(--color-border)',
                marginTop: '5px'
            }}
        />
    )

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

    return (
        <div className={roboto.className}>
            {!scrolled ? (
                <>
                    <AppBar
                        position="static"
                        sx={{
                            backgroundColor: 'var(--color-white)',
                            boxShadow: 'none'
                        }}>
                        {/* Navbar İçeriği */}
                        <Toolbar sx={{ flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                            {/* Logo */}
                            <Box
                                sx={{
                                    mb: 2,
                                    marginTop: 3,
                                    backgroundColor: 'var(--color-white)',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    width: '100%'
                                }}
                            >
                                <Image src="/logo.png" alt='Tasarım Mimarlık' width={120} height={40} style={{ backgroundColor: 'var(--color-white)' }} />
                            </Box>
                            {/* Marka İsmi */}
                            <Typography
                                variant={"h4"}
                                sx={{
                                    color: "var(--color-dark)",
                                    fontWeight: 500,
                                    fontFamily: "inherit",
                                    letterSpacing: '0.08em',
                                    textAlign: 'center',
                                    width: '100%'
                                }}
                            >
                                TASARIM MİMARLIK
                            </Typography>
                            <Typography
                                variant={"h7"}
                                sx={{
                                    color: "var(--color-text-secondary)",
                                    fontWeight: 400,
                                    fontFamily: "inherit",
                                    marginBottom: 3,
                                    marginTop: '-4px',
                                    letterSpacing: '0.15em',
                                    fontSize: '0.75rem',
                                    textAlign: 'center',
                                    width: '100%'
                                }}
                            >
                                PLAN - PROJE - İNŞAAT - TAAHHÜT - TADİLAT
                            </Typography>
                            {/* Menü */}
                            {isMobile ? (
                                // Mobil Menü
                                <>
                                    <IconButton onClick={handleDrawerToggle} sx={{ color: 'var(--color-dark)' }}>
                                        <MenuIcon />
                                    </IconButton>
                                    <Drawer
                                        anchor="top"
                                        open={drawerOpen}
                                        onClose={() => setDrawerOpen(false)}
                                        PaperProps={{ sx: { backgroundColor: 'var(--color-light)' } }}
                                    >
                                        <List>
                                            {menuItems.map((item, index) => (
                                                <Box key={item.href}>
                                                    {index > 0 && <Divider sx={{ borderColor: 'var(--color-border-light)' }} />}
                                                    <ListItem
                                                        onClick={() => setDrawerOpen(false)}
                                                        sx={{
                                                            borderLeft: isActive(item.href) ? '3px solid var(--color-primary)' : '3px solid transparent',
                                                            backgroundColor: isActive(item.href) ? 'var(--color-light-alt)' : 'transparent',
                                                            transition: 'all 0.2s ease',
                                                        }}
                                                    >
                                                        <Link
                                                            href={item.href}
                                                            style={{
                                                                color: isActive(item.href) ? 'var(--color-primary-dark)' : 'var(--color-dark)',
                                                                fontFamily: 'inherit',
                                                                margin: 5,
                                                                textDecoration: 'none',
                                                                fontWeight: isActive(item.href) ? 500 : 400,
                                                            }}
                                                        >
                                                            {item.label}
                                                        </Link>
                                                    </ListItem>
                                                </Box>
                                            ))}
                                        </List>
                                    </Drawer>
                                </>
                            ) : (
                                // Masaüstü Menü
                                <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                                    {menuItems.map((item, index) => (
                                        <Box key={item.href} sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                            {index > 0 && <DividerLine />}
                                            <NavLink href={item.href}>{item.label}</NavLink>
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </Toolbar>
                    </AppBar>
                </>
            ) : (
                !isMobile ? (
                    <>
                        <AppBar
                            position="fixed"
                            sx={{
                                backgroundColor: 'var(--color-white)',
                                boxShadow: scrolled ? '0px 4px 20px var(--color-shadow)' : 'none',
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
                                                color: "var(--color-dark)",
                                                fontWeight: 500,
                                                fontFamily: "inherit",
                                                letterSpacing: '0.08em'
                                            }}
                                        >
                                            TASARIM MİMARLIK
                                        </Typography>
                                        <Typography
                                            variant="h7"
                                            sx={{
                                                color: "var(--color-text-secondary)",
                                                fontWeight: 400,
                                                fontFamily: "inherit",
                                                marginBottom: 3,
                                                marginTop: '-4px',
                                                letterSpacing: '0.15em',
                                                fontSize: '0.75rem'
                                            }}
                                        >
                                            PLAN - PROJE - İNŞAAT - TAAHHÜT - TADİLAT
                                        </Typography>
                                    </Box>
                                </Box>
                                {/* Menü */}
                                <Box sx={{ display: 'flex', gap: 4, marginTop: '1vh', alignItems: 'center' }}>
                                    {menuItems.map((item, index) => (
                                        <Box key={item.href} sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                            {index > 0 && <DividerLine />}
                                            <NavLink href={item.href}>{item.label}</NavLink>
                                        </Box>
                                    ))}
                                </Box>
                            </Toolbar>
                        </AppBar>
                    </>
                ) : (
                    <AppBar
                        position="sticky"
                        sx={{
                            backgroundColor: 'var(--color-white)',
                            boxShadow: scrolled ? '0px 4px 20px var(--color-shadow)' : 'none',
                            transition: 'all 0.3s ease',
                            top: 0
                        }}>
                        <Toolbar
                            variant="dense"
                            sx={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                minHeight: 56,
                                px: 2
                            }}
                        >
                            {/* Logo ve Başlık */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Image src="/logo.png" alt='Tasarım Mimarlık' width={42} height={24} />
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: "var(--color-dark)",
                                        fontWeight: 500,
                                        fontFamily: "inherit",
                                        letterSpacing: '0.05em'
                                    }}
                                >
                                    TASARIM MİMARLIK
                                </Typography>
                            </Box>
                            {/* Menü */}
                            <IconButton onClick={handleDrawerToggle} sx={{ color: 'var(--color-dark)' }}>
                                <MenuIcon />
                            </IconButton>
                            <Drawer
                                anchor="top"
                                open={drawerOpen}
                                onClose={() => setDrawerOpen(false)}
                                PaperProps={{ sx: { backgroundColor: 'var(--color-light)' } }}
                            >
                                <List>
                                    {menuItems.map((item, index) => (
                                        <Box key={item.href}>
                                            {index > 0 && <Divider sx={{ borderColor: 'var(--color-border-light)' }} />}
                                            <ListItem
                                                onClick={() => setDrawerOpen(false)}
                                                sx={{
                                                    borderLeft: isActive(item.href) ? '3px solid var(--color-primary)' : '3px solid transparent',
                                                    backgroundColor: isActive(item.href) ? 'var(--color-light-alt)' : 'transparent',
                                                    transition: 'all 0.2s ease',
                                                }}
                                            >
                                                <Link
                                                    href={item.href}
                                                    style={{
                                                        color: isActive(item.href) ? 'var(--color-primary-dark)' : 'var(--color-dark)',
                                                        fontFamily: 'inherit',
                                                        margin: 5,
                                                        textDecoration: 'none',
                                                        fontWeight: isActive(item.href) ? 500 : 400,
                                                    }}
                                                >
                                                    {item.label}
                                                </Link>
                                            </ListItem>
                                        </Box>
                                    ))}
                                </List>
                            </Drawer>
                        </Toolbar>
                    </AppBar>
                )

            )
            }
            <Divider />
        </div >
    );
}
