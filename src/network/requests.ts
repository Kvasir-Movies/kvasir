import { ExternalMovie, User } from "../types";

export const fetchMovies = (
  user: User,
  setMovies: (movies: Array<ExternalMovie>) => void
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
    .then((data: { movies: Array<ExternalMovie> }) => {
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
