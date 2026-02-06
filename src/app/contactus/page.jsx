"use client"

import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Alert, AlertTitle, useMediaQuery, Snackbar, Grid } from '@mui/material';
import ScrollReveal from '../components/ScrollReveal';
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
        '& label': { color: 'var(--color-text-secondary)' },
        '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'var(--color-border)' },
            '&:hover fieldset': { borderColor: 'var(--color-primary-dark)' },
            '&.Mui-focused fieldset': { borderColor: 'var(--color-primary-dark)' },
        }
    };

    const DividerLine = () => (
        <Box
            sx={{
                width: '1px',
                height: '100px',
                backgroundColor: 'var(--color-border)',
                marginTop: '5px'
            }}
        />
    )

    return (
        <>
                <Container maxWidth="lg" sx={{ margin: 'auto' }}>
                    <Box sx={{ padding: { xs: 2, sm: 4 } }}>
                        <ScrollReveal direction="up">
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
                                <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: 'inherit', color: 'var(--color-dark)', letterSpacing: '0.1em' }}>
                                    E-MAİL
                                </Typography>
                                <Box mt={1}>
                                    <Typography sx={{ fontFamily: 'inherit', color: 'var(--color-text-secondary)' }}>
                                        info@tasarimmimarlik.com
                                    </Typography>
                                </Box>
                            </Grid>
                            {!isSmallScreen && <DividerLine />}
                            <Grid item xs={12} md={3}>
                                <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontFamily: 'inherit', color: 'var(--color-dark)', letterSpacing: '0.1em' }}>
                                    TELEFON
                                </Typography>
                                <Box mt={1}>
                                    <Typography fontWeight="bold" sx={{ fontFamily: 'inherit', color: 'var(--color-dark)' }}>
                                        Koray Kara
                                    </Typography>
                                    <Typography sx={{ fontFamily: 'inherit', color: 'var(--color-text-secondary)' }}>
                                        +90 (555) 555 5555
                                    </Typography>
                                </Box>
                            </Grid>
                            {!isSmallScreen && <DividerLine />}
                            <Grid item xs={12} md={3}>
                                <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontFamily: 'inherit', color: 'var(--color-dark)', letterSpacing: '0.1em' }}>
                                    ADRES
                                </Typography>
                                <Box mt={1}>
                                    <Typography sx={{ fontFamily: 'inherit', color: 'var(--color-text-secondary)' }}>
                                        Kavacık Mah. Yeni Sokak Vip Plaza
                                        <br />
                                        No:5 D:6 Kavacık-Beykoz / İstanbul
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                        </ScrollReveal>
                        <ScrollReveal direction="up" delay={0.1}>
                        <Typography
                            variant="h1"
                            align="center"
                            gutterBottom
                            sx={{
                                fontFamily: "inherit",
                                fontWeight: 500,
                                fontSize: isSmallScreen ? "2rem" : "3rem",
                                color: "var(--color-dark)",
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
                                color: "var(--color-text-secondary)",
                                marginBottom: isSmallScreen ? 4 : 5,
                                fontFamily: 'inherit'
                            }}
                        >
                            Projelerinizde Tasarım Mimarlık farkıyla yaratıcılık, inovasyon ve işlevsel tasarımlar görmek için bize ulaşın!
                        </Typography>
                        </ScrollReveal>
                        <ScrollReveal direction="up" delay={0.2}>
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
                                                    <PersonIcon sx={{ color: 'var(--color-primary-dark)' }} />
                                                </InputAdornment>
                                            ),
                                            style: { color: 'var(--color-dark)', backgroundColor: 'var(--color-input-bg)', height: '5vh' }
                                        },
                                        inputLabel: {
                                            style: { color: 'var(--color-text-secondary)' },
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
                                                    <EmailIcon sx={{ color: 'var(--color-primary-dark)' }} />
                                                </InputAdornment>
                                            ),
                                            style: { color: 'var(--color-dark)', backgroundColor: 'var(--color-input-bg)', height: '5vh' }
                                        },
                                        inputLabel: {
                                            style: { color: 'var(--color-text-secondary)' },
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
                                                    <LocalPhoneIcon sx={{ color: 'var(--color-primary-dark)' }} />
                                                </InputAdornment>
                                            ),
                                            style: { color: 'var(--color-dark)', backgroundColor: 'var(--color-input-bg)', height: '5vh' }
                                        },
                                        inputLabel: {
                                            style: { color: 'var(--color-text-secondary)' },
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
                                                    <MessageIcon sx={{ color: 'var(--color-primary-dark)' }} />
                                                </InputAdornment>
                                            ),
                                            style: { color: 'var(--color-dark)', backgroundColor: 'var(--color-input-bg)' }
                                        },
                                        inputLabel: {
                                            style: { color: 'var(--color-text-secondary)' },
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
                                    backgroundColor: 'var(--color-dark)',
                                    color: 'var(--color-primary-light)',
                                    letterSpacing: '0.1em',
                                    py: 1.5,
                                    '&:hover': {
                                        backgroundColor: 'var(--color-dark-soft)',
                                    }
                                }}
                            >
                                {isSubmitting ? "Gönderiliyor..." : "Gönder"}
                            </Button>
                        </form>
                        </ScrollReveal>

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
