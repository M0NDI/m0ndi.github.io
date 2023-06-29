import axios from "axios";

/* API CALLS FROM TheMovieDatabase API - https://www.themoviedb.org */

// --------------------------------------------------
const BASE_URL = "https://api.themoviedb.org/3";
const BEARER =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTM0YmI2OThmODg3MWIxNDNlYmMzYmNiNDM0Mzg4YyIsInN1YiI6IjY0NDEzODJiZTJiY2E4MDQ4YjQyY2Q2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3xHl46jKQVLlkMEU7LZKKXLei9HUFE6yVcEnwbH_Vg0";

export const FetchMovies = async (searchTerm) => {
  const results = [];
  let currentPage = 1;
  let totalPages = 1;

  while (currentPage <= totalPages) {
    const response = await axios.get(`${BASE_URL}/search/movie?`, {
      headers: {
        Authorization: BEARER,
      },
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        query: searchTerm,
        page: currentPage,
      },
    });

    results.push(...response.data.results);
    totalPages = response.data.total_pages;
    currentPage++;
  }

  // Sort the results by release date in descending order
  const sortedResults = results.sort((a, b) => {
    return new Date(b.release_date) - new Date(a.release_date);
  });
  return sortedResults;
};

// --------------------------------------------------
export const FetchMovieDetails = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
    headers: {
      Authorization: BEARER,
    },
    params: {
      api_key: process.env.REACT_APP_API_KEY,
    },
  });
  return response.data;
};

export const FetchMovieVideos = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
    headers: {
      Authorization: BEARER,
    },
    params: {
      api_key: process.env.REACT_APP_API_KEY,
    },
  });
  return response.data;
};

export const FetchMovieCast = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
    headers: {
      Authorization: BEARER,
    },
    params: {
      api_key: process.env.REACT_APP_API_KEY,
    },
  });
  return response.data;
};

// --------------------------------------------------
export const FetchMostPopular = async (page) => {
  const response = await axios.get(`${BASE_URL}/movie/popular`, {
    headers: {
      Authorization: BEARER,
    },
    params: {
      api_key: process.env.REACT_APP_API_KEY,
      page: page,
    },
  });
  if (page > response.data.total_pages) {
    return [];
  }
  return response.data;
};

// --------------------------------------------------
export const FetchUpcoming = async (page) => {
  const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
    headers: {
      Authorization: BEARER,
    },
    params: {
      api_key: process.env.REACT_APP_API_KEY,
      page: page,
    },
  });
  if (page > response.data.total_pages) {
    return [];
  }
  return response.data;
};

export const FetchTopRated = async (page) => {
  const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
    headers: {
      Authorization: BEARER,
    },
    params: {
      api_key: process.env.REACT_APP_API_KEY,
      page: page,
    },
  });
  if (page > response.data.total_pages) {
    return [];
  }
  return response.data;
};

// export const FetchGenres = async () => {
//   const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
//     headers: {
//       Authorization: BEARER,
//     },
//     params: {
//       api_key: "7534bb698f8871b143ebc3bcb434388c",
//     },
//   });
//   console.log(response.data);
//   return response.data;
// };
