import { MoviePreference, User } from "../types";

export const fetchMovies = (
  user: User,
  setMovies: (movies: Array<MoviePreference>) => void
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
  setMovies: (movies: Array<MoviePreference>) => void
) => {
  return fetch(`/users/${user.id}/movie-preferences/${moviePreference.id}`, {
    method: "DELETE"
  })
    .then(response => response.json())
    .then(() => fetchMovies(user, setMovies));
};
