import React from "react";
import { useLocation } from "react-router-dom";
import { Typography, Container, Box } from "@mui/material";

const Video = () => {
    const location = useLocation();
    const { movie } = location.state || {};
    const { title, description, links } = movie || {};

    return (
        <Container sx={{ mt: 4 }}>
            {movie ? (
                <>

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

                    <Typography variant="h6" gutterBottom >
                        <span style={{ fontWeight: 'bold', color: '#950101' }}>Title</span>:  {movie.title || location.state?.title}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <span style={{ fontWeight: 'bold', color: '#950101' }}>Description</span>: {movie.description || 'Description not available'}
                    </Typography>
                </>
            ) : (
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
            )}
        </Container>
    );
};

export default Video;
