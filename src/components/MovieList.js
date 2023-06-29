import React from "react";
import MovieCard from "./MovieCard";
import "../styles/MovieList.css";

const MovieList = ({ searchedMoviesArr }) => {
  const renderedMovies = searchedMoviesArr.map((searchedMovie) => {
    if (!searchedMovie.poster_path) {
      return <></>;
    } else {
      return <MovieCard searchedMovie={searchedMovie} key={searchedMovie.id} />;
    }
  });

  return <div className="movie-list">{renderedMovies}</div>;
};

export default MovieList;
