import React, { useState, useEffect } from "react";
import { FetchTopRated } from "../api/TMDB-Api";
import { Link } from "react-router-dom";
import "../styles/Pages.css";
import Pagination from "../components/Pagination";
import BasicDetailsCard from "../components/BasicDetailsCard";

const TopRated = () => {
  const [topRated, setTopRated] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredMovie, setHoveredMovie] = useState(null);

  const getTopRated = async () => {
    const topRated = await FetchTopRated(currentPage);
    setTopRated(topRated);
  };

  const getNextPage = async () => {
    setCurrentPage(currentPage + 1);
    const nextPageResults = await FetchTopRated(currentPage + 1);
    setTopRated(nextPageResults);
  };
  
  // if statement used here to prevent user from going back another page (to page 0, -1 and so on) if already on page 1.
  const getPreviousPage = async () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
    const previousPageResults = await FetchTopRated(currentPage - 1);
    setTopRated(previousPageResults);
  };

  // Functions to be used in "onMouseEnter" and "onMouseLeave" for movie image display details on hover effect.
  const handleMouseEnter = (movie) => {
    setHoveredMovie(movie);
  };

  const handleMouseLeave = () => {
    setHoveredMovie(null);
  };

  useEffect(() => {
    getTopRated();
  }, [currentPage]);

  /* 
  If "topRated" state changes on new render, go to top of page. Added so that when user clicks next page
  or previous page, it takes them to top of page.
  */
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [topRated]);

  // Reduce opacity of ONLY the movie that is hovered
  const movieImageStyle = (movie) => ({
    opacity: hoveredMovie === movie ? 0.1 : 1.0,
    transition: "opacity 0.3s ease",
  });

  return (
    <>
      {currentPage !== topRated.total_pages ? (
        <Pagination
          getNextPage={getNextPage}
          getPreviousPage={getPreviousPage}
          currentPage={currentPage}
        />
      ) : (
        <div className="page">
          <button className="prev-page" onClick={getPreviousPage}>
            Back
          </button>
          <div className="page-number">{currentPage}</div>
          <></>
        </div>
      )}
      <div className="all_movies">
        {topRated.results?.map(
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
      <Pagination
        getNextPage={getNextPage}
        getPreviousPage={getPreviousPage}
        currentPage={currentPage}
      />
    </>
  );
};

export default TopRated;
