import React, { useState, useEffect } from "react";

import { ExternalMovie, User } from "../types";

export default function MovieList(props: { user: User }): JSX.Element {
  const [movies, setMovies] = useState<Array<ExternalMovie>>([]);

  useEffect(() => {
    fetch(`/users/${props.user.id}/movie-preferences`, {
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
  }, []);

  return (
    <div className="movieList">
      My movies:
      {movies.map((movie, index) => (
        <div className="movie" key={index}>
          {movie.title}
        </div>
      ))}
    </div>
  );
}
