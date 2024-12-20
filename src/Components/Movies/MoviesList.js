import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Button,
  CardMedia,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';
import Carousel from '../Carousel/Carousel';
import MovieCarousels from './MovieCarousels';
import LoadingComponent from '../Loader/LoadingComponent';
const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageLoading, setPageLoading] = useState(false); 
  
  const navigate = useNavigate()
  // Get all movies api integrate logic here
  useEffect(() => {
    const fetchMovies = async (currentPage = 1) => {
      setLoading(true);
      try {
        const url = `${process.env.REACT_APP_API_URL}/tmdb/all?page=${currentPage}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (Array.isArray(data.results)) {
          setMovies(data.results);
          setFilteredMovies(data.results);
          setTotalPages(data.total_pages);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies(page);
  }, [page]);

  
  // StarRating implement code
  const getStars = (rating) => {
    const filledStars = Math.round(rating / 2);
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon key={i} style={{ color: i < filledStars ? '#FFAF00' : '#ccc' }} />
    ));
  };
  // pagination logic implement code
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  //  Movies watch button logic here
  const handleWatchNowClick = (movieId) => {
    navigate(`/videoPlay/${movieId}`);
  };
  // Loader implement logic here
  if (loading) {
    return (
      <Container
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <LoadingComponent />
      </Container>
    );
  }


  return (
    <div>
      <Carousel />
      <MovieCarousels />
      <Container>
        <Typography
          variant="h4"
          gutterBottom
          style={{
            textAlign: 'center',
            margin: '20px 0',
            fontWeight: 'bold',
            position: 'relative',
            color: '#950101',
            fontFamily: 'Bebas Neue'
          }}
        >
           мσνιєѕ
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

        <Grid container spacing={4}>
          {filteredMovies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <Card sx={{ boxShadow: 5 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={`${movie.title} poster`}
                  sx={{
                    filter: 'none',
                    transition: 'filter 0.3s ease-in-out',
                  }}
                  onError={(e) => {
                    e.target.src = '/path/to/placeholder.jpg';
                  }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <span style={{ fontWeight: 'bold', color: 'black' }}>Release Date</span>: {new Date(movie.release_date).toLocaleDateString('en-GB')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {getStars(movie.vote_average)}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#950101',
                      '&:hover': {
                        backgroundColor: '#800101',
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

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', gap: '20px' }}>
          <Button
            variant="contained"
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
            style={{ textTransform: 'capitalize', padding: '8px 16px' }}
            sx={{
              backgroundColor: '#950101', '&:hover': {
                backgroundColor: '#800101',
              },
            }}
          >
            Prev
          </Button>
          <Typography
            variant="subtitle1"
            style={{             
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: 'bold',
              color: '#950101',
            }}
          >
            Page {page} of {totalPages}
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#950101', '&:hover': {
                backgroundColor: '#800101',
              },
            }}
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
            style={{ textTransform: 'capitalize', padding: '8px 16px' }}
          >
            Next
          </Button>
        </div>
        {pageLoading && (
          <LoadingComponent
            style={{
              display: 'block',
              margin: '20px auto',
              color: '#950101'
            }}
          />
        )}
      </Container>
    </div>
  );
};

export default MoviesList;
