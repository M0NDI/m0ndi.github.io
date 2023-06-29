import React from "react";
import "../styles/BasicDetailsCard.css";

const BasicDetailsCard = ({ movie }) => {
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
        {movie.overview.length > 900 ? shortenedOverview : movie.overview}
      </div>
      <div className="basic-details-card__movie-score">
        Audience score: {movie.vote_average} / 10
      </div>
    </div>
  );
};

export default BasicDetailsCard;
