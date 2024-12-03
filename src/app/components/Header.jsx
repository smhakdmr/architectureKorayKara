"use client";

import React from "react";
import { useState } from "react";
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
import MenuIcon from '@mui/icons-material/Menu';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const Header = () => {

    const [open, setOpen] = useState(false);
    const isSmallScreen = useMediaQuery('(max-width:600px)');


    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar sx={{ background: "#00000085" }}>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters sx={{ height: "5vh" }}>
                            <AccountBalanceIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, height: 80, width: 40 }} />
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="#app-bar-with-responsive-menu"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                Tasarım Mimarlık
                            </Typography>
                            <AccountBalanceIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                href="#app-bar-with-responsive-menu"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'flex', md: 'none' },
                                    flexGrow: 1,
                                    fontFamily: 'monospace',
                                    fontWeight: 500,
                                    letterSpacing: '.1rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                Tasarım Mimarlık
                            </Typography>
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            </Box>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={() => { setOpen(true) }}
                                sx={{ mr: 0 }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Toolbar>
                    </Container>
                </AppBar>
            </Box>
            <Drawer
                open={open}
                onClose={() => { setOpen(false) }}
                anchor="right"
            >
                <Box sx={{ width: isSmallScreen ? "80vw" : "35vw" }} role="presentation" onClick={() => { setOpen(false) }}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AccountBalanceIcon />
                                </ListItemIcon>
                                <ListItemText primary={"LOGO"} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        {['Anasayfa', 'Projelerimiz', 'İletişim'].map((text, index) => (
                            <ListItem key={text}>
                                <ListItemButton
                                    sx={{ py: 0, minHeight: 32, color: 'gray' }}
                                >
                                    <ListItemText
                                        primary={text}
                                        primaryTypographyProps={{ fontSize: 40, fontWeight: 'medium' }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default Header;
