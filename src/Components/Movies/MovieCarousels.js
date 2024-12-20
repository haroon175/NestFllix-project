import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MovieCarousels = () => {
    const [hindiMovies, setHindiMovies] = useState([]);
    const [punjabiMovies, setPunjabiMovies] = useState([]);
    const NGROK_URL = 'https://sponsorship-units-welcome-illinois.trycloudflare.com';
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const hindiResponse = await fetch(`${NGROK_URL}/api/movies/hindi/movies`);
                const hindiData = await hindiResponse.json();
                setHindiMovies(hindiData);

                const punjabiResponse = await fetch(`${NGROK_URL}/api/movies/punjabi/movies`);
                const punjabiData = await punjabiResponse.json();
                setPunjabiMovies(punjabiData);
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
        <div className="col-md-6 d-flex flex-column align-items-center">
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    textAlign: "center",
                    margin: "20px 0",
                    fontWeight: "bold",
                    color: "#950101",
                    fontFamily: "Bebas Neue",
                }}
            >
                {title}
            </Typography>
            <div
                id={id}
                className="carousel slide"
                data-bs-ride="carousel"
                style={{ width: "370px", height: "350px" }}
            >
                <div className="carousel-inner" style={{ borderRadius: "20px" }}>
                    {movies.map((movie, index) => (
                        <div
                            className={`carousel-item ${index === 0 ? "active" : ""}`}
                            key={movie.id}
                        >
                            <img
                                src={movie.posterimage}
                                className="d-block w-100"
                                alt={movie.title}
                                style={{ height: "350px" }}
                            />
                            <div className="carousel-caption d-none d-md-block">
                                <Button
                                    variant="contained"
                                    sx={{
                                        position: 'absolute',
                                        bottom: '20px',
                                        left: '50%',
                                        borderRadius: '20px',
                                        transform: 'translateX(-50%)',
                                        backgroundColor: '#950101',
                                        '&:hover': {
                                            backgroundColor: '#800101',
                                        },
                                    }}
                                    onClick={() => handleWatchNow(movie)}
                                >
                                    Watch Now
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target={`#${id}`}
                    data-bs-slide="prev"
                >
                    <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target={`#${id}`}
                    data-bs-slide="next"
                >
                    <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );

    return (
        <Container>
            <div className="mt-2">
                <div className="row">
                    {renderCarousel(hindiMovies, "hindiCarousel", "Hindi Movies")}
                    {renderCarousel(punjabiMovies, "punjabiCarousel", "Punjabi Movies")}
                </div>
            </div>
        </Container>
    );
};

export default MovieCarousels;
