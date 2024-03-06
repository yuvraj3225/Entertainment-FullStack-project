import React from 'react';  // Importing React library
import { BrowserRouter, Route, Routes } from "react-router-dom";  // Importing necessary components from React Router

// Importing pages/components used in the application
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Entertainment from "./pages/Entertainment";
import Player from './pages/Player';
import Movies from './pages/Movies';
import TVShows from './pages/TVShows';
import UserListedMovies from './pages/UserListedMovies';
import Details from './pages/Details';




export default function App() {

  
  return (
    <BrowserRouter>  { /*Wrapping the entire application in BrowserRouter to enable routing */}
      <Routes>  {/*Defining routes for different pages/components */}

        {/* Route for the login page */}
        <Route exact path="/login" element={<Login />} />

        {/* Route for the signup page */}
        <Route exact path="/signup" element={<Signup />} />

        {/* Route for the entertainment page */}
        <Route exact path="/" element={<Entertainment />} />

        {/* Route for the player page */}
        <Route exact path="/player" element={<Player />} />

        {/* Route for the movies page */}
        <Route exact path="/movies" element={<Movies />} />

        {/* Route for the TV shows page */}
        <Route exact path="/tv" element={<TVShows />} />

        {/* Route for the user-listed movies page */}
        <Route exact path="/Bookmarks" element={<UserListedMovies />} />

        {/* <Route exact path="/details/:id" element={<Details />} /> */}



      
      </Routes>
    </BrowserRouter>
  );
}
