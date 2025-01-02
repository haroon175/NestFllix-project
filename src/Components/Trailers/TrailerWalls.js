import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Container } from '@mui/material';
import LoadingComponent from '../Loader/LoadingComponent';

const TrailerWalls = () => {
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTrailer, setCurrentTrailer] = useState(0);
  const containerRef = useRef(null);

  const fetchTrailers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tmdb/all-trailers`);
      setTrailers(response.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching trailers:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrailers();
  }, []);

 

  const handleScroll = (e) => {
    const { scrollTop, clientHeight } = e.target;
    const index = Math.round(scrollTop / clientHeight);
    setCurrentTrailer(index);
  };

  const getIframeWidth = () => {
    const screenWidth = window.innerWidth;
    return screenWidth <= 768 ? "90%" : "60%";
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
        <LoadingComponent />
      </Container>
    )
  }

  if (trailers.length === 0) {
    return <p>No trailers available</p>;
  }

  return (
    <div
      ref={containerRef}
      className="scroll-container"
      style={{
        height: "100vh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        position: "relative",
      }}
      onScroll={handleScroll}
    >
      {trailers.map((trailer, index) => (
        <div
          key={index}
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            scrollSnapAlign: "start",
            background: "#000",
            color: "#fff",
            position: "relative",
          }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${trailer.trailer.trailer.id}?autoplay=${currentTrailer === index ? 1 : 0}`}
            title={trailer.title}
            width={getIframeWidth()}
            height="85%"
            style={{ borderRadius: '10px', border: '1px solid #950101', marginTop: '-60px' }}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />

        </div>
      ))}
    </div>
  );
};

export default TrailerWalls;
