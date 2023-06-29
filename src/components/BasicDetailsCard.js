import React from "react";
import "../styles/BasicDetailsCard.css";

const BasicDetailsCard = ({ movie }) => {

  /* 
    shortenedOverview variable to be used in case movie overview is over 900
    characters. This is to keep the overview contained within the movie card.
  */
  const shortenedOverview = `${movie.overview.substring(0, 900) + " ..."}`;

  return (
    <div className="basic-details-card">
      <h1 className="basic-details-card__title">{movie.title}</h1>
      <h3 className="basic-details-card__date">
        <div className="movie-date">
          {movie.release_date ? movie.release_date : "Date Not Found"}
        </div>
      </h3>
      <br />
      <div className="basic-details-card__overview">
        {/* If overview length over 900 chars, use shortenedOverview above */}
        {movie.overview.length > 900 ? shortenedOverview : movie.overview}
      </div>
      <div className="basic-details-card__movie-score">
        Audience score: {movie.vote_average} / 10
      </div>
    </div>
  );
};

export default BasicDetailsCard;
