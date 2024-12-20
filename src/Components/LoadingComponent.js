import React, { useState, useEffect } from 'react';
import { Container, CircularProgress, Typography } from '@mui/material';

const LoadingComponent = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); 

    return () => clearTimeout(timer);
  }, []);

  if (!loading) {
    
    return null; 
  }

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
      <CircularProgress sx={{ color: '#950101' }} />
      <Typography variant="h6" sx={{ marginTop: 2, color: '#950101', fontWeight:'bold' }}>
        NestFllix...
      </Typography>
    </Container>
  );
};

export default LoadingComponent;
