// The component Card is a functional component responsible for rendering individual movie cards.
// It utilizes React hooks such as useState and useNavigate for state management and navigation.
// The onAuthStateChanged function from Firebase Auth is used to check the user's authentication status.
// The addToList function is responsible for adding the movie to the user's list.
// Conditional rendering is used to show additional information when the card is hovered (isHovered state).
// Various React icons are imported and used for displaying different actions like play, like, dislike, add to bookmarks, etc.
// Redux is used for state management, and the removeMovieFromLiked action is dispatched when the user removes a movie from their liked list.
// The styled-components library is used for styling the card container and its components.
// CSS transitions and effects are applied for a better user experience.
import React, { useState } from 'react';  
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import video from "../assets/video.mp4";
import { IoPlayCircleSharp } from "react-icons/io5";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri"; 
import { BsCheck } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import axios from "axios";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { removeMovieFromLiked } from "../store";
import Details from '../pages/Details';

// React.memo is used for memoizing the functional component to prevent unnecessary re-renders
export default React.memo(function Card({ movieData, isLiked = false }) {
  const [isHovered, setIsHovered] = useState(false); // State to track if the card is hovered
  const navigate = useNavigate(); // React Router hook for navigation
  const [email, setEmail] = useState(undefined); // State to store user email
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [showDetails, setShowDetails] = useState(false);


  // Check if the user is authenticated using Firebase Auth
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setEmail(currentUser.email); // Set the user's email if authenticated
    } else navigate("/login"); // Redirect to login if not authenticated
  });

  const dispatch = useDispatch(); // Redux hook for dispatching actions

  // Function to add the movie to the user's list
  const addToList = async () => {
    try {
      await axios.post("https://backend-movie-topaz.vercel.app/api/user/add", {
        email,
        data: movieData,
      });
      setShowSuccessMessage(true); // Set state to show success message

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)} // Set isHovered to true on mouse enter
      onMouseLeave={() => setIsHovered(false)} // Set isHovered to false on mouse leave
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt="movie"
      />
      {/* Render content when card is hovered */}
      {isHovered && (
        <div className="hover">
          <div className="image-video-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              alt="movie"
              onClick={() => navigate("/player")}
            />
            <video src={video} autoPlay loop muted onClick={() => navigate("/player")} />
          </div>
          <div className="info-container flex column">
            <h3 className="name" onClick={() => navigate("/player")}>
              {movieData.name}
            </h3>
            <div className="icons flex j-between">
              <div className="controls flex">
                <IoPlayCircleSharp title="play" onClick={() => navigate("/player")} />
                <RiThumbUpFill title='like' />
              
                <RiThumbDownFill title='Dislike' />
     
                {
                  isLiked ? (
                    <BsCheck title='Remove From List' onClick={() => dispatch(removeMovieFromLiked({ movieId: movieData.id, email }))} />
                  ) : (
                    
                    <AiOutlinePlus title='Add to Bookmarks' onClick={addToList}  />
                    
                  )
                  
                } {showSuccessMessage && <p>Movie Successfully Added!</p>}
              </div>
              <div className="info">
                <BiChevronDown />
              {/* <BiChevronDown onClick= {() => navigate("/details")} /> */}
      
      {/* Render movie details if showDetails is true */}
                  {showDetails && <Details movieId={movieData.id} />} 
        
              </div>
              
            </div>
            {/* Render genres */}
            <div className="genres flex">
              <ul className="flex">
                {movieData.genres.map((genre) => {
                  <li key={genre}>{genre}</li> // This line should return the JSX for each genre
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
        
    </Container>
  );
});

// Styled-components for the card container
const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 99;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
     
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      ul {
        gap: 1rem;
        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`;
