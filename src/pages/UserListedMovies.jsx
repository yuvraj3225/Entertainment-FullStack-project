// import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase-config";
import Card from "../components/Card";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { getUsersLikedMovies } from "../store";
import { useDispatch, useSelector } from "react-redux";    


export default function UserListedMovies() {  // Defining functional component
  const movies = useSelector((state) => state.netflix.movies);  // Selecting movies from Redux store
  const dispatch = useDispatch();  // Redux dispatch function
  const navigate = useNavigate();  // Hook for navigation in React Router
  const [isScrolled, setIsScrolled] = useState(false);  // State for scroll position
  const [email, setEmail] = useState(undefined);  // State for user email

  // Checking authentication state changes
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);  // Set email if authenticated
    else navigate("/login");  // Redirect to login if not authenticated
  });

  useEffect(() => {  // Fetching user's liked movies on component mount or when email changes
    if (email) {
      dispatch(getUsersLikedMovies(email));  // Dispatching action to fetch user's liked movies
    }
  }, [email]);  // Run when email changes

  window.onscroll = () => {  // Event listener for window scroll
    setIsScrolled(window.pageYOffset === 0 ? false : true);  // Set scroll state based on pageYOffset
    return () => (window.onscroll = null);  // Clean up event listener
  };

  return (
    <Container>  {/* Container component */}
      <Navbar isScrolled={isScrolled} />  {/* Navbar component with scroll state */}
      <div className="content flex column">  {/* Content section */}
        <h1>Bookmarks</h1>  {/* Heading */}
        <div className="grid flex">  {/* Grid container */}
          {movies.map((movie, index) => {  // Mapping through movies array
            return (
              <Card  // Rendering Card component for each movie
                movieData={movie}  // Passing movie data as props
                index={index}  // Passing index as props
                key={movie.id}  // Unique key for each Card component
                isLiked={true}  // Indicating that the movie is liked
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;
