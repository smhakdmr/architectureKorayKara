"use client";

import {
  AppBar,
  Box,
  Button,
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
  MobileStepper,
  Modal,
  Toolbar,
  Typography
} from "@mui/material";
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useState } from "react";
import Image from "next/image";
import { useTheme } from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

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
const steps = [
  {
    label: 'Select campaign settings',
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: 'Create an ad group',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    label: 'Create an ad',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];


export default function Home() {

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = steps.length;
  const theme = useTheme();

  return (
    <div>
      <main>

        <Box sx={{ flexGrow: 1 }}>
          <AppBar sx={{ background: "#000000bf" }}>
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
                  onClick={() => { setOpen(true) }}
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
              </Toolbar>
            </Container>
          </AppBar>
        </Box>
        <Box
          sx={{
            height: '100vh',
            overflowY: 'scroll',
            scrollSnapType: 'y mandatory', // Dikey eksende snap
            scrollBehavior: 'smooth'
          }}
        >
          <Box
            sx={{
              height: '100vh',
              backgroundImage: `url('/homePage1.png')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover", // Görseli kutuya sığacak şekilde ölçekler.
              backgroundPosition: "center", // Görseli merkeze hizalar.
              // opacity: 0.8,
              scrollSnapAlign: 'start',
            }}
          >
            <Typography
              variant="h2"
              sx={{
                position: "absolute",
                width: "50vw",
                top: "40%",
                left: "10%",
                color: "white",
                fontWeight: 600
              }}
            >
              BAŞLIK
            </Typography>
            <Typography
              variant="body1"
              sx={{
                position: "absolute",
                width: "45vw",
                top: "50%",
                left: "10%",
                color: "white",
                fontFamily: "'Poppins', sans-serif"
              }}
            >
              Açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama
              açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama
              açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama
              açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama
            </Typography>
            <Box
              sx={{
                position: "fixed", // Sayfanın tamamında sabit kalmasını sağlar
                color: "white",
                width: "10vw",
                bottom: "5vh", // Sayfanın altından 5vh yukarıda
                left: "50%", // Yatayda ortalamak için
                transform: "translateX(-50%)", // Ortalamayı tam yapmak için
                textAlign: "center",
                fontWeight: "bold",
                animation: "bounce 2s infinite", // Animasyonu ekledik
                "@keyframes bounce": {
                  "0%, 100%": {
                    transform: "translate(-50%, 0)", // Başlangıç ve bitiş pozisyonu
                  },
                  "50%": {
                    transform: "translate(-50%, -10px)", // Yukarı çıkış pozisyonu
                  },
                },
              }}
            >
              <Typography>
                Projelerimiz için kaydırınız
              </Typography>
              <ArrowDropDownIcon sx={{width: "2em", height: "2em"}} />
            </Box>
          </Box>
          <Box sx={{ scrollSnapAlign: 'start', paddingTop: '10vh' }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: "inherit",
                fontWeight: 600,
                fontSize: "2.5rem",
                marginLeft: "5vw",
                marginBottom: "2vh"
              }}
            >
              Güncel Projeler
            </Typography>
            <ImageList gap={10} cols={3} sx={{ justifySelf: "center" }}>
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
                    // asrcSet={`${item.img}`}
                    src={`${item.img}`}
                    alt={item.title}
                    loading="lazy"
                    width={500}
                    height={10}
                    style={{
                      height: '30vh',
                      width: "30vw",
                      transition: "transform 0.3s ease, opacity 0.3s ease",
                    }}
                    onClick={() => {
                      setIsModalOpen(true)
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
                    onClick={() => {
                      setIsModalOpen(true)
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
          </Box>
        </Box>
        <Modal
          open={isModalOpen}
          onClose={() => { setIsModalOpen(false) }}
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '70vw',
            height: '80vh',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Box sx={{ flexGrow: 1 }}>
                  <Box sx={{ height: '60vh', maxWidth: '60vw', width: '100%', p: 2 }}>
                    <img
                      src={itemData[activeStep].img}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Box>
                  <MobileStepper
                    sx={{
                      width: '50%',
                      justifySelf: "center"
                    }}
                    variant="dots"
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                      <Button
                        size="large"
                        onClick={() => {
                          setActiveStep((prevActiveStep) => prevActiveStep + 1)
                        }}
                        disabled={activeStep === maxSteps - 1}
                      >
                        {theme.direction === 'rtl' ? (
                          <KeyboardArrowLeft />
                        ) : (
                          <KeyboardArrowRight />
                        )}
                      </Button>
                    }
                    backButton={
                      <Button
                        size="large"
                        onClick={() => {
                          setActiveStep((prevActiveStep) => prevActiveStep - 1);
                        }}
                        disabled={activeStep === 0}
                      >
                        {theme.direction === 'rtl' ? (
                          <KeyboardArrowRight />
                        ) : (
                          <KeyboardArrowLeft />
                        )}
                      </Button>
                    }
                  />
                </Box>
              </Grid>
              {/* Sağ taraf (Detaylar) */}
              <Grid item xs={12} md={4}>
                <Typography variant="h4"
                  sx={{
                    marginBottom: '1vh'
                  }}>
                  <strong>A.M.Ö. EVİ</strong>
                </Typography>
                <Typography variant="h5" sx={{
                  color: '#999',
                  fontWeight: '400',
                  marginBottom: '3vh'
                }}>
                  ŞİLE-İSTANBUL
                </Typography>
                <Typography variant="body1"
                  sx={{
                    marginBottom: '1vh',
                    marginTop: '1vh'
                  }}
                >
                  <strong>Konum:</strong> <a style={{ float: "right" }}>Çavuş Mah.</a>
                </Typography>
                <Divider />
                <Typography variant="body1"
                  sx={{
                    marginBottom: '1vh',
                    marginTop: '1vh'
                  }}>
                  <strong>Tarih:</strong> <a style={{ float: "right" }}>2021</a>
                </Typography>
                <Divider />
                <Typography variant="body1"
                  sx={{
                    marginBottom: '1vh',
                    marginTop: '1vh'
                  }}>
                  <strong>Parsel Alanı:</strong> <a style={{ float: "right" }}>501.33 m²</a>
                </Typography>
                <Divider />
                <Typography variant="body1"
                  sx={{
                    marginBottom: '1vh',
                    marginTop: '1vh'
                  }}>
                  <strong>Yapı Alanı:</strong> <a style={{ float: "right" }}>226.84 m²</a>
                </Typography>
                <Divider />
                <Typography variant="body1"
                  sx={{
                    marginBottom: '1vh',
                    marginTop: '1vh'
                  }}>
                  <strong>Oda Sayısı:</strong> <a style={{ float: "right" }}>5+1</a>
                </Typography>
                <Divider />
                <Typography variant="body1"
                  sx={{
                    marginBottom: '1vh',
                    marginTop: '1vh'
                  }}>
                  <strong>Tip:</strong><a style={{ float: "right" }}> Dubleks Villa + Havuz</a>
                </Typography>
                <Divider />
                <Typography variant="body1"
                  sx={{
                    marginBottom: '1vh',
                    marginTop: '1vh'
                  }}>
                  <strong>Durum:</strong> <a style={{ float: "right" }}>Tamamlanmış</a>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Modal>
        <Drawer
          open={open}
          onClose={() => { setOpen(false) }}
          anchor="right"
        >
          <Box sx={{ width: "35vw" }} role="presentation" onClick={() => { setOpen(false) }}>
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
