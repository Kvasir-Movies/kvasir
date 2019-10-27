import React, { useState } from "react";
import { components } from "react-select";
import AsyncSelect from "react-select/async";
import { Button, Image } from "semantic-ui-react";
import { debounce } from "underscore";

import { loadMovieOptions } from "../network/requests";
import { User, Movie } from "../types";
import { OptionProps } from "react-select/src/components/Option";

interface MovieOption {
  value: number;
  label: string;
  movie: Movie;
}

const MovieAdder = (props: {
  user: User;
  fetchUserMovies: () => void;
}): JSX.Element => {
  const [selectedMovie, setSelectedMovie] = useState<MovieOption | null>(null);
  const handleChange = (value: any, data: { action: string }) => {
    if (data.action === "select-option") {
      setSelectedMovie(value as MovieOption);
    }
  };

  const clearValue = () => {
    setSelectedMovie(null);
  };

  const handleAddMoviePreference = async () => {
    if (!selectedMovie) {
      return;
    }

    const response = await fetch(`/users/${props.user.id}/movie-preferences`, {
      method: "POST",
      body: JSON.stringify({ externalMovieId: selectedMovie.value }),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    });
    if (response.status !== 200) {
      alert(
        `Adding movie failed: ${response.status} ${response.statusText || ""}`
      );
    }
    clearValue();
    props.fetchUserMovies();
  };

  const Option = (props: OptionProps<MovieOption>) => {
    const movie = props.data.movie;
    const releaseYear = movie.release_date
      ? new Date(movie.release_date).getUTCFullYear()
      : null;
    return (
      <components.Option {...props}>
        <div className="movieDropdownOption">
          {movie.poster_path && <Image src={movie.poster_path} size="mini" />}
          <div className="movieDropdownOption-label">
            <b>{movie.title}</b>
            {releaseYear && (
              <span>
                {" "}
                (<i>{releaseYear}</i>)
              </span>
            )}
          </div>
        </div>
      </components.Option>
    );
  };

  return (
    <div style={{ display: "flex" }}>
      <AsyncSelect
        className="asyncSelect"
        components={{ Option }}
        loadOptions={loadMovieOptions}
        onChange={debounce(handleChange, 100)}
        onMenuOpen={clearValue}
        value={selectedMovie}
      />
      <Button
        onClick={handleAddMoviePreference}
        primary
        style={{ marginLeft: "0.5em" }}
      >
        Add
      </Button>
    </div>
  );
};

export default MovieAdder;
