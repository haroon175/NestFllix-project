import React, { useEffect, useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
  const [movies, setMovies] = useState([]);
  const [chunkSize, setChunkSize] = useState(window.innerWidth < 768 ? 2 : 4);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tmdb/popular`);
        setMovies(response.data.results || []);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    fetchPopularMovies();
  }, []);

  // Update chunk size based on window width
  useEffect(() => {
    const updateChunkSize = () => {
      setChunkSize(window.innerWidth < 768 ? 2 : 4);
    };

    window.addEventListener("resize", updateChunkSize);
    return () => window.removeEventListener("resize", updateChunkSize);
  }, []);

  const chunkMovies = (movies, size) => {
    const chunks = [];
    for (let i = 0; i < movies.length; i += size) {
      chunks.push(movies.slice(i, i + size));
    }
    return chunks;
  };

  const movieChunks = chunkMovies(movies, chunkSize);

  const handleClick = async (id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tmdb/movie/${id}/videos`);

      if (response.data?.movie?.links) {
        navigate(`/videoPlay/${id}`, { state: { videoLink: response.data.movie.links } });
      } else {
        navigate(`/videoPlay/${id}`, { state: { fallback: true } });
      }
    } catch (error) {
      console.error("Error fetching movie data:", error);
      navigate(`/videoPlay/${id}`, { state: { fallback: true } });
    }
  };

  return (
    <Container>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          margin: "20px 0",
          fontWeight: "bold",
          color: "#950101",
          fontFamily: "Bebas Neue",
          fontSize: "20px",
        }}
      >
        Popular Movies
      </Typography>

      <div
        id="carouselExample"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3000"
        data-bs-wrap="true"
        style={{ width: "100%", margin: "0 auto" }}
      >
        <div className="carousel-inner" style={{ borderRadius: "20px", marginBottom: "20px" }}>
          {movieChunks.map((chunk, index) => (
            <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  padding: "0 20px",
                }}
              >
                {chunk.map((movie) => (
                  <div
                    key={movie.id}
                    style={{
                      flex: `1 1 calc(${100 / chunkSize}% - 10px)`,
                      position: "relative",
                    }}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                      alt={movie.title}
                      style={{
                        height: "350px",
                        width: "100%",
                        borderRadius: "10px",
                      }}
                    />
                    <Button
                      variant="contained"
                      onClick={() => handleClick(movie.id)}
                      sx={{
                        position: "absolute",
                        bottom: "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "#950101",
                        borderRadius: "20px",
                        "&:hover": {
                          backgroundColor: "#800101",
                        },
                      }}
                    >
                      Watch
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </Container>
  );
};

export default Carousel;
