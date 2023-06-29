import React, { useState } from "react";
import "../styles/MovieCard.css";
import { Link } from "react-router-dom";
import MovieDetails from "./MovieDetails";

const MovieCard = ({ searchedMovie }) => {
  const [hoveredMovie, setHoveredMovie] = useState(null);

  const imagePath =
    "https://image.tmdb.org/t/p/w500" + searchedMovie.poster_path;

  const handleMouseEnter = () => {
    setHoveredMovie(searchedMovie);
  };

  const handleMouseLeave = () => {
    setHoveredMovie(null);
  };

  const movieImageStyle = (searchedMovie) => ({
    opacity: hoveredMovie === searchedMovie ? 0.1 : 1.0,
    transition: "opacity 0.3s ease",
  });

  return (
    <div className="movie">
      <Link to={`/movie/${searchedMovie.id}`}>
        <div
          className="movie-image"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {hoveredMovie === searchedMovie ? (
            <MovieDetails searchedMovie={searchedMovie} />
          ) : (
            <></>
          )}
          <img
            src={imagePath}
            alt={searchedMovie.title}
            style={movieImageStyle(searchedMovie)}
          />
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
