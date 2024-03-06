import React, { useEffect, useState } from "react";  // Importing React and necessary hooks
import styled from "styled-components";  // Importing styled-components for styling
import Navbar from "../components/Navbar";  // Importing Navbar component
import CardSlider from "../components/CardSlider";  // Importing CardSlider component
import { onAuthStateChanged } from "firebase/auth";  // Importing onAuthStateChanged function from Firebase authentication
import { firebaseAuth } from "../utils/firebase-config";  // Importing Firebase authentication configuration
import { useNavigate } from "react-router-dom";  // Importing hook for navigation in React Router
import { useSelector, useDispatch } from "react-redux";  // Importing hooks for Redux state management
import { fetchMovies, getGenres } from "../store";  // Importing Redux actions
import SelectGenre from "../components/SelectGenre";  // Importing SelectGenre component
import Slider from "../components/Slider";  // Importing Slider component

function TVShows() {
  const [isScrolled, setIsScrolled] = useState(false);  // State for scroll position
  const movies = useSelector((state) => state.netflix.movies);  // Selecting movies from Redux store
  const genres = useSelector((state) => state.netflix.genres);  // Selecting genres from Redux store
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);  // Selecting genresLoaded status from Redux store
  const dataLoading = useSelector((state) => state.netflix.dataLoading);  // Selecting dataLoading status from Redux store

  const navigate = useNavigate();  // Hook for navigation in React Router
  const dispatch = useDispatch();  // Redux dispatch function

  useEffect(() => {
    if (!genres.length) dispatch(getGenres());  // Fetch genres if not already fetched
  }, []);  // Run only on component mount

  useEffect(() => {
    if (genresLoaded) {  // If genres are loaded
      dispatch(fetchMovies({ genres, type: "tv" }));  // Fetch TV shows
    }
  }, [genresLoaded]);  // Run when genresLoaded status changes

  const [user, setUser] = useState(undefined);  // State for user authentication status

  onAuthStateChanged(firebaseAuth, (currentUser) => {  // Listening for authentication state changes
    if (currentUser) setUser(currentUser.uid);  // Set user ID if authenticated
    else navigate("/login");  // Redirect to login if not authenticated
  });

  window.onscroll = () => {  // Event listener for window scroll
    setIsScrolled(window.pageYOffset === 0 ? false : true);  // Set scroll state based on pageYOffset
    return () => (window.onscroll = null);  // Clean up event listener
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />  {/* Navbar component with scroll state */}
      <div className="data">
        <SelectGenre genres={genres} type="tv" />  {/* SelectGenre component for TV shows */}
        {movies.length ? (  // Conditional rendering based on TV shows availability
          <>
            <Slider movies={movies} />  {/* Slider component for displaying TV shows */}
          </>
        ) : (
          <h1 className="not-available">  {/* Message for no TV shows available */}
            No TV Shows available for the selected genre. Please select a different genre.
          </h1>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`  // Styled container component
  .data {  // Styling for data section
    margin-top: 8rem;  // Top margin
    .not-available {  // Styling for not available message
      text-align: center;  // Center-align text
      margin-top: 4rem;  // Top margin
    }
  }
`;

export default TVShows;  // Exporting TVShows component
