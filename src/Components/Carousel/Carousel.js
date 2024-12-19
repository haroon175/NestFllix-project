import React, { useEffect, useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Carousel = () => {
  const [movies, setMovies] = useState([]);
  const NGROK_URL = 'https://memories-downloaded-evanescence-goals.trycloudflare.com';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(`${NGROK_URL}/tmdb/popular`);
        setMovies(response.data.results || []);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    fetchPopularMovies();
  }, []);

  const handleClick = (id) => {
    navigate(`/videoPlay/${id}`);
  };

  return (
    <Container>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: 'center',
          margin: '20px 0',
          fontWeight: 'bold',
          position: 'relative',
          color:'#950101',
          fontFamily:'Bebas Neue'
        }}
      >
        Popular movies
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
        id="carouselExample"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-inner" style={{ borderRadius: '20px' }}>
          {movies.map((movie, index) => (
            <div
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
              key={movie.id}
              style={{ position: 'relative' }}
              
            >
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                className="d-block w-100"
                alt={movie.title}
                style={{
                  height: '300px',
                  width: '100%',
                }}
              />
              <h2
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
              </h2>
              <Button
                variant="contained"
                
                onClick={() => handleClick(movie.id)}
                sx={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '50%',
                  borderRadius:'20px',
                  transform: 'translateX(-50%)',
                  backgroundColor:'#950101',
                  '&:hover': {
                        backgroundColor: '#800101',
                      },
                }}                
              >
                Watch Now
              </Button>
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
