import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import MovieDetail from './Components/Movies/MoviesPage'
import MoviesList from './Components/Movies/MoviesList';
import Navbar from './Components/Navbar/Navbar';
import Genre from './Components/Genreis/Genre';
import VideoPlay from './Components/VideoPlayer/VideoPlay';
import Footer from './Components/Footer/Footer';
import Video from './Components/VideoPlayer/Video';
import MoviesPage from './Components/Movies/MoviesPage';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>        
        <Route path="/" element={<MoviesList />} />
        <Route path='/videoPlay/:id' element={<VideoPlay/>}/>
        <Route path='/movies/:category' element={<MoviesPage/>}/>
        <Route path='/videoPlay' element={<Video/>}/>
        <Route path='/genre/:id' element={<Genre/>}/>
        <Route path="/video/:id" element={<MovieDetail />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
