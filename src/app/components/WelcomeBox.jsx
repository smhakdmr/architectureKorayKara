"use client";

import {
    Box,
    Typography,
    useMediaQuery
} from "@mui/material";

const WelcomeBox = () => {
    
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    
    return (
        <Box
            sx={{
                position: "relative",
                background: `url('/mimarlik4.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '80vw',
                height: '60vh',
                justifySelf: "center",
                marginTop: '3vh'
            }}>
            <Box
                sx={{
                    position: 'absolute',
                    bottom: isSmallScreen ? '15px' : '50px',
                    left: isSmallScreen ? '15px' : '50px',
                    backgroundColor: 'white',
                    padding: '40px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    width: isSmallScreen ? '300px' : '20vw',
                    height: isSmallScreen ? '30vh' : '35vh'
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px', fontFamily: "inherit" }}>
                    Tasarım Mimarlık
                </Typography>
                <Typography variant="body3" sx={{ fontFamily: "inherit" }}>
                    Tasarım Mimarlık, kentsel tasarım kollarında yenilikçi ve ilerici bir düşünce ve zihniyet anlayışını işbirlikçi
                    tasarım uygulamalarıyla yakalama arayışı içinde 2013 yılında kurulmuştur.
                </Typography>
            </Box>
        </Box>
    );
};

export default WelcomeBox;
