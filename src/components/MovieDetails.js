import { Link } from "react-router-dom";
import "../styles/MovieDetails.css";

const MovieDetails = ({ searchedMovie }) => {
  const shortenedOverview =
    searchedMovie.overview.length > 800
      ? searchedMovie.overview.substring(0, 800) + "..."
      : searchedMovie.overview;

  return (
    <div className="movie-details">
      <h1 className="movie-title">{searchedMovie.title}</h1>
      <div className="movie-date">{searchedMovie.release_date}</div>
      <div className="movie-overview">{shortenedOverview}</div>
      <div className="movie-score">
        Audience score: {searchedMovie.vote_average.toFixed(1)}
      </div>
      <Link to={`/movie/${searchedMovie.id}`}></Link>
    </div>
  );
};

export default MovieDetails;
