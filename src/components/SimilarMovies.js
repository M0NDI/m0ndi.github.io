import React, { useState, useEffect } from "react";
import { FetchSimilarMovies } from "../api/TMDB-Api";
import "../styles/SimilarMovies.css";

const SimilarMovies = ({ id }) => {
  const [similarMovies, setSimilarMovies] = useState([]);

  const imagePath = "https://image.tmdb.org/t/p/w500";

  const getSimilarMovies = async () => {
    const allSimilarMovies = await FetchSimilarMovies(id);
    setSimilarMovies(allSimilarMovies);
    console.log(allSimilarMovies);
  };

  useEffect(() => {
    getSimilarMovies();
  }, [id]);

  return (
    <div className="similar-movies-container">
      <div className="similar-movies__header">SIMILAR MOVIES</div>
      <div className="similar-movies">
        {similarMovies.map((movie) => {
          return (
            <div className="similar-movies__movie">
              {movie.poster_path ? (
                <>
                  <div className="movie__title">{movie.title}</div>
                  <img
                    className="movie__image"
                    src={imagePath + movie.poster_path}
                    alt={movie.title}
                  />
                </>
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SimilarMovies;
