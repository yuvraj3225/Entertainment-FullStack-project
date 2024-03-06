
import React from "react";
import styled from "styled-components";
import CardSlider from "./CardSlider";

// Functional component Slider takes a prop 'movies' which is an array of movies
export default function Slider({ movies }) {
  // Function to get a range of movies based on 'from' and 'to' indices
  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to); // Slice the movies array to get movies within the specified range
  };

  // Rendering component
  return (
    <Container>
      {/* Rendering CardSlider components with different titles and slices of movies data */}
      <CardSlider data={getMoviesFromRange(0, 10)} title="Trending Now" /> {/* Display trending movies */}
      <CardSlider data={getMoviesFromRange(10, 20)} title="New Releases" /> {/* Display new release movies */}
      <CardSlider data={getMoviesFromRange(20, 30)} title="Blockbuster Movies" /> {/* Display blockbuster movies */}
      <CardSlider data={getMoviesFromRange(30, 40)} title="Popular on Netflix" /> {/* Display popular movies on Netflix */}
      <CardSlider data={getMoviesFromRange(40, 50)} title="Action Movies" /> {/* Display action movies */}
      <CardSlider data={getMoviesFromRange(50, 60)} title="Epics" /> {/* Display epic movies */}
    </Container>
  );
}
const Container = styled.div``;
