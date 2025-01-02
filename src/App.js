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
import AllSeasons from './Components/Seasons/AllSeasons';
import SeasonEpisodes from './Components/Seasons/SeasonEpisodes';
import TrailerWalls from './Components/Trailers/TrailerWalls';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes> 
        <Route path='/' element={<TrailerWalls/>}/>       
        <Route path="/movies/dashboard" element={<MoviesList />} />
        <Route path='/videoPlay/:id' element={<VideoPlay/>}/>
        <Route path='/movies/:category' element={<MoviesPage/>}/>
        <Route path='/videoPlay' element={<Video/>}/>
        <Route path='/genre/:id' element={<Genre/>}/>
        <Route path="/video/:id" element={<MovieDetail />} />
        <Route path='/all/Seasons' element={<AllSeasons/>}/>
        <Route path='/season/:id' element={<SeasonEpisodes/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
