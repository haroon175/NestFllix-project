import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { Container, Typography, CircularProgress } from '@mui/material';

const VideoPlay = () => {
    const { id } = useParams(); 
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [videoSrc, setVideoSrc] = useState(null);
    const NGROK_URL = "https://walks-bridal-pitch-incurred.trycloudflare.com";

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const movieUrl = `${NGROK_URL}/tmdb/movie/${id}`;
                const response = await fetch(movieUrl);
                
                if (!response.ok) {
                    throw new Error('Error fetching movie details');
                }
                const data = await response.json();

                
                setMovie(data);
                setVideoSrc(data.link);

                
                const videoUrl = `${NGROK_URL}/tmdb/movie/${id}/videos`;
                const videoResponse = await fetch(videoUrl);
                if (!videoResponse.ok) {
                    throw new Error('Error fetching movie videos');
                }
                const videoData = await videoResponse.json();


                setVideoSrc(videoData.link);

            } catch (error) {
                console.error('Error fetching movie details or videos:', error);
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
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container>           
            <iframe
                width="100%"
                height="500"
                src={videoSrc}
                title="Movie Video"
                frameBorder="0"
                allowFullScreen
            />

            <Typography variant="h6" gutterBottom >
            <span style={{ fontWeight: 'bold', color: '#950101' }}>Title</span>: {movie.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
            <span style={{ fontWeight: 'bold', color: '#950101' }}>Description</span>: {movie.overview}
            </Typography>
            
        </Container>
    );
};

export default VideoPlay;
