import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MovieCarousels = () => {
    const [hindiMovies, setHindiMovies] = useState([]);
    const [punjabiMovies, setPunjabiMovies] = useState([]);
    const [englishMovies, setEnglishMovies] = useState([]);
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const hindiResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/tmdb/hindi-movies`);
                const hindiData = await hindiResponse.json();
                setHindiMovies(hindiData.result || []);

                const punjabiResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/tmdb/punjabi-movies`);
                const punjabiData = await punjabiResponse.json();
                setPunjabiMovies(punjabiData.result || []);

                const englishResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/tmdb/english-movies`);
                const englishData = await englishResponse.json();
                setEnglishMovies(englishData.result || []);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);

    const handleWatchNow = (movie) => {
        navigate(`/videoPlay`, { state: { movie } });
    };

    const renderCarousel = (movies, id, title) => (
        <div className="mb-4">
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    margin: '20px 0',
                    fontWeight: 'bold',
                    color: '#950101',
                    fontFamily: 'Bebas Neue',
                    fontSize: '20px',                    
                }}
            >
                {title}
            </Typography>
            <div
                id={id}
                className="carousel slide"
                data-bs-ride="carousel"
                data-bs-wrap="true"
                style={{ width: "100%", margin: "0 auto" }}
            >
                <div className="carousel-inner" style={{ borderRadius: "20px" }}>
                    {movies.map((movie, index) => {
                        const groupSize = isMobile ? 2 : 4;
                        const isGroupStart = index % groupSize === 0;
                        const group = movies.slice(index, index + groupSize);

                        if (!isGroupStart) return null;

                        return (
                            <div
                                className={`carousel-item ${index === 0 ? "active" : ""}`}
                                key={`group-${index}`}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        gap: "10px",
                                        flexWrap: "wrap",
                                    }}
                                >
                                    {group.map((groupMovie) => (
                                        <div
                                            key={groupMovie.id}
                                            style={{
                                                flex: `1 1 calc(${isMobile ? "50%" : "25%"} - 10px)`,
                                                borderRadius: "20px",
                                                overflow: "hidden",
                                                position: "relative",
                                            }}
                                        >
                                            <img
                                                src={groupMovie.posterimage}
                                                className="d-block w-100"
                                                alt={groupMovie.title}
                                                style={{
                                                    height: "350px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    position: "absolute",
                                                    bottom: "10px",
                                                    left: "50%",
                                                    transform: "translateX(-50%)",
                                                    borderRadius: "20px",
                                                    backgroundColor: "#950101",
                                                    "&:hover": {
                                                        backgroundColor: "#800101",
                                                    },
                                                }}
                                                onClick={() => handleWatchNow(groupMovie)}
                                            >
                                                Watch
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target={`#${id}`}
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target={`#${id}`}
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

        </div>
    );

    return (
        <Container>
            <div className="mt-2">
                {renderCarousel(hindiMovies, "hindiCarousel", "Hindi мσνιєѕ")}
                {renderCarousel(englishMovies, "englishCarousel", "English мσνιєѕ")}
                {renderCarousel(punjabiMovies, "punjabiCarousel", "Punjabi мσνιєѕ")}
            </div>
        </Container>
    );
};

export default MovieCarousels;