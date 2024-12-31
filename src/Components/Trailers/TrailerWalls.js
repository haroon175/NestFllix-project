import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const TrailerWalls = () => {
  const [trailers, setTrailers] = useState([]);
  const [currentTrailerIndex, setCurrentTrailerIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  // Fetch trailers from API
  const fetchTrailers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tmdb/all-trailers`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setTrailers(data);
      } else {
        console.error("Unexpected data format:", data);
      }
    } catch (error) {
      console.error("Error fetching trailers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrailers();
  }, []);

  // Handle scroll event to update the current trailer index
  const handleScroll = (event) => {
    const windowHeight = window.innerHeight;
    const scrollTop = window.scrollY;
    const newIndex = Math.round(scrollTop / windowHeight);
    if (newIndex !== currentTrailerIndex && newIndex >= 0 && newIndex < trailers.length) {
      setCurrentTrailerIndex(newIndex);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleScroll);
      }
    };
  }, [currentTrailerIndex, trailers.length]);


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp') {
        setCurrentTrailerIndex(Math.max(0, currentTrailerIndex - 1));
      } else if (event.key === 'ArrowDown') {
        setCurrentTrailerIndex(Math.min(trailers.length - 1, currentTrailerIndex + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentTrailerIndex, setCurrentTrailerIndex, trailers.length]);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        // height: "100vh",
        // overflowY: "auto",
        // scrollSnapType: "y mandatory",
        backgroundColor: "#000",
      }}
    >
      {trailers.map((trailer, index) => (
        <Box
          key={trailer.id}
          sx={{
            width: "100%",
            height: "100vh",
            position: "relative",
            scrollSnapAlign: "start",
            display: index === currentTrailerIndex ? "block" : "none",
            textAlign: "center",
          }}
        >
          {/* Arrow buttons */}
          <Box sx={{ position: "absolute", right: "10px", top: "10px" }}>
            <IconButton onClick={() => setCurrentTrailerIndex(Math.max(0, currentTrailerIndex - 1))}>
              <ArrowUpwardIcon style={{ color: "#fff" }} />
            </IconButton>
            <IconButton onClick={() => setCurrentTrailerIndex(Math.min(trailers.length - 1, currentTrailerIndex + 1))}>
              <ArrowDownwardIcon style={{ color: "#fff" }} />
            </IconButton>
          </Box>
          {trailer?.trailer?.trailer.links ? (
            <iframe
              src={trailer.trailer.trailer.links}
              title={trailer.title}
              width="25%"
              height="90%"
              style={{
                objectFit: "cover",
                borderRadius: "10px",
                border: "1px solid #950101",
              }}
              allow="autoplay; fullscreen; picture-in-picture"
              muted
              autoplay
              playsinline
            />
          ) : (
            <Typography
              variant="h6"
              color="error"
              sx={{
                position: "absolute",
                bottom: "20px",
                left: "10px",
                color: "#fff",
              }}
            >
              Trailer not available
            </Typography>
          )}


        </Box>
      ))}
      {loading && (
        <Typography sx={{ textAlign: "center", margin: "20px", color: "#fff" }}>
          Loading...
        </Typography>
      )}
    </Box>
  );
};

export default TrailerWalls;
