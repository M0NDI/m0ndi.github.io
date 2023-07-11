import React, { useState, useEffect } from "react";
import { FetchSimilarMovies } from "../api/TMDB-Api";
import "../styles/SimilarMovies.css";

const SimilarMovies = ({ id }) => {
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const imagePath = "https://image.tmdb.org/t/p/w500";

  const getSimilarMovies = async () => {
    const allSimilarMovies = await FetchSimilarMovies(id);
    setSimilarMovies(allSimilarMovies);
    setIsLoading(false);
  };

  useEffect(() => {
    getSimilarMovies();
  }, [id]);

  return (
    <div className="similar-movies-container">
      {isLoading ? (
        <div className="similar-movies-container__loading-similar">
          LOADING OTHERS YOU MIGHT LIKE...
        </div>
      ) : (
        <>
          <div className="similar-movies__header">YOU MIGHT ALSO LIKE:</div>
          <div className="similar-movies">
            {similarMovies.map((movie) => (
              <div className="similar-movies__movie" key={movie.id}>
                {movie.poster_path ? (
                  <>
                    <div className="movie__title">{movie.title}</div>
                    <div className="movie__release-date">
                      {movie.release_date}
                    </div>
                    <>
                      <img
                        className="movie__image"
                        src={imagePath + movie.poster_path}
                        alt={movie.title}
                      />
                    </>
                  </>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SimilarMovies;
