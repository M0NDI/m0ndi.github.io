import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { FetchMovies, FetchGenres, fetchGenres, FetchSimilarMovies } from "./api/TMDB-Api";
import { NavBar } from "./components/NavBar";
import MovieList from "./components/MovieList";
import MostPopular from "./Pages/MostPopular";
import TopRated from "./Pages/TopRated";
import Upcoming from "./Pages/Upcoming";
import MoviePage from "./components/MoviePage";

import "./App.css";

function App() {
  // Store searched movie data
  const [searchedMoviesArr, setSearchedMoviesArr] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  // Variable used to determine whether back to top of page button is shown or not
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);

  // -----------------
  const handleSubmit = async (searchTerm) => {
    const movieResults = await FetchMovies(searchTerm);
    setSearchedMoviesArr(movieResults);
    setIsSearchSubmitted(true);
  };

  // -----------------
  const handleScroll = () => {
    if (window.scrollY > 1) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
                element={
                  <MovieList
                    searchedMoviesArr={searchedMoviesArr}
                  />
                }
              />
              <Route
                path="/top-rated"
                element={
                  <MovieList
                    searchedMoviesArr={searchedMoviesArr}
                  />
                }
              />
              <Route
                path="/upcoming"
                element={
                  <MovieList
                    searchedMoviesArr={searchedMoviesArr}
                  />
                }
              />
              <Route
                path="/movie/:id"
                element={
                  <MoviePage
                    isSearchSubmitted={isSearchSubmitted}
                  />
                }
              />
            </>
          ) : (
            <>
              <Route
                path="/"
                element={<MostPopular />}
              />
              <Route
                path="/top-rated"
                element={<TopRated />}
              />
              <Route
                path="/upcoming"
                element={<Upcoming />}
              />
              <Route
                path="/movie/:id"
                element={
                  <MoviePage
                    isSearchSubmitted={isSearchSubmitted}
                  />
                }
              />
            </>
          )}
        </Routes>
      </div>
      <button
        className={`back-to-top ${showBackToTop ? "show-back-to-top" : ""}`}
        onClick={scrollToTop}
      >
        &#8679;
      </button>
      <div>
        <img src="./images/tmdb-logo.svg" alt=""></img>
      </div>
    </div>
  );
}

export default App;