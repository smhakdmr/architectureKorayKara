"use client";

import {
  AppBar,
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@mui/material";
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useState } from "react";
import Image from "next/image";

const itemData = [
  {
    img: '/images/villa1.png',
    title: 'Açık Garajlı Villa',
    featured: true,
  },
  {
    img: '/images/villa2.png',
    title: 'Ahşap Duvarlı Ledli Villa',
  },
  {
    img: '/images/villa3.png',
    title: 'Doğa İçinde Açık Tonlar Villa',
  },
  {
    img: '/images/villa4.png',
    title: 'Ağaç Ev Görünümlü Villa',
  },
  {
    img: '/images/villa5.png',
    title: 'Lüks Malikane',
  },
  {
    img: '/images/villa6.png',
    title: 'Asma Balkonlu Altı Garaj Villa',
  },
  {
    img: '/images/villa7.png',
    title: 'Basketball',
  },
  {
    img: '/images/villa8.png',
    title: 'Fern',
  },
  {
    img: '/images/villa9.png',
    title: 'Mushrooms',
  },
  {
    img: '/images/villa10.png',
    title: 'Tomato basil',
  }
];

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function Home() {

  const [anchorElNav, setAnchorElNav] = useState(null);
  // const [anchorElUser, setAnchorElUser] = useState(null);
  const [open, setOpen] = useState(false);
  // const [mobileOpen, setMobileOpen] = useState(false);
  // const [isClosing, setIsClosing] = useState(false);

  const toggleDrawer = (newOpen: any) => () => {
    setOpen(newOpen);
  };

  // const handleDrawerTransitionEnd = () => {
  //   setIsClosing(false);
  // };


  // const handleDrawerToggle = () => {
  //   if (!isClosing) {
  //     setMobileOpen(!mobileOpen);
  //   }
  // };

  // const handleDrawerClose = () => {
  //   setIsClosing(true);
  //   setMobileOpen(false);
  // };

  return (
    <div>
      <main>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" sx={{ background: "#000000bf", zIndex: 10 }}>
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
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    // onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    // onClose={handleCloseNavMenu}
                    sx={{ display: { xs: 'block', md: 'none' } }}
                  >
                    {pages.map((page) => (
                      <MenuItem
                        key={page}
                      // onClick={handleCloseNavMenu}
                      >
                        <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
                <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
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
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  LOGO
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                </Box>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer(true)}
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
                {/* <Toolbar>
                  <IconButton
                    size="large"
                    color="inherit"
                    aria-label="menu"
                    edge="start"
                    onClick={toggleDrawer(true)}
                    sx={{ mr: 2 }}
                  >
                    <MenuIcon />
                  </IconButton>
                </Toolbar> */}
              </Toolbar>
            </Container>
          </AppBar>
        </Box>
        <ImageList gap={0} cols={3} sx={{ float: "right" }}>
          {itemData.map((item) => (
            <ImageListItem
              key={item.img}
              sx={{
                position: "relative",
                overflow: "hidden",
                "&:hover img": {
                  transform: "scale(1.1)",
                  opacity: 0.5,
                },
                "&:hover .title-overlay": {
                  opacity: 1,
                },
                "&:hover .item-bar": {
                  opacity: 0,
                  visibility: "hidden",
                },
              }}
            >
              <Image
                // srcSet={`${item.img}`}
                src={`${item.img}`}
                alt={item.title}
                loading="lazy"
                width={500}
                height={10}
                style={{
                  height: '40vh',
                  width: "100%",
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                }}
              />
              <Box
                className="title-overlay"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                  background: "rgba(0, 0, 0, 0.6)",
                  padding: "5% 10%",
                  alignContent: "center",
                  height: "90%",
                  width: "90%",
                  borderRadius: 0,
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  fontSize: "xx-large",
                  textAlign: "center",
                  fontFamily: "monospace"
                }}
              >
                {item.title}
              </Box>
              <ImageListItemBar
                title={item.title}
                className="item-bar"
                sx={{
                  fontFamily: "monospace",
                  height: "7vh",
                  transition: "opacity 0.3s ease, visibility 0.3s ease",
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
        <Drawer
          open={open}
          onClose={toggleDrawer(false)}
          anchor="right"
        >
          <Box sx={{ width: "35vw" }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
              {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => ( */}
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AccountBalanceIcon />
                  </ListItemIcon>
                  <ListItemText primary={"LOGO"} />
                </ListItemButton>
              </ListItem>
              {/* ))} */}
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
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
