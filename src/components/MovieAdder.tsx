import React, { useState, ChangeEvent } from "react";
import AsyncSelect from "react-select/lib/Async";
import { debounce } from "underscore";

import { MoviePreference, User } from "../types";

const promiseOptions = (inputValue: string) => {
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

interface externalMovie {
  value: number;
  label: string;
}

const MovieAdder = (props: { user: User }): JSX.Element => {
  const [externalMovie, setExternalMovie] = useState<externalMovie | null>(
    null
  );
  const handleChange = (value: any, data: { action: string }) => {
    if (data.action === "select-option") {
      setExternalMovie(value as externalMovie);
    }
  };

  const clearValue = () => {
    setExternalMovie(null);
  };

  const handleAddMoviePreference = () => {
    if (!externalMovie) {
      return;
    }

    fetch(`/users/${props.user.id}/movie-preferences`, {
      method: "POST",
      body: JSON.stringify({ externalMovieId: externalMovie.value }),
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
      });
  };

  return (
    <div className="movieAdder" style={{ width: "600px" }}>
      <AsyncSelect
        className="asyncSelect"
        loadOptions={promiseOptions}
        onChange={debounce(handleChange, 100)}
        onMenuOpen={clearValue}
        value={externalMovie}
      />
      <button onClick={handleAddMoviePreference}>Add</button>
    </div>
  );
};

export default MovieAdder;
