import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Typography } from "@mui/material";

const MovieCarousels = () => {
    const hindiMovies = [
        {
            id: 1,
            title: "3 Idiots",
            posterUrl:
                "https://m.media-amazon.com/images/M/MV5BNzc4ZWQ3NmYtODE0Ny00YTQ4LTlkZWItNTBkMGQ0MmUwMmJlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        },
        {
            id: 2,
            title: "Dangal",
            posterUrl:
                "https://m.media-amazon.com/images/M/MV5BMTQ4MzQzMzM2Nl5BMl5BanBnXkFtZTgwMTQ1NzU3MDI@._V1_FMjpg_UX1000_.jpg",
        },
        {
            id: 3,
            title: "PK",
            posterUrl: "https://i.ytimg.com/vi/zjiYSH-O0II/maxresdefault.jpg",
        },
    ];

    const punjabiMovies = [
        {
            id: 1,
            title: "Carry On Jatta",
            posterUrl:
                "https://m.media-amazon.com/images/M/MV5BM2JjMWM0MDAtMDk2Zi00MWVmLTkxNDQtZDllNWE2YjYwZGM4XkEyXkFqcGc@._V1_.jpg",
        },
        {
            id: 2,
            title: "Sardaar Ji",
            posterUrl: "https://i.ytimg.com/vi/LAHs9YFJSpg/maxresdefault.jpg",
        },
        {
            id: 3,
            title: "Jatt & Juliet",
            posterUrl:
                "https://m.media-amazon.com/images/M/MV5BYmU0Zjk0NGMtMzEwZC00OTk5LThkOGQtNjc3ZWI1MmZkZDY5XkEyXkFqcGc@._V1_.jpg",
        },
    ];

    return (
        <Container>
            <div className="mt-2">
                <div className="row">
                    {/* Hindi Movies Carousel */}
                    <div className="col-md-6 d-flex flex-column align-items-center">
                        <Typography
                            variant="h4"
                            gutterBottom
                            sx={{
                                textAlign: 'center',
                                margin: '20px 0',
                                fontWeight: 'bold',
                                position: 'relative',
                                color: '#950101',
                                fontFamily: 'Bebas Neue'
                            }}
                        >
                            Hindi movies
                            <span
                                style={{
                                    position: 'absolute',
                                    bottom: '-5px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '80px',
                                    height: '4px',
                                    backgroundColor: '#fff',
                                    borderRadius: '2px',
                                }}
                            />
                        </Typography>
                        <div
                            id="hindiCarousel"
                            className="carousel slide"
                            data-bs-ride="carousel"
                            style={{ width: "370px", height: "350px" }}
                        >
                            <div className="carousel-inner" style={{ borderRadius: '20px' }}>
                                {hindiMovies.map((movie, index) => (
                                    <div
                                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                                        key={movie.id}
                                    >
                                        <img
                                            src={movie.posterUrl}
                                            className="d-block w-100"
                                            alt={movie.title}
                                            style={{ height: "350px" }}
                                        />
                                        <div className="carousel-caption d-none d-md-block">
                                            <h4
                                                style={{
                                                    position: 'absolute',
                                                    bottom: '60px',
                                                    left: '50%',
                                                    transform: 'translateX(-50%)',
                                                    color: '#FF6500',
                                                    textAlign: 'center',
                                                    fontWeight: 'bold',
                                                    fontStyle: 'italic',
                                                }}
                                            >
                                                {movie.title}
                                            </h4>
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
                                data-bs-target="#hindiCarousel"
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
                                data-bs-target="#hindiCarousel"
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

                    {/* Punjabi Movies Carousel */}
                    <div className="col-md-6 d-flex flex-column align-items-center">
                        <Typography
                            variant="h4"
                            gutterBottom
                            sx={{
                                textAlign: 'center',
                                margin: '20px 0',
                                fontWeight: 'bold',
                                position: 'relative',
                                color: '#950101',
                                fontFamily: 'Bebas Neue'
                            }}
                        >
                            Punjabi movies
                            <span
                                style={{
                                    position: 'absolute',
                                    bottom: '-5px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '80px',
                                    height: '4px',
                                    backgroundColor: '#fff',
                                    borderRadius: '2px',
                                }}
                            />
                        </Typography>
                        <div
                            id="punjabiCarousel"
                            className="carousel slide"
                            data-bs-ride="carousel"
                            style={{ width: "370px", height: "350px" }}
                        >
                            <div className="carousel-inner" style={{ borderRadius: '20px' }}>
                                {punjabiMovies.map((movie, index) => (
                                    <div
                                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                                        key={movie.id}
                                    >
                                        <img
                                            src={movie.posterUrl}
                                            className="d-block w-100"
                                            alt={movie.title}
                                            style={{ height: "350px" }}
                                        />
                                        <div className="carousel-caption d-none d-md-block">
                                            <h4
                                                style={{
                                                    position: 'absolute',
                                                    bottom: '60px',
                                                    left: '50%',
                                                    transform: 'translateX(-50%)',
                                                    color: '#FF6500',
                                                    textAlign: 'center',
                                                    fontWeight: 'bold',
                                                    fontStyle: 'italic',
                                                }}
                                            >
                                                {movie.title}
                                            </h4>
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
                                data-bs-target="#punjabiCarousel"
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
                                data-bs-target="#punjabiCarousel"
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
                </div>
            </div>
        </Container>
    );
};

export default MovieCarousels;
