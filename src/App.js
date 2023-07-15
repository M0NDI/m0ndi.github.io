import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { FetchMovies } from "./api/TMDB-Api";
import { NavBar } from "./components/NavBar";
import MovieList from "./components/MovieList";
import MostPopular from "./Pages/MostPopular";
import TopRated from "./Pages/TopRated";
import Upcoming from "./Pages/Upcoming";
import MoviePage from "./components/MoviePage";
import tmdbLogo from "./images/tmdb-logo.svg";

import "./App.css";

function App() {
  // Store searched movie data
  const [searchedMoviesArr, setSearchedMoviesArr] = useState([]);
  // Variable used to determine whether back to top of page button is shown or not
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);

  /* 
    Callback function to handle the submission of a movie search.
  */
  const handleSubmit = async (searchTerm) => {
    const movieResults = await FetchMovies(searchTerm);
    setSearchedMoviesArr(movieResults);
    setIsSearchSubmitted(true);
  };

  /* 
    Function to handle whether the back to top of page button is 
    displayed or not.
  */
  const handleScroll = () => {
    if (window.scrollY > 1) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };

  /* 
    Listen for scrolls then if scroll occurs,
    execute handleScroll function.
  */
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup function that removes the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* 
    Will be applied to an element as onClick so when it is clicked,
    the page will scroll to the top.
  */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="App">
      <NavBar
        onSubmit={handleSubmit}
        setIsSearchSubmitted={setIsSearchSubmitted}
        setSearchedMoviesArr={setSearchedMoviesArr}
      />
      <div id="routes">
        <Routes>
          {isSearchSubmitted ? (
            <>
              <Route
                path="/"
                element={<MovieList searchedMoviesArr={searchedMoviesArr} />}
              />
              <Route
                path="/top-rated"
                element={<MovieList searchedMoviesArr={searchedMoviesArr} />}
              />
              <Route
                path="/upcoming"
                element={<MovieList searchedMoviesArr={searchedMoviesArr} />}
              />
              <Route
                path="/movie/:id"
                element={<MoviePage isSearchSubmitted={isSearchSubmitted} />}
              />
            </>
          ) : (
            <>
              <Route path="/" element={<MostPopular />} />
              <Route path="/top-rated" element={<TopRated />} />
              <Route path="/upcoming" element={<Upcoming />} />
              <Route
                path="/movie/:id"
                element={<MoviePage isSearchSubmitted={isSearchSubmitted} />}
              />
            </>
          )}
        </Routes>
      </div>
      <button
        /* 
          Change element className based on whether showBackToTop is true or not.
          If true, back to top button will be displayed and will be hidden if false.
        */
        className={`back-to-top ${showBackToTop ? "show-back-to-top" : ""}`}
        onClick={scrollToTop}
      >
        &#8679; {/* UTF-8 code for an upwards arrow */}
      </button>
      <div className="tmdb-attribution">
        POWERED BY
        <a href="https://developer.themoviedb.org/reference/intro/getting-started">
          <img
            className="tmdb-logo"
            src={tmdbLogo}
            alt="the movie database logo"
          />{" "}
        </a>
      </div>
    </div>
  );
}

export default App;
