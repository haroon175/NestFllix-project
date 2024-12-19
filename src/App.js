import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import MovieDetail from './Components/Movies/MovieDetail'
import MoviesList from './Components/Movies/MoviesList';
import Navbar from './Components/Navbar/Navbar';
import Genre from './Components/Genreis/Genre';
import VideoPlay from './Components/VideoPlayer/VideoPlay';
import Footer from './Components/Footer/Footer';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>        
        <Route path="/" element={<MoviesList />} />
        <Route path='/videoPlay/:id' element={<VideoPlay/>}/>
        <Route path='/genre/:id' element={<Genre/>}/>
        <Route path="/video/:id" element={<MovieDetail />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
