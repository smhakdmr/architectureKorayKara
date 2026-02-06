"use client"

import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Container, Alert, AlertTitle, useMediaQuery, Grid } from '@mui/material';
import ScrollReveal from '../components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import InputAdornment from '@mui/material/InputAdornment';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MessageIcon from '@mui/icons-material/Message';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SendIcon from '@mui/icons-material/Send';

const ContactUs = ({ showTitle = true }) => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        message: ""
    });

    const formatPhone = (value) => {
        const digits = value.replace(/\D/g, '').slice(0, 11);
        if (digits.length === 0) return '';
        if (digits.length <= 1) return digits;
        if (digits.length <= 4) return `${digits[0]} (${digits.slice(1)}`;
        if (digits.length <= 7) return `${digits[0]} (${digits.slice(1, 4)}) ${digits.slice(4)}`;
        if (digits.length <= 9) return `${digits[0]} (${digits.slice(1, 4)}) ${digits.slice(4, 7)} ${digits.slice(7)}`;
        return `${digits[0]} (${digits.slice(1, 4)}) ${digits.slice(4, 7)} ${digits.slice(7, 9)} ${digits.slice(9, 11)}`;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handlePhoneChange = (e) => {
        const formatted = formatPhone(e.target.value);
        setFormData((prev) => ({ ...prev, phone: formatted }));
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

    const handleClose = () => {
        setSubmitSuccess(false);
    };

    useEffect(() => {
        if (submitSuccess) {
            const timer = setTimeout(() => setSubmitSuccess(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [submitSuccess]);

    const textFieldStyles = {
        '& label': { color: 'var(--color-text-muted)', fontSize: '0.9rem' },
        '& label.Mui-focused': { color: 'var(--color-primary-dark)' },
        '& .MuiOutlinedInput-root': {
            borderRadius: '2px',
            transition: 'box-shadow 0.3s ease',
            '& fieldset': { borderColor: 'var(--color-border-light)' },
            '&:hover fieldset': { borderColor: 'var(--color-primary)' },
            '&.Mui-focused fieldset': { borderColor: 'var(--color-primary-dark)', borderWidth: '1.5px' },
            '&.Mui-focused': { boxShadow: '0 0 0 3px rgba(207, 187, 176, 0.15)' },
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
                <Container maxWidth="lg" sx={{ margin: 'auto', paddingTop: { xs: 3, sm: 4 }, paddingBottom: { xs: 5, sm: 8 } }}>
                    <Box sx={{ padding: { xs: 2, sm: 4 } }}>
                        {showTitle && (
                        <ScrollReveal direction="up">
                        <Typography
                            variant={isSmallScreen ? "h4" : "h3"}
                            sx={{
                                fontFamily: "inherit",
                                color: "var(--color-dark)",
                                letterSpacing: '0.03em',
                                mb: 4,
                            }}
                        >
                            İletişim
                        </Typography>
                        </ScrollReveal>
                        )}
                        <ScrollReveal direction="up" delay={0.05}>
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
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{
                                backgroundColor: 'var(--color-light)',
                                p: { xs: 3, sm: 5 },
                                borderRadius: '2px',
                                border: '1px solid var(--color-border-light)',
                            }}
                        >
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
                                                    <PersonIcon sx={{ color: 'var(--color-primary-dark)', fontSize: 20 }} />
                                                </InputAdornment>
                                            ),
                                            style: { color: 'var(--color-dark)', backgroundColor: 'var(--color-white)', height: '48px' }
                                        },
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
                                                    <EmailIcon sx={{ color: 'var(--color-primary-dark)', fontSize: 20 }} />
                                                </InputAdornment>
                                            ),
                                            style: { color: 'var(--color-dark)', backgroundColor: 'var(--color-white)', height: '48px' }
                                        },
                                    }}
                                    sx={textFieldStyles}
                                />
                                <TextField
                                    label="Telefon"
                                    name="phone"
                                    type='text'
                                    placeholder='0 (5XX) XXX XX XX'
                                    required={true}
                                    value={formData.phone}
                                    onChange={handlePhoneChange}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LocalPhoneIcon sx={{ color: 'var(--color-primary-dark)', fontSize: 20 }} />
                                                </InputAdornment>
                                            ),
                                            inputMode: 'tel',
                                            style: { color: 'var(--color-dark)', backgroundColor: 'var(--color-white)', height: '48px' }
                                        },
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
                                            style: { color: 'var(--color-dark)', backgroundColor: 'var(--color-white)' }
                                        },
                                    }}
                                    sx={textFieldStyles}
                                />
                            </div>

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                endIcon={<SendIcon sx={{ fontSize: 18, transition: 'transform 0.3s ease' }} />}
                                disabled={isSubmitting}
                                sx={{
                                    mt: 3,
                                    backgroundColor: 'var(--color-dark)',
                                    color: 'var(--color-primary-light)',
                                    letterSpacing: '0.1em',
                                    py: 1.5,
                                    borderRadius: '2px',
                                    fontSize: '0.9rem',
                                    fontWeight: 500,
                                    boxShadow: 'none',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: 'var(--color-dark-soft)',
                                        boxShadow: '0 4px 16px rgba(26, 26, 26, 0.2)',
                                        '& .MuiButton-endIcon svg': {
                                            transform: 'translateX(4px)',
                                        }
                                    },
                                    '&.Mui-disabled': {
                                        backgroundColor: 'var(--color-border)',
                                        color: 'var(--color-text-muted)',
                                    }
                                }}
                            >
                                {isSubmitting ? "Gönderiliyor..." : "Gönder"}
                            </Button>

                            <AnimatePresence>
                                {submitSuccess && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                        animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <Alert
                                            icon={<CheckCircleIcon fontSize="small" />}
                                            severity="success"
                                            onClose={handleClose}
                                            sx={{
                                                borderRadius: '2px',
                                                backgroundColor: 'rgba(46, 125, 50, 0.08)',
                                                color: '#2e7d32',
                                                border: '1px solid rgba(46, 125, 50, 0.4)',
                                                '& .MuiAlert-icon': { color: '#2e7d32' },
                                            }}
                                        >
                                            <AlertTitle sx={{ fontWeight: 600 }}>Başarılı</AlertTitle>
                                            Mesajınız başarıyla iletildi. En kısa sürede sizinle iletişime geçeceğiz.
                                        </Alert>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Box>
                        </ScrollReveal>
                    </Box>
                </Container>
       
        </>
    );
};

export default ContactUs;
