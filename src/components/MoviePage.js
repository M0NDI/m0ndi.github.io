import React, { useState, useEffect } from "react";
import { FetchMovieDetails } from "../api/TMDB-Api";
import { FetchMovieCast } from "../api/TMDB-Api";
import { FetchMovieVideos } from "../api/TMDB-Api";
import { useParams } from "react-router-dom";
import SimilarMovies from "./SimilarMovies";
import "../styles/MoviePage.css";

const MoviePage = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieCast, setMovieCast] = useState([]);
  const [movieVideos, setMovieVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const imagePath = "https://image.tmdb.org/t/p/original";

  /* 
    Check movie object returned by FetchMovieVideos in TMDB-Api.js.
    If movieVideos.results exists then check if words in usableKeywords
    are also found in movieVideos.results. 

    If found, then assign videoKey/videoTitle the values of correctVideo.key
    and correctVideo.name respectively from the video object that matches 
    the firt keyword in usableKeywords.
  */
  const usableKeywords = /Official Trailer|RedBandTrailer|Trailer/;

  const correctVideo =
    movieVideos.results &&
    movieVideos.results.find((video) => usableKeywords.exec(video.name));
  const videoKey = correctVideo ? correctVideo.key : "";
  const videoTitle = correctVideo ? correctVideo.name : "";

  /* 
    Convert minutes to hours and minutes.
    Divide totalMinutes by 60.
    Calculate totalMinutes modulo 60.

    E.g totalMinutes = 100:
      100 / 60 rounded down to 1 digit (Math.floor()) = 1.
      100 modulo 60 = 40. 60 Goes into 100 once with a remainder of 40.
      
      Therefore 100 mins = 1 hour 40 mins.
  */
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  // Get movie details
  useEffect(() => {
    const getMovieDetails = async () => {
      const details = await FetchMovieDetails(id);
      setMovieDetails(details);
    };
    getMovieDetails();

    const getMovieCast = async () => {
      const castData = await FetchMovieCast(id);
      setMovieCast(castData);
      setLoading(false);
    };
    getMovieCast();

    const getMovieVideos = async () => {
      const videoData = await FetchMovieVideos(id);
      setMovieVideos(videoData);
    };
    getMovieVideos();
  }, [id]);

  if (!movieDetails) {
    // Render a loading state or handle the absence of movie details
    return <div className="loading">Loading...</div>;
  }
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  /* 
    backgroundColor variable to control the background color of movie audience score 
    on movie page (/movie/id) based on rating. 0-5 = red, 5-6.9 = orange, 7-10 = green 
  */
  let backgroundColor;
  if (movieDetails.vote_average >= 7) {
    backgroundColor = "green";
  } else if (movieDetails.vote_average >= 5 && movieDetails.vote_average < 7) {
    backgroundColor = "orange";
  } else {
    backgroundColor = "red";
  }

  return (
    <div className="movie-container">
      <>
        <div className="movie-poster">
          <h1>{movieDetails.title}</h1>
          <h2 className="runtime">
            ({toHoursAndMinutes(movieDetails.runtime)})
          </h2>
          <h3>{movieDetails.release_date}</h3>
          <div className="poster">
            <div className="user-score" style={{ backgroundColor }}>
              {movieDetails.vote_average.toFixed(1)}
            </div>
            <img
              src={imagePath + movieDetails.poster_path}
              alt={movieDetails.title}
            />
            <div className="genres-and-details">
              <div class="genres">
                {movieDetails.genres.map((genre) => {
                  return <div key={genre.id}>{genre.name}</div>;
                })}
              </div>
              <div className="extra-details">
                <div className="production-companies-container">
                  <h1>Production companies:</h1>
                  <div class="companies">
                    {movieDetails.production_companies.map((company) => {
                      return <div className="company">{company.name}</div>;
                    })}
                  </div>
                  <div class="movie-budget">
                    {movieDetails.budget > 0 ? (
                      <>
                        <h1>Budget:</h1>
                        <div>${movieDetails.budget.toLocaleString()}</div>
                      </>
                    ) : (
                      <>
                        <h1>Budget:</h1>
                        <p>Unknown</p>
                      </>
                    )}
                  </div>
                  <div class="movie-revenue">
                    {movieDetails.revenue > 0 ? (
                      <>
                        <h1>Revenue:</h1>
                        <div>${movieDetails.revenue.toLocaleString()}</div>
                      </>
                    ) : (
                      <>
                        <h1>Revenue:</h1>
                        <p>Unknown</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      <div className="trailer-embed">
        <div className="overview-container">
          <div className="overview-header">OVERVIEW</div>
          {movieDetails.overview ? (
            <div className="movie-overviews">{movieDetails.overview}</div>
          ) : (
            <div className="no-overview">Overview Not Available</div>
          )}
        </div>
        <div className="movie-trailer">
          {correctVideo ? (
            <iframe
              width="600"
              height="400"
              src={`https://www.youtube.com/embed/${correctVideo.key}`}
              title={videoTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          ) : (
            <p className="no-trailer">No trailer available</p>
          )}
        </div>
        {/* 
          If movieCast.cast exists and its length > 0 then display top cast details,
          otherwise display "cast not available."
        */}
        {movieCast.cast && movieCast.cast.length > 0 ? (
          <>
            <div className="cast-header">TOP CAST</div>
            <div className="actors">
              {movieCast.cast.slice(0, 6).map(
                (member) =>
                  member.profile_path && (
                    <div key={member.id}>
                      <p className="actor-name">{member.name}</p>
                      <img
                        className="actor-photo"
                        src={imagePath + member.profile_path}
                        alt={member.name}
                      />
                      <p className="actor-character">{member.character}</p>
                    </div>
                  )
              )}
            </div>
          </>
        ) : (
          <div className="cast-not-available">
            <div className="cast-header">Top Cast</div>
            <p>Cast not available</p>
          </div>
        )}
      </div>
      <SimilarMovies id={id} />
    </div>
  );
};

export default MoviePage;
