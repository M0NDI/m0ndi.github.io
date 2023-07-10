import React, { useState, useEffect } from "react";
import { FetchSimilarMovies } from "../api/TMDB-Api";

const SimilarMovies = ({ id }) => {
  const [similarMovies, setSimilarMovies] = useState([]);

  const getSimilarMovies = async () => {
    const similarMovies = await FetchSimilarMovies(id);
    setSimilarMovies(similarMovies);
    console.log(similarMovies)
  };

  useEffect(() => {
    getSimilarMovies();
  }, [id]);

  return <div></div>;
};

export default SimilarMovies;
