import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';

const MovieDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const movie = location.state;

  if (!movie) {
    return (
      <Container>
        <Typography variant="h6" color="error" style={{ textAlign: 'center', margin: '20px 0' }}>
          Movie not found.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')}>
          Back to Movies
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center', margin: '20px 0' }}>
        {movie.title}
      </Typography>
      {movie.iframe ? (
        <div
          dangerouslySetInnerHTML={{ __html: movie.iframe }}
          style={{ margin: '20px auto', textAlign: 'center' }}
        />
      ) : (
        <Typography variant="body1" color="text.secondary" style={{ textAlign: 'center' }}>
          No video available.
        </Typography>
      )}
      <Button variant="contained" color="secondary" onClick={() => navigate('/')}>
        Back to Movies
      </Button>
    </Container>
  );
};

export default MovieDetail;
