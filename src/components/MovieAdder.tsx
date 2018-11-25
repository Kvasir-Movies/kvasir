import React, { useState } from "react";
import AsyncSelect from "react-select/lib/Async";
import { debounce } from "underscore";

import { loadMovieOptions } from "../network/requests";
import { MoviePreference, User } from "../types";

interface Movie {
  value: number;
  label: string;
}

const MovieAdder = (props: {
  user: User;
  fetchUserMovies: () => void;
}): JSX.Element => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const handleChange = (value: any, data: { action: string }) => {
    if (data.action === "select-option") {
      setSelectedMovie(value as Movie);
    }
  };

  const clearValue = () => {
    setSelectedMovie(null);
  };

  const handleAddMoviePreference = () => {
    if (!selectedMovie) {
      return;
    }

    fetch(`/users/${props.user.id}/movie-preferences`, {
      method: "POST",
      body: JSON.stringify({ externalMovieId: selectedMovie.value }),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    })
      .then(response => {
        if (response.status !== 200) {
          throw new Error(
            `Adding movie failed: ${response.status} ${response.statusText ||
              ""}`
          );
        }
        return response.json();
      })
      .then((data: MoviePreference) => {
        alert(`Added movie ${data.id}`);
        props.fetchUserMovies();
      });
  };

  return (
    <div className="movieAdder">
      <AsyncSelect
        className="asyncSelect"
        loadOptions={loadMovieOptions}
        onChange={debounce(handleChange, 100)}
        onMenuOpen={clearValue}
        value={selectedMovie}
      />
      <button onClick={handleAddMoviePreference}>Add</button>
    </div>
  );
};

export default MovieAdder;
