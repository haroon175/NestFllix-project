import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MovieCarousels = () => {
    const [hindiMovies, setHindiMovies] = useState([]);
    const [punjabiMovies, setPunjabiMovies] = useState([]);
    const [activeCategory, setActiveCategory] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const hindiResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/tmdb/hindi-movies`);
                const hindiData = await hindiResponse.json();
                setHindiMovies(hindiData.result || []);

                const punjabiResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/tmdb/punjabi-movies`);
                const punjabiData = await punjabiResponse.json();
                setPunjabiMovies(punjabiData.result || []);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);

    const categories = ['Punjabi', 'Hindi', 'English'];
    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        navigate(`/movies/${category}`);
    };

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
            <div style={{border:'#950101' , width:'350px', margin:'auto',borderRadius:'25px' , backgroundColor:'#950101'}}>           
            <div style={{ textAlign: 'center' }}>
                {categories.map((category) => (
                    <Button
                        key={category}
                        variant={activeCategory === category ? 'contained' : 'outlined'}
                        style={
                            activeCategory === category
                                ? {
                                    backgroundColor: '#950101',
                                    color: 'white',
                                    border: 'none',
                                    margin: '5px 10px',
                                    borderRadius:'20px'
                                }
                                : {
                                    color: '#fff',
                                    borderColor: '#fff',
                                    margin: '5px 10px',
                                    borderRadius:'20px'
                                }
                        }
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category}
                    </Button>
                ))}
            </div>
            
            </div>
            <div className="mt-2">
                <div className="row">
                    {renderCarousel(hindiMovies, "hindiCarousel", "Hindi мσνιєѕ")}
                    {renderCarousel(punjabiMovies, "punjabiCarousel", "Punjabi мσνιєѕ")}
                </div>
            </div>
        </Container>
    );
};

export default MovieCarousels;
