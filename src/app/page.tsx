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
  Typography,
  useMediaQuery
} from "@mui/material";
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useState } from "react";
import { useTheme, styled } from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

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

  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPhoto, setModalPhoto] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = steps.length;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const GradientBox = styled(Box)(({ theme }) => ({
    backgroundColor: "#CFBBB0",
    padding: theme.spacing(6, 0),
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
    <div>
      <main>
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
        <Box
          sx={{
            background: `
            linear-gradient(to bottom, rgb(0, 0, 0, 0) 60%, #3A3A3C 100%),
            url('/homePage1.png')
          `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            position: 'relative',
          }}
        >
          <Typography
            variant={isSmallScreen ? "h3" : "h2"}
            sx={{
              position: "absolute",
              width: "50vw",
              top: isSmallScreen ? "20%" : "30%",
              left: "15%",
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
              width: isSmallScreen ? "80vw" : "45vw",
              top: isSmallScreen ? "32%" : "50%",
              left: "15%",
              color: "white",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              fontSize: "1rem"
            }}
          >
            Açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama
            açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama
            açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama
            açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama açıklama
          </Typography>
          <Box
            sx={{
              position: "absolute", // Sayfanın tamamında sabit kalmasını sağlar
              color: "white",
              width: "20vw",
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
            <KeyboardDoubleArrowDownIcon sx={{ width: "2em", height: "2em" }} />
          </Box>
        </Box>
        <Box
          sx={{
            scrollSnapAlign: 'start',
            paddingTop: '10vh',
            backgroundColor: "#3A3A3C",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontFamily: "inherit",
              fontWeight: 600,
              fontSize: "3rem",
              marginLeft: "5vw",
              color: "white"
            }}
          >
            Güncel Projelerimiz
          </Typography>
          <ImageList
            gap={8}
            cols={isSmallScreen ? 2 : 3}
            sx={{
              justifySelf: "center",
              width: '95vw',
              padding: 5
            }}
          >
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
                <img
                  // asrcSet={`${item.img}`}
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    transition: "transform 0.3s ease, opacity 0.3s ease",
                  }}
                  onClick={(e) => {
                    debugger
                    setModalPhoto(item.img)
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
                    fontSize: isSmallScreen ? "x-large" : "xx-large",
                    textAlign: "center",
                    fontFamily: "monospace"
                  }}
                  onClick={() => {
                    setModalPhoto(item.img)
                    setIsModalOpen(true)
                  }}
                >
                  {item.title}
                </Box>
              </ImageListItem>
            ))}
          </ImageList>
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
            width: isSmallScreen ? '95vw' : '70vw',
            maxHeight: '90vh', // Taşma durumunda yüksekliği sınırlandırır
            overflowY: 'auto', // Y ekseninde kaydırmayı etkinleştirir
            bgcolor: 'background.paper',
            boxShadow: 20,
            p: isSmallScreen ? 2 : 4,
          }}>
            <IconButton
              onClick={() => setIsModalOpen(false)}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: 'gray', // İsteğe bağlı renk
              }}
            >
              <CloseIcon />
            </IconButton>
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Box sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      height: isSmallScreen ? '40vh' : '60vh',
                      maxWidth: isSmallScreen ? '100vw' : '60vw',
                      width: '100%',
                    }}
                  >
                    <img
                      src={modalPhoto}
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
              <Grid item xs={12} md={4} >
                <Typography
                  variant={isSmallScreen ? "h5" : "h4"}
                  sx={{
                    marginBottom: '1vh',
                    marginTop: isSmallScreen ? '-30px' : '32px'
                  }}>
                  <strong>A.M.Ö. EVİ</strong>
                </Typography>
                <Typography variant={isSmallScreen ? "h6" : "h5"} sx={{
                  color: '#999',
                  fontWeight: '400',
                  marginBottom: '3vh'
                }}>
                  ŞİLE-İSTANBUL
                </Typography>
                <Typography variant={isSmallScreen ? "body2" : "body1"}
                  sx={{
                    marginBottom: '1vh',
                    marginTop: '1vh'
                  }}
                >
                  <strong>Konum:</strong> <a style={{ float: "right" }}>Çavuş Mah.</a>
                </Typography>
                <Divider />
                <Typography variant={isSmallScreen ? "body2" : "body1"}
                  sx={{
                    marginBottom: '1vh',
                    marginTop: '1vh'
                  }}>
                  <strong>Tarih:</strong> <a style={{ float: "right" }}>2021</a>
                </Typography>
                <Divider />
                <Typography variant={isSmallScreen ? "body2" : "body1"}
                  sx={{
                    marginBottom: '1vh',
                    marginTop: '1vh'
                  }}>
                  <strong>Parsel Alanı:</strong> <a style={{ float: "right" }}>501.33 m²</a>
                </Typography>
                <Divider />
                <Typography variant={isSmallScreen ? "body2" : "body1"}
                  sx={{
                    marginBottom: '1vh',
                    marginTop: '1vh'
                  }}>
                  <strong>Yapı Alanı:</strong> <a style={{ float: "right" }}>226.84 m²</a>
                </Typography>
                <Divider />
                <Typography variant={isSmallScreen ? "body2" : "body1"}
                  sx={{
                    marginBottom: '1vh',
                    marginTop: '1vh'
                  }}>
                  <strong>Oda Sayısı:</strong> <a style={{ float: "right" }}>5+1</a>
                </Typography>
                <Divider />
                <Typography variant={isSmallScreen ? "body2" : "body1"}
                  sx={{
                    marginBottom: '1vh',
                    marginTop: '1vh'
                  }}>
                  <strong>Tip:</strong><a style={{ float: "right" }}> Dubleks Villa + Havuz</a>
                </Typography>
                <Divider />
                <Typography variant={isSmallScreen ? "body2" : "body1"}
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
      </main>
      <footer>
        <GradientBox>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
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
                mt: 4,
                pt: 2,
                borderTop: "1px solid rgba(0,0,0,0.1)",
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "#000", opacity: 0.7 }}
              >
                © 2024 Your Company. All rights reserved.
              </Typography>
            </Box>
          </Container>
        </GradientBox>
      </footer>
    </div>
  );
}
