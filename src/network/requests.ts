import { PreferenceType } from "../constants";
import { MoviePreference, SetMovies, User } from "../types";

export const fetchMovies = (user: User, setMovies: SetMovies): void => {
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
    .then(function(json: {
      searchResults: Array<{ id: string; title: string }>;
    }) {
      return json.searchResults.map(option => ({
        label: option.title,
        value: option.id
      }));
    });
};

export const deleteMovie = (
  user: User,
  moviePreference: MoviePreference,
  setMovies: SetMovies
) => {
  return fetch(`/users/${user.id}/movie-preferences/${moviePreference.id}`, {
    method: "DELETE"
  })
    .then(response => response.json())
    .then(() => fetchMovies(user, setMovies));
};

export const updateMoviePreference = async (
  id: number,
  user: User,
  preferenceType: PreferenceType,
  setMovies: SetMovies
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
  } else {
    alert("Added friend");
  }
};
