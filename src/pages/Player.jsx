import React from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import video from "../assets/video.mp4";

// Functional component for the player page
export default function Player() {
  const navigate = useNavigate(); // Getting navigation function from React Router

  // Rendering component
  return (
    <Container>
      <div className="player">
        <div className="back">
          {/* Back arrow icon to navigate back */}
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        {/* Video player */}
        <video src={video} autoPlay loop controls />
      </div>
    </Container>
  );
}

// Styled component for the container

const Container = styled.div`
  .player {
    width: 100vw;
    height: 100vh;
    .back {
      position: absolute;
      padding: 2rem;
      z-index: 1;
      svg {
        font-size: 2rem;
        cursor: pointer;
      }
    }
    video {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`;
