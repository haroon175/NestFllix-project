import { Button, Card, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

const Genre = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [genreName, setGenreName] = useState("");
  

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tmdb/genre/${id}`);
        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    const fetchGenreName = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tmdb/genres`);
        const data = await response.json();
        const genre = data.genres.find((genre) => genre.id === parseInt(id));
        setGenreName(genre ? genre.name : "Unknown Genre");
      } catch (error) {
        console.error("Error fetching genre name:", error);
      }
    };

    fetchMovies();
    fetchGenreName();
  }, [id]);

  const getStars = (rating) => {
    const filledStars = Math.round(rating / 2);
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon key={i} style={{ color: i < filledStars ? "#FFAF00" : "#ccc" }} />
    ));
  };

  const fetchMovieDetails = async (movieId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tmdb/movie/${movieId}`);
      const data = await response.json();
      setSelectedMovie(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const handleWatchNowClick = (movieId) => {
    navigate(`/videoPlay/${movieId}`);
    fetchMovieDetails(movieId);
  };

  return (
    <Container>
      <Typography
        variant="h4"
        gutterBottom
        style={{
          textAlign: "center",
          margin: "20px 0",
          fontWeight: "bold",
          position: "relative",
        }}
      >
        {genreName} Movies
        <span
          style={{
            position: "absolute",
            bottom: "-5px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80px",
            height: "4px",
            backgroundColor: "#950101",
            borderRadius: "2px",
          }}
        />
      </Typography>

      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <Card sx={{ boxShadow: 5 }}>
              <CardMedia
                component="img"
                height="200"
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} poster`}
                sx={{
                  filter: "none",
                  transition: "filter 0.3s ease-in-out",
                }}
                onError={(e) => {
                  e.target.src = "/path/to/placeholder.jpg";
                }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <span style={{ fontWeight: "bold", color: "black" }}>Release Date</span>:{" "}
                  {new Date(movie.release_date).toLocaleDateString("en-GB")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {getStars(movie.vote_average)}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#950101",
                    "&:hover": {
                      backgroundColor: "#800101",
                    },
                  }}
                  fullWidth
                  onClick={() => handleWatchNowClick(movie.id)}
                >
                  Watch Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Selected Movie Details */}
      {selectedMovie && (
        <Container style={{ marginTop: "40px" }}>
          <Typography variant="h5" gutterBottom>
            {selectedMovie.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {selectedMovie.overview}
          </Typography>
        </Container>
      )}
    </Container>
  );
};

export default Genre;
