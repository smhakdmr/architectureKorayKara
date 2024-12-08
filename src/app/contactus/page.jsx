"use client"

import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Alert, AlertTitle, useMediaQuery, Snackbar } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import InputAdornment from '@mui/material/InputAdornment';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MessageIcon from '@mui/icons-material/Message';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SendIcon from '@mui/icons-material/Send';

const ContactUs = () => {

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
            setFormData({ name: '', email: '', message: '', phone: '' });
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

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    return (
        <>
            <Box
                sx={{
                    background: `linear-gradient(to bottom, #181818 7%, rgba(0, 0, 0, 0) 50%, #181818 93%),
                    url('/contactUs4.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: isSmallScreen ? '80vh' : '70vh',
                    position: 'relative',
                    scrollSnapAlign: 'start',
                    paddingTop: '5vh',
                    paddingBottom: '5vh',
                }}
            >
                <Container maxWidth="lg" sx={{ margin: 'auto' }}>
                    <Box sx={{ padding: { xs: 2, sm: 4 } }}>
                        <Typography
                            variant="h1"
                            align="center"
                            gutterBottom
                            sx={{
                                fontFamily: "inherit",
                                fontWeight: 500,
                                fontSize: isSmallScreen ? "2rem" : "3rem",
                                color: "white",
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
                                color: "white",
                                margin: isSmallScreen ? 1 : 5,
                                marginBottom: isSmallScreen ? 4 : 5
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
                                                    <PersonIcon sx={{ color: 'white' }} />
                                                </InputAdornment>
                                            ),
                                            style: { color: 'white', backgroundColor: '#00000042', height: '5vh' }
                                        },
                                        inputLabel: {
                                            style: { color: 'white' },
                                        }
                                    }}
                                    sx={{
                                        '& label': {
                                            color: 'white', // Label rengi
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'white', // Varsayılan border rengi
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'white', // Hover border rengi
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'white', // Focus border rengi
                                            },
                                        },
                                    }}
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
                                                    <EmailIcon sx={{ color: 'white' }} />
                                                </InputAdornment>
                                            ),
                                            style: { color: 'white', backgroundColor: '#00000042', height: '5vh' }
                                        },
                                        inputLabel: {
                                            style: { color: 'white' },
                                        }
                                    }}
                                    sx={{
                                        '& label': {
                                            color: 'white', // Label rengi
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'white', // Varsayılan border rengi
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'white', // Hover border rengi
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'white', // Focus border rengi
                                            },
                                        },
                                    }}
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
                                                    <LocalPhoneIcon sx={{ color: 'white' }} />
                                                </InputAdornment>
                                            ),
                                            style: { color: 'white', backgroundColor: '#00000042', height: '5vh' }
                                        },
                                        inputLabel: {
                                            style: { color: 'white' },
                                        }
                                    }}
                                    sx={{
                                        '& label': {
                                            color: 'white', // Label rengi
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'white', // Varsayılan border rengi
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'white', // Hover border rengi
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'white', // Focus border rengi
                                            },
                                        },
                                    }}
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
                                                    <MessageIcon sx={{ color: 'white' }} />
                                                </InputAdornment>
                                            ),
                                            style: { color: 'white', backgroundColor: '#00000042' }
                                        },
                                        inputLabel: {
                                            style: { color: 'white' },
                                        }
                                    }}
                                    sx={{
                                        '& label': {
                                            color: 'white', // Label rengi
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'white', // Varsayılan border rengi
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'white', // Hover border rengi
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'white', // Focus border rengi
                                            },
                                        },
                                    }}
                                />
                            </div>

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                endIcon={<SendIcon />}
                                disabled={isSubmitting}
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
            </Box>
        </>
    );
};

export default ContactUs;
