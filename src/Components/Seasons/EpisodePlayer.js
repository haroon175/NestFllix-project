import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Container, Box, Button, Grid, Card, CardContent } from "@mui/material";

const EpisodePlayer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedEpisode, remainingEpisodes } = location.state || {};

    const [currentEpisode, setCurrentEpisode] = useState(selectedEpisode);

    if (!currentEpisode) {
        return (
            <Typography
                variant="h5"
                sx={{
                    textAlign: "center",
                    color: "#950101",
                    mt: 4,
                }}
            >
                No episode selected.
            </Typography>
        );
    }

    return (
        <Container sx={{ marginTop: "20px" }}>
            <Button
                variant="contained"
                sx={{ backgroundColor: "#950101", marginBottom: "5px" }}
                onClick={() => navigate("/all/Seasons")}
            >
                Back
            </Button>

            <Grid container spacing={3}>
                {/* Left Column: Video Player */}
                <Grid item xs={12} md={8}>
                    <Box
                        sx={{
                            position: "relative",
                            width: "100%",
                            height: 0,
                            paddingTop: "56.25%",
                        }}
                    >
                        <iframe
                            src={currentEpisode.links}
                            title={currentEpisode.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                border: "1px solid #950101",
                                borderRadius: "20px",
                            }}
                        ></iframe>
                    </Box>

                    <Typography variant="h6" gutterBottom sx={{ marginTop: "10px", wordWrap: "break-word" }}>
                        <span style={{ fontWeight: "bold", color: "#950101" }}>Title</span>: {currentEpisode.title} ||  <span style={{ fontWeight: "bold", color: "#950101" }}>Episode no</span>: {currentEpisode.episodeNumber}
                    </Typography>                    
                </Grid>

                {/* Right Column: Remaining Episodes */}
                <Grid item xs={12} md={4}>
                    <Typography variant="h5" sx={{ color: "#950101", marginBottom: "10px", fontWeight: "bold" }}>
                        Remaining Episodes
                    </Typography>

                    <Box
                        sx={{
                            border: "2px solid #950101",
                            borderRadius: "8px",
                            overflowY: "auto",
                            maxHeight: "450px",
                            padding: "16px",
                            backgroundColor: "black",
                            "&::-webkit-scrollbar": {
                                width: "8px",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "black",
                                borderRadius: "4px",
                            },
                            "&::-webkit-scrollbar-track": {
                                backgroundColor: "transparent",
                            },
                        }}
                    >
                        {remainingEpisodes.map((episode) => (
                            <Card
                                key={episode._id}
                                sx={{
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    marginBottom: "10px",
                                    backgroundColor: "black",
                                    border: "1px solid #950101",
                                }}
                                onClick={() => setCurrentEpisode(episode)}
                            >
                                <img
                                        src={episode.poster}
                                        alt={episode.title}
                                        style={{
                                            width: 80,
                                            height: "auto",
                                            borderRadius: "8px",
                                            marginRight: "10px",
                                        }}
                                    />
                                <CardContent>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{ color: "#950101", fontWeight: "bold" }}
                                    >
                                        {episode.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ color: "#950101" }}
                                    >
                                        Episode: {episode.episodeNumber}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default EpisodePlayer;
