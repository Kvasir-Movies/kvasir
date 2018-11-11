import React, { useState, ChangeEvent } from "react";
import AsyncSelect from "react-select/lib/Async";

const promiseOptions = (inputValue: string) => {
  const searchParams = new URLSearchParams({ search: inputValue });
  return fetch("/search-movies?" + searchParams.toString())
    .then(response => response.json())
    .then(function(json: {
      searchResults: Array<{ id: string; title: string }>;
    }) {
      console.log("here?");
      console.log(json);
      console.log(
        json.searchResults.map(option => ({
          label: option.title,
          value: option.id
        }))
      );
      return json.searchResults.map(option => ({
        label: option.title,
        value: option.id
      }));
    });
};

const MovieAdder = (): JSX.Element => {
  const [externalMovieId, setExternalMovieId] = useState<string | null>(null);
  const handleChange = (value: string) => {
    setExternalMovieId(value);
  };

  const handleAddMoviePreference = () => {
    fetch(`/users/foo/movie-preferences`);
  };

  return (
    <div style={{ width: "600px" }}>
      <AsyncSelect
        loadOptions={promiseOptions}
        onInputChange={handleChange}
        value={externalMovieId}
      />
      <button onClick={handleAddMoviePreference}>Add</button>
    </div>
  );
};

export default MovieAdder;
