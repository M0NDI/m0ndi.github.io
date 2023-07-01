import React /* { useState } */ from "react";
import "../styles/NavBar.css";
import "../index.css";
import { useLocation, NavLink } from "react-router-dom";
import SearchForm from "./SearchForm";
import mondiLogo from "../images/mondi-logo-white-outline.png";

export const NavBar = ({
  onSubmit,
  setIsSearchSubmitted,
  setSearchedMoviesArr,
}) => {
  const location = useLocation();
  const hideSearchBar = location.pathname.startsWith("/movie/");

  // Set most popular/home page to initial state when user navigates to another page
  const resetPageToInitialState = () => {
    setSearchedMoviesArr([]);
  };

  return (
    <nav className="navbar">
      <div className="mondi-logo-container">
        <NavLink to={"/"}>
          <div className="mondi-logo">
            <img src={mondiLogo} alt="logo" />
          </div>
        </NavLink>
      </div>
      <div className="search-form-container">
        {!hideSearchBar && (
          <SearchForm
            onSubmit={onSubmit}
            setIsSearchSubmitted={setIsSearchSubmitted}
          />
        )}
      </div>
      <div className="nav-links-container">
        <ul className="nav-links">
          <NavLink
            className="home"
            to={"/"}
            style={({ isActive }) =>
              isActive
                ? {
                    backgroundColor: "rgba(67, 102, 96, 0.7)",
                    color: "white",
                    fontWeight: "900",
                  }
                : { backgroundColor: "rgba(211, 211, 211, 0.3)" }
            }
            onClick={() => {
              resetPageToInitialState();
              setIsSearchSubmitted(false);
            }}
          >
            Popular
          </NavLink>
          <NavLink
            className="upcoming"
            to={"/upcoming"}
            style={({ isActive }) =>
              isActive
                ? {
                    backgroundColor: "rgba(67, 102, 96, 0.7)",
                    color: "white",
                    fontWeight: "900",
                  }
                : { backgroundColor: "rgba(211, 211, 211, 0.3)" }
            }
            onClick={() => {
              resetPageToInitialState();
              setIsSearchSubmitted(false);
            }}
          >
            Upcoming
          </NavLink>
          <NavLink
            className="top-rated"
            to={"/top-rated"}
            style={({ isActive }) =>
              isActive
                ? {
                    backgroundColor: "rgba(67, 102, 96, 0.7)",
                    color: "white",
                    fontWeight: "900",
                  }
                : { backgroundColor: "rgba(211, 211, 211, 0.3)" }
            }
            onClick={() => {
              resetPageToInitialState();
              setIsSearchSubmitted(false);
            }}
          >
            Top Rated
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};
