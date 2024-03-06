import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle2.webp";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";

import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Slider from "../components/Slider";



function Entertainment() {
  const [isScrolled, setIsScrolled] = useState(false); // State to track whether the page is scrolled
  const movies = useSelector((state) => state.netflix.movies); // Selecting movies from Redux store
  const genres = useSelector((state) => state.netflix.genres); // Selecting genres from Redux store
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded); // Selecting genre loading status from Redux store

  const navigate = useNavigate(); // Getting navigation function from React Router
  const dispatch = useDispatch(); // Getting dispatch function from React Redux

  // Fetching genres on component mount
  useEffect(() => {
    dispatch(getGenres());
  }, []);

  // Fetching movies when genres are loaded
  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "all" }));
    }
  }, [genresLoaded]);

  // Redirecting to login page if user is not authenticated
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });

  // Handling scroll event
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true); // Setting isScrolled based on page offset
    return () => (window.onscroll = null); // Cleanup function
  };

  // Rendering component
  return (
    <Container>
      <Navbar isScrolled={isScrolled} /> {/* Rendering Navbar component */}
      <div className="hero">
        <img
          src={backgroundImage}
          alt="background"
          className="background-image"
        /> {/* Rendering background image */}
        <div className="container">
          <div className="logo">
            <img src={MovieLogo} alt="Movie Logo" /> {/* Rendering logo */}
          </div>
          <div className="buttons flex">
            {/* Rendering buttons */}
            <button
              onClick={() => navigate("/player")}
              className="flex j-center a-center"
            >
              <FaPlay /> {/* Rendering Play icon */}
              Play
            </button>
            <button className="flex j-center a-center">
              <AiOutlineInfoCircle /> {/* Rendering Info Circle icon */}
              More Info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies} /> {/* Rendering Slider component */}
    </Container>
  );
}
const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
    }
    img {
      height: 100vh;
      width: 100vw;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      .logo {
        img {
          width: 60%;
          height: 40%;
          
          margin-left: 5rem;
        }
      }
      .buttons {
        margin: 5rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
`;
export default Entertainment