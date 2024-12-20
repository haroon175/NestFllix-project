import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  CircularProgress,
  Button,
  CardMedia,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';
import Carousel from '../Carousel/Carousel';
import MovieCarousels from './MovieCarousels';


const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageLoading, setPageLoading] = useState(false);

  const NGROK_URL = 'https://sponsorship-units-welcome-illinois.trycloudflare.com';
  const navigate = useNavigate()
  useEffect(() => {
    const fetchMovies = async (currentPage = 1) => {
      setLoading(true);
      try {
        const url = `${NGROK_URL}/tmdb/all?page=${currentPage}`;
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

  const categories = [ 'Punjabi', 'Hindi', 'English'];

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    navigate(`/movies/${category}`);
  };

  const getStars = (rating) => {
    const filledStars = Math.round(rating / 2);
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon key={i} style={{ color: i < filledStars ? '#FFAF00' : '#ccc' }} />
    ));
  };


  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  
  const handleWatchNowClick = (movieId) => {
    navigate(`/videoPlay/${movieId}`); 
  };



  if (loading) {
    return (
      <Container
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <div>
        <Carousel/>
        <MovieCarousels/>
      <Container>
        <Typography
          variant="h4"
          gutterBottom
          style={{
            textAlign: 'center',
            margin: '20px 0',
            fontWeight: 'bold',
            position: 'relative',
            color:'#950101',
            fontFamily:'Bebas Neue'
          }}
        >
         movies
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

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
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
                }
              : {
                  color: '#950101',
                  borderColor: '#950101',
                  margin: '5px 10px',
                }
          }
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </Button>
      ))}
    </div>

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
              background: '#f0f0f0',
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: 'bold',
              color: '#333',
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
          <CircularProgress
            style={{
              display: 'block',
              margin: '20px auto',
            }}
          />
        )}
      </Container>
      
      
    </div>
  );
};

export default MoviesList;
