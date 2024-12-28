import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingComponent from '../Loader/LoadingComponent';
import { Container, Grid, Typography, Box } from '@mui/material';

const AllSeasons = () => {
    const [seasons, setSeasons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSeasons = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/seasons`);
                setSeasons(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch seasons.');
                setLoading(false);
            }
        };

        fetchSeasons();
    }, []);

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

    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container style={{ padding: '20px', textAlign: 'center' }}>
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    margin: '20px 0',
                    fontWeight: 'bold',
                    color: '#950101',
                    fontFamily: 'Bebas Neue',
                    fontSize: '30px',
                }}
            >
                Seasons
            </Typography>

            <Grid container spacing={3} justifyContent="center">
                {seasons.map((season) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        key={season._id}
                        onClick={() => navigate(`/season/${season._id}`)}
                        style={{ cursor: 'pointer' }}
                    >
                        <Box
                            style={{
                                border: '1px solid #950101',
                                borderRadius: '10px',
                                padding: '20px',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                textAlign: 'center',
                            }}
                        >
                            <img
                                src={season.poster}
                                alt={season.title}
                                style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
                            />
                            <Typography
                                variant="h6"
                                style={{ color: '#950101', margin: '10px 0' }}
                            >
                                {season.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                style={{ fontSize: '14px', color: '#950101' }}
                            >
                                <span style={{ fontWeight: 'bold', color: 'white' }}>
                                    Language
                                </span>
                                : {season.language}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default AllSeasons;
