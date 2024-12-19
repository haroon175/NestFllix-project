import React from "react";
import { Box, Typography, Grid, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, YouTube } from "@mui/icons-material";
import Logo from '../../nest.png'
const Footer = () => {
    return (
        <Box
            sx={{
                backgroundColor: "#1c1c1c",
                color: "#fff",
                py: 4,
                px: 2,
                mt: "20px",
            }}
        >
            <Grid container spacing={4} justifyContent="center">
                {/* Navigation Links */}
                <Grid item xs={12} sm={4}>
                    <Box display="flex" alignItems="center" mb={2}>
                        <img
                            src={Logo}
                            alt="Logo"
                            style={{ width: '100px', height: '100px', marginRight: '10px' }}
                        />
                        
                    </Box>
                   
                </Grid>


                {/* Social Media Links */}
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" gutterBottom>
                        Follow Us
                    </Typography>
                    <Box>
                        <IconButton
                            href="https://facebook.com"
                            target="_blank"
                            color="inherit"
                            size="large"
                            aria-label="Facebook"
                        >
                            <Facebook />
                        </IconButton>
                        <IconButton
                            href="https://twitter.com"
                            target="_blank"
                            color="inherit"
                            size="large"
                            aria-label="Twitter"
                        >
                            <Twitter />
                        </IconButton>
                        <IconButton
                            href="https://instagram.com"
                            target="_blank"
                            color="inherit"
                            size="large"
                            aria-label="Instagram"
                        >
                            <Instagram />
                        </IconButton>
                        <IconButton
                            href="https://youtube.com"
                            target="_blank"
                            color="inherit"
                            size="large"
                            aria-label="YouTube"
                        >
                            <YouTube />
                        </IconButton>
                    </Box>
                </Grid>

                {/* Subscribe */}
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" gutterBottom>
                        Newsletter
                    </Typography>
                    <Typography variant="body2" mb={2}>
                        Subscribe to our newsletter for the latest updates.
                    </Typography>
                    <Link href="/subscribe" underline="none" color="inherit">
                        Subscribe Now
                    </Link>
                </Grid>
            </Grid>

            {/* Footer Bottom */}
            <Box mt={4} textAlign="center">
                <Typography variant="body2">
                    &copy; {new Date().getFullYear()} NestFllix. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default Footer;
