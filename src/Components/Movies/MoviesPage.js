import React, { useEffect, useState } from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Container,    
    Button,
    CardMedia,
    Pagination,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingComponent from '../Loader/LoadingComponent';

const MoviesPage = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 9;

    

    useEffect(() => {
        const fetchCategoryMovies = async () => {
            setLoading(true);
            try {
                const url = `${process.env.REACT_APP_API_URL}/api/movies/${category}/movies`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }
                const data = await response.json();
                setMovies(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryMovies();
    }, [category]);

    const getStars = (rating) => {
        const filledStars = Math.round(rating / 2);
        return Array.from({ length: 5 }, (_, i) => (
            <StarIcon key={i} style={{ color: i < filledStars ? '#FFAF00' : '#ccc' }} />
        ));
    };

    const handleWatchNowClick = (movie) => {
        navigate(`/videoPlay`, { state: { movie } });
    };

    const handlePageChange = (_, page) => {
        setCurrentPage(page);
    };

    // Calculate the movies to display on the current page
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

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
                <LoadingComponent />
            </Container>
        );
    }

    return (
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
                    fontFamily: 'Bebas Neue',
                }}
            >
                {category} Movies
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
                {currentMovies.map((movie) => (
                    <Grid item xs={12} sm={6} md={4} key={movie.id}>
                        <Card sx={{ boxShadow: 5 }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={movie.posterimage}
                                alt={`${movie.title} poster`}
                                sx={{
                                    filter: 'none',
                                    transition: 'filter 0.3s ease-in-out',
                                }}
                            />
                            <CardContent>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                                    {movie.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {getStars(movie.rating)}
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
                                    onClick={() => handleWatchNowClick(movie)}
                                >
                                    Watch Now
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Pagination
                count={Math.ceil(movies.length / moviesPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '20px',

                    '& .MuiPaginationItem-root': {
                        fontSize: '1.25rem',
                        color: '#950101',
                    },
                }}
            />

        </Container>
    );
};

export default MoviesPage;
