import React from "react";
import { useLocation } from "react-router-dom";
import { Typography, Container, Box } from "@mui/material";

const Video = () => {
    const location = useLocation();
    const { movie } = location.state || {};

    if (!movie) {
        return (
            <Typography
                variant="h5"
                sx={{
                    textAlign: "center",
                    color: "#950101",
                    mt: 4,
                }}
            >
                Movie data not found.
            </Typography>
        );
    }

    const { title, description, links, language } = movie;

    return (
        <Container sx={{ mt: 4 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <iframe
                    width="100%"
                    height="500"
                    src={links}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </Box>

            <Typography variant="h6" gutterBottom>
                <span style={{ fontWeight: 'bold', color: '#950101' }}>Title</span>: {title}
            </Typography>
            <Typography variant="body1" gutterBottom>
                <span style={{ fontWeight: 'bold', color: '#950101' }}>Description</span>: {description || 'Description not available'}
            </Typography>
        </Container>
    );
};

export default Video;