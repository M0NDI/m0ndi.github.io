import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FetchUpcoming } from "../api/TMDB-Api";
import "../styles/Pages.css";
import Pagination from "../components/Pagination";
import BasicDetailsCard from "../components/BasicDetailsCard";

const Upcoming = ({ genresList }) => {
  const [upcoming, setUpcoming] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredMovie, setHoveredMovie] = useState(null);

  const getUpcoming = async () => {
    const upcoming = await FetchUpcoming(currentPage);
    setUpcoming(upcoming);
  };

  const getNextPage = async () => {
    setCurrentPage(currentPage + 1);
    const nextPageResults = await FetchUpcoming(currentPage + 1);
    setUpcoming(nextPageResults);
  };

  // if statement used here to prevent user from going back another page (to page 0, -1 and so on) if already on page 1.
  const getPreviousPage = async () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
    const nextPageResults = await FetchUpcoming(currentPage - 1);
    setUpcoming(nextPageResults);
  };

  // Functions to be used in "onMouseEnter" and "onMouseLeave" for movie image display details on hover effect.
  const handleMouseEnter = (movie) => {
    setHoveredMovie(movie);
  };

  const handleMouseLeave = () => {
    setHoveredMovie(null);
  };

  useEffect(() => {
    getUpcoming();
  }, [currentPage]);

  /* 
  If "upcoming" state changes on new render, go to top of page. Added so that when user clicks next page
  or previous page, it takes them to top of page.
  */
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [upcoming]);

  const movieImageStyle = (movie) => ({
    opacity: hoveredMovie === movie ? 0.1 : 1.0,
    transition: "opacity 0.3s ease",
  });

  return (
    <div className="page-container">
      <div className="all_movies">
        {upcoming.results?.map(
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
      {currentPage < upcoming.total_pages || currentPage < 1 ? (
        <Pagination
          getNextPage={getNextPage}
          getPreviousPage={getPreviousPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        <div className="conditional-pages">
          <button className="conditional-prev" onClick={getPreviousPage}>
            Back
          </button>
          <button className="conditional-page-number">{currentPage}</button>
        </div>
      )}
    </div>
  );
};

export default Upcoming;
