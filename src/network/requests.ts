import { Movie, MoviePreference, SetMovies, User } from "../types";

export const fetchExploreMovies = (
  setMovies: SetMovies,
  sortMethod: string
): void => {
  fetch(`/explore?sort=${sortMethod}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  })
    .then(response => {
      if (response.status !== 200) {
        throw new Error(
          `Fetching Explore page failed: ${
            response.status
          } ${response.statusText || ""}`
        );
      }
      return response.json();
    })
    .then((data: { movies: Array<Movie> }) => {
      setMovies(data.movies);
    });
};

export const fetchWatchlistMovies = (
  user: User,
  setMovies: SetMovies
): void => {
  fetch(`/users/${user.id}/actions:get-watchlist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  })
    .then(response => {
      if (response.status !== 200) {
        throw new Error(
          `Fetching movies failed: ${response.status} ${response.statusText ||
            ""}`
        );
      }
      return response.json();
    })
    .then((data: { movies: Array<Movie> }) => {
      setMovies(data.movies);
    });
};

export const loadMovieOptions = (inputValue: string) => {
  const searchParams = new URLSearchParams({ search: inputValue });
  return fetch("/search-movies?" + searchParams.toString())
    .then(response => response.json())
    .then(function(data: { movies: Array<Movie> }) {
      return data.movies.map(movie => ({
        movie: movie,
        label: movie.title,
        value: movie.externalMovieId
      }));
    });
};

export const upsertMoviePreference = async (mp: MoviePreference) => {
  return fetch(`/users/${mp.userId}/movie-preferences`, {
    method: "PUT",
    body: JSON.stringify({
      externalMovieId: mp.externalMovieId,
      preferenceType: mp.preferenceType
    }),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
};

export const getRecommendation = async (emails: string) => {
  const searchParams = new URLSearchParams({ emails });
  const response = await fetch("/get-recommendation?" + searchParams);
  if (response.status !== 200) {
    alert("Failed to get recommendations");
    return [];
  }

  const json = await response.json();
  return json.movies;
};

export const addFriend = async (userId: number, friendEmail: string) => {
  const response = await fetch(`users/${userId}/friendships`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({ friendEmail })
  });
  if (response.status !== 200) {
    alert("Failed to add friend.");
    return null;
  } else {
    alert("Added friend");
  }

  const json = await response.json();
  return json;
};

export const searchUsers = async (query: string) => {
  const searchParams = new URLSearchParams({ query });
  const response = await fetch("users/search?" + searchParams);
  if (response.status !== 200) {
    return [];
  }
  const json = await response.json();
  return json.users;
};
