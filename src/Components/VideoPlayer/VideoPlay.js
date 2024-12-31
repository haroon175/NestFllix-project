import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, Button, Grid, Card, CardMedia, CardContent, Box } from '@mui/material';
import LoadingComponent from '../Loader/LoadingComponent';
import StarIcon from '@mui/icons-material/Star';

const VideoPlay = () => {
    const { id } = useParams();
    const location = useLocation();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [videoSrc, setVideoSrc] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                // Fetch movie details
                const movieUrl = `${process.env.REACT_APP_API_URL}/api/tmdb/movie/${id}`;
                const response = await fetch(movieUrl);
                if (!response.ok) {
                    throw new Error('Error fetching movie details');
                }
                const data = await response.json();
                setMovie(data);

                // Fetch movie videos
                const videoUrl = `${process.env.REACT_APP_API_URL}/api/tmdb/movie/${id}/videos`;
                const videoResponse = await fetch(videoUrl);
                if (!videoResponse.ok) {
                    throw new Error('Error fetching movie videos');
                }
                const videoData = await videoResponse.json();
                setVideoSrc(videoData?.movie?.links || videoData?.trailer?.links);

                // Fetch movie recommendations
                const recommendationsUrl = `${process.env.REACT_APP_API_URL}/api/tmdb/${id}/recommendations`;
                const recommendationsResponse = await fetch(recommendationsUrl);
                if (!recommendationsResponse.ok) {
                    throw new Error('Error fetching movie recommendations');
                }
                const recommendationsData = await recommendationsResponse.json();

                const recommendationsWithVideos = await Promise.all(
                    recommendationsData.results.map(async (rec) => {
                        const recVideoUrl = `${process.env.REACT_APP_API_URL}/api/tmdb/movie/${rec.id}/videos`;
                        const recVideoResponse = await fetch(recVideoUrl);
                        if (!recVideoResponse.ok) return { ...rec, video: null };
                        const recVideoData = await recVideoResponse.json();
                        return { ...rec, video: recVideoData?.trailer?.links || null };
                    })
                );

                setRecommendations(recommendationsWithVideos);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

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
            <Button
                variant="contained"
                sx={{ backgroundColor: '#950101', marginBottom: '5px' }}
                onClick={() => navigate('/')}
            >
                Back
            </Button>
            <Grid container spacing={3}>
                {/* Left Column: Video Player */}
                <Grid item xs={12} md={8}>
                    <Box
                        sx={{
                            position: "relative",
                            width: "100%",
                            height: 0,
                            paddingTop: "56.25%",
                        }}
                    >
                        <iframe
                            src={videoSrc}
                            title="Movie Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                border: '1px solid #950101',
                                borderRadius: '20px'
                            }}
                        ></iframe>
                    </Box>

                    <Typography variant="h6" gutterBottom sx={{ marginTop: "10px" }}>
                        <span style={{ fontWeight: "bold", color: "#950101" }}>Title</span>: {movie.title || location.state?.title}
                    </Typography>
                    {/* <Typography variant="body1" gutterBottom>
                        <span style={{ fontWeight: "bold", color: "#950101" }}>Description</span>: {movie.overview || "Description not available"}
                    </Typography> */}
                </Grid>

                {/* Right Column: Recommended Movies */}
                <Grid item xs={12} md={4}>
                    <Typography
                        variant="h5"
                        sx={{ color: "#950101", marginBottom: "10px", fontWeight: "bold" }}
                    >
                        Recommended Movies
                    </Typography>

                    {recommendations.length === 0 && (
                        <Typography variant="body1" sx={{ color: "#950101", marginBottom: "10px" }}>
                            No recommended movies available.
                        </Typography>
                    )}

                    <Box
                        sx={{
                            border: "2px solid #950101", 
                            borderRadius: "8px", 
                            overflowY: "auto",
                            maxHeight: "500px", 
                            padding: "16px", 
                        }}
                    >
                        <Grid container spacing={2}>
                            {recommendations.map((rec) => (
                                <Grid item xs={12} key={rec.id}>
                                    <Card
                                        sx={{
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            backgroundColor: "black",
                                            border: "1px solid #950101",
                                        }}
                                        onClick={() => navigate("/videoPlay", { state: { movie: rec } })}
                                    >
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 100, height: 100 }}
                                            image={`https://image.tmdb.org/t/p/w500${rec.poster_path}` || "https://via.placeholder.com/150"}
                                            alt={rec.title}
                                            onError={(e) => (e.target.src = "/placeholder-image.png")}
                                        />
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant="subtitle1"
                                                component="div"
                                                sx={{ color: "#950101" }}
                                            >
                                                {rec.title}
                                            </Typography>
                                            <Box display="flex" alignItems="center">
                                                <StarIcon sx={{ color: "#950101", fontSize: "18px" }} />
                                                <Typography
                                                    variant="body2"
                                                    sx={{ marginLeft: "5px", color: "#950101" }}
                                                >
                                                    {rec.vote_average || "N/A"}/100
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                </Grid>
            </Grid>

        </Container>
    );
};

export default VideoPlay;
