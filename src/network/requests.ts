import { PreferenceType } from "../constants";
import {
  Movie,
  MoviePreference,
  SetMovies,
  SetMoviePreferences,
  User
} from "../types";

export const addMoviePreference = (
  user: User,
  externalMovieId: number,
  preferenceType: PreferenceType
): void => {
  fetch(`/users/${user.id}/movie-preferences`, {
    method: "POST",
    body: JSON.stringify({
      externalMovieId: externalMovieId,
      preferenceType: preferenceType
    }),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
};

export const fetchExploreMovies = (setMovies: SetMovies): void => {
  fetch(`/explore`, {
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

export const fetchMovies = (
  user: User,
  setMovies: SetMoviePreferences
): void => {
  fetch(`/users/${user.id}/movie-preferences/`, {
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
    .then((data: { movies: Array<MoviePreference> }) => {
      setMovies(data.movies);
    });
};

export const loadMovieOptions = (inputValue: string) => {
  const searchParams = new URLSearchParams({ search: inputValue });
  return fetch("/search-movies?" + searchParams.toString())
    .then(response => response.json())
    .then(function(json: { searchResults: Array<Movie> }) {
      return json.searchResults.map(movie => ({
        movie: movie,
        label: movie.title,
        value: movie.externalMovieId
      }));
    });
};

export const deleteMovie = (
  user: User,
  moviePreference: MoviePreference,
  setMovies: SetMoviePreferences
) => {
  return fetch(`/users/${user.id}/movie-preferences/${moviePreference.id}`, {
    method: "DELETE"
  })
    .then(response => response.json())
    .then(() => fetchMovies(user, setMovies));
};

export const updateMoviePreferenceAsync = async (
  id: number,
  user: User,
  preferenceType: PreferenceType
) => {
  const response = await fetch(`users/${user.id}/movie-preferences/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({ preference_type: preferenceType })
  });
};

export const updateMoviePreference = async (
  id: number,
  user: User,
  preferenceType: PreferenceType,
  setMovies: SetMoviePreferences
) => {
  const response = await fetch(`users/${user.id}/movie-preferences/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({ preference_type: preferenceType })
  });
  if (response.status !== 200) {
    alert("Failed to update movie preference.");
  } else {
    fetchMovies(user, setMovies);
  }
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
