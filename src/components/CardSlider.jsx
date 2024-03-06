import React, { useRef, useState } from "react";
import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Card from "./Card";

// Memoize the CardSlider component to avoid unnecessary re-renders
export default React.memo(function CardSlider({ data, title }) {
  // Initialize the ref for the slider container
  const listRef = useRef();
  // Initialize the state for the slider position
  const [sliderPosition, setSliderPosition] = useState(0);
  // Initialize the state for the showControls flag
  const [showControls, setShowControls] = useState(false);

  // Define the handleDirection function to update the slider position
  const handleDirection = (direction) => {
    // Calculate the distance based on the current slider position
    let distance = listRef.current.getBoundingClientRect().x - 70;
    if (direction === "left" && sliderPosition > 0) {
      // Translate the slider container to the left
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
      // Update the slider position
      setSliderPosition(sliderPosition - 1);
    }
    if (direction === "right" && sliderPosition < 4) {
      // Translate the slider container to the right
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      // Update the slider position
      setSliderPosition(sliderPosition + 1);
    }
  };

  // Render the CardSlider component
  return (
    <Container
      // Pass the showControls flag as a prop to the Container component
      showControls={showControls}
      // Show/hide the controls based on the mouse position
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <h1>{title}</h1>
      <div className="wrapper">
        <div
          // Add a left arrow to navigate to the previous set of cards
          className={`slider-action left ${
            !showControls ? "none" : ""
          } flex j-center a-center`}
        >
          <AiOutlineLeft onClick={() => handleDirection("left")} />
        </div>
        <div className="slider flex" ref={listRef}>
          {data.map((movie, index) => {
            return <Card movieData={movie} index={index} key={movie.id} />;
          })}
        </div>
        <div
          // Add a right arrow to navigate to the next set of cards
          className={`slider-action right ${
            !showControls ? "none" : ""
          } flex j-center a-center`}
        >
          <AiOutlineRight onClick={() => handleDirection("right")} />
        </div>
      </div>
    </Container>
  );
});

// Define the styled-components for the Container component
const Container = styled.div`
  gap: 1rem;
  position: relative;
  padding: 2rem 0;
  h1 {
    margin-left: 50px;
  }
  .wrapper {
    .slider {
      width: max-content;
      gap: 1rem;
      transform: translateX(0px);
      transition: 0.3s ease-in-out;
      margin-left: 50px;
    }
    .slider-action {
      position: absolute;
      z-index: 99;
      height: 100%;
      top: 0;
      bottom: 0;
      width: 50px;
      transition: 0.3s ease-in-out;
      svg {
        font-size: 2rem;
      }
    }
    .none {
      display: none;
    }
    .left {
      left: 0;
    }
    .right {
      right: 0;
    }
  }`