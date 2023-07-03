/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { FetchMostPopular } from "../api/TMDB-Api";
import { Link } from "react-router-dom";
import "../styles/Pages.css";
import Pagination from "../components/Pagination";
import BasicDetailsCard from "../components/BasicDetailsCard";

const MostPopular = () => {
  const [popular, setPopular] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredMovie, setHoveredMovie] = useState(null);

  const getMostPopular = async () => {
    const mostPopular = await FetchMostPopular(currentPage);
    setPopular(mostPopular);
  };

  const getNextPage = async () => {
    setCurrentPage(currentPage + 1);
    const nextPageResults = await FetchMostPopular(currentPage + 1);
    setPopular(nextPageResults);
  };

  // if statement used here to prevent user from going back another page (to page 0, -1 and so on) if already on page 1.
  const getPreviousPage = async () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
    const previousPageResults = await FetchMostPopular(currentPage - 1);
    setPopular(previousPageResults);
  };

  // Functions to be used in "onMouseEnter" and "onMouseLeave" for movie image display details on hover effect.
  const handleMouseEnter = (movie) => {
    setHoveredMovie(movie);
  };

  const handleMouseLeave = () => {
    setHoveredMovie(null);
  };

  useEffect(() => {
    getMostPopular();
  }, [currentPage]);

  /* 
  If "popular" state changes on new render, go to top of page. Added so that when user clicks next page
  or previous page, it takes them to top of page.
  */
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [popular]);

  // Reduce opacity of ONLY the movie that is hovered
  const movieImageStyle = (movie) => ({
    opacity: hoveredMovie === movie ? 0.1 : 1.0,
    transition: "opacity 0.3s ease",
  });

  return (
    <div className="page-container">
      <div className="all_movies">
        {popular.results?.map(
          (movie) =>
            movie.poster_path && (
              <div className="all_movies__movie" key={movie.id}>
                <div className="all_movies__movie" key={movie.id}>
                  <div
                    className="movie-image"
                    onMouseEnter={() => handleMouseEnter(movie)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="hovered-details">
                      {hoveredMovie === movie &&
                        (movie.overview !== "" ? (
                          <BasicDetailsCard movie={movie} />
                        ) : (
                          <div className="no-details">
                            <div class="movie-title">{movie.title}</div>
                            <div class="movie-date">{movie.release_date}</div>
                          </div>
                        ))}
                    </div>
                    <Link to={`/movie/${movie.id}`}>
                      {movie.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                          style={movieImageStyle(movie)}
                        />
                      ) : (
                        <></>
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
      {currentPage < popular.total_pages ? (
        <Pagination
          getNextPage={getNextPage}
          getPreviousPage={getPreviousPage}
          currentPage={currentPage}
        />
      ) : (
        <div className="conditional-pages">
          <button className="conditional-prev" onClick={getPreviousPage}>
            Back
          </button>
          <div className="conditional-page-number">{currentPage}</div>
        </div>
      )}
    </div>
  );
};

export default MostPopular;
