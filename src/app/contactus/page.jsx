"use client"

import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Alert, AlertTitle, useMediaQuery, Snackbar, Grid } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import InputAdornment from '@mui/material/InputAdornment';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MessageIcon from '@mui/icons-material/Message';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SendIcon from '@mui/icons-material/Send';

const ContactUs = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        setIsSubmitting(true);
        e.preventDefault();
        const response = await fetch('/api/sendMail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            setSubmitSuccess(true);
            setIsSubmitting(false);
            setFormData({ fullName: "", email: "", message: "", phone: "" });
        } else {
            const errorData = await response.json();
            alert(`Hata: ${errorData.error || 'Mesaj gönderilirken bir hata oluştu.'}`);
            setIsSubmitting(false);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSubmitSuccess(false);
    };

    const textFieldStyles = {
        '& label': { color: 'black' },
        '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'black' },
            '&:hover fieldset': { borderColor: 'black' },
            '&.Mui-focused fieldset': { borderColor: 'black' },
        }
    };

    const DividerLine = () => (
        <Box
            sx={{
                width: '1px',
                height: '100px',
                backgroundColor: '#ccc',
                marginTop: '5px'
            }}
        />
    )

    return (
        <>
                <Container maxWidth="lg" sx={{ margin: 'auto' }}>
                    <Box sx={{ padding: { xs: 2, sm: 4 } }}>
                        <Grid
                            container
                            spacing={2}
                            alignItems="flex-start"
                            mt={4}
                            sx={{
                                textAlignLast: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Grid item xs={12} md={3}>
                                <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: 'inherit' }}>
                                    E-MAİL
                                </Typography>
                                <Box mt={1}>
                                    <Typography color="text.secondary" sx={{ fontFamily: 'inherit' }}>
                                        info@tasarimmimarlik.com
                                    </Typography>
                                </Box>
                            </Grid>
                            {!isSmallScreen && <DividerLine />}
                            <Grid item xs={12} md={3}>
                                <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontFamily: 'inherit' }}>
                                    TELEFON
                                </Typography>
                                <Box mt={1}>
                                    <Typography fontWeight="bold" sx={{ fontFamily: 'inherit' }}>
                                        Koray Kara
                                    </Typography>
                                    <Typography color="text.secondary" sx={{ fontFamily: 'inherit' }}>
                                        +90 (555) 555 5555
                                    </Typography>
                                </Box>
                            </Grid>
                            {!isSmallScreen && <DividerLine />}
                            <Grid item xs={12} md={3}>
                                <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontFamily: 'inherit' }}>
                                    ADRES
                                </Typography>
                                <Box mt={1}>
                                    <Typography color="text.secondary" sx={{ fontFamily: 'inherit' }}>
                                        Kavacık Mah. Yeni Sokak Vip Plaza
                                        <br />
                                        No:5 D:6 Kavacık-Beykoz / İstanbul
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                        <Typography
                            variant="h1"
                            align="center"
                            gutterBottom
                            sx={{
                                fontFamily: "inherit",
                                fontWeight: 500,
                                fontSize: isSmallScreen ? "2rem" : "3rem",
                                color: "black",
                                marginTop: isSmallScreen ? 5 : 5,
                            }}
                        >
                            Bize Ulaşın
                        </Typography>
                        <Typography
                            className='text-lg'
                            align="center"
                            gutterBottom
                            sx={{
                                color: "black",
                                marginBottom: isSmallScreen ? 4 : 5,
                                fontFamily: 'inherit'
                            }}
                        >
                            Projelerinizde Tasarım Mimarlık farkıyla yaratıcılık, inovasyon ve işlevsel tasarımlar görmek için bize ulaşın!
                        </Typography>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                                <TextField
                                    label="İsim Soyisim"
                                    type='text'
                                    name='fullName'
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required={true}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonIcon sx={{ color: 'black' }} />
                                                </InputAdornment>
                                            ),
                                            style: { color: 'black', backgroundColor: 'rgb(0 0 0 / 10%)', height: '5vh' }
                                        },
                                        inputLabel: {
                                            style: { color: 'black' },
                                        }
                                    }}
                                    sx={textFieldStyles}
                                />
                                <TextField
                                    label="E-posta"
                                    name="email"
                                    type="email"
                                    required={true}
                                    value={formData.email}
                                    onChange={handleChange}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailIcon sx={{ color: 'black' }} />
                                                </InputAdornment>
                                            ),
                                            style: { color: 'black', backgroundColor: 'rgb(0 0 0 / 10%)', height: '5vh' }
                                        },
                                        inputLabel: {
                                            style: { color: 'black' },
                                        }
                                    }}
                                    sx={textFieldStyles}
                                />
                                <TextField
                                    label="Telefon"
                                    name="phone"
                                    type='tel'
                                    required={true}
                                    value={formData.phone}
                                    onChange={handleChange}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LocalPhoneIcon sx={{ color: 'black' }} />
                                                </InputAdornment>
                                            ),
                                            style: { color: 'black', backgroundColor: 'rgb(0 0 0 / 10%)', height: '5vh' }
                                        },
                                        inputLabel: {
                                            style: { color: 'black' },
                                        }
                                    }}
                                    sx={textFieldStyles}
                                />
                                <TextField
                                    label="Mesaj"
                                    name="message"
                                    required={true}
                                    value={formData.message}
                                    onChange={handleChange}
                                    multiline
                                    rows={4}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <MessageIcon sx={{ color: 'black' }} />
                                                </InputAdornment>
                                            ),
                                            style: { color: 'black', backgroundColor: 'rgb(0 0 0 / 10%)' }
                                        },
                                        inputLabel: {
                                            style: { color: 'black' },
                                        }
                                    }}
                                    sx={textFieldStyles}
                                />
                            </div>

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                endIcon={<SendIcon />}
                                disabled={isSubmitting}
                                sx={{
                                    backgroundColor: 'silver'
                                }}
                            >
                                {isSubmitting ? "Gönderiliyor..." : "Gönder"}
                            </Button>
                        </form>

                        <Snackbar
                            open={submitSuccess}
                            autoHideDuration={3000}
                            onClose={handleClose}
                        >
                            <Alert
                                icon={<CheckCircleIcon fontSize="small" />}
                                severity="success"
                                variant="filled"
                            >
                                <AlertTitle>Başarılı</AlertTitle>
                                Mesajınız başarıyla iletildi. En kısa sürede sizinle iletişime geçeceğiz.
                            </Alert>
                        </Snackbar>
                    </Box>
                </Container>
       
        </>
    );
};

export default ContactUs;
