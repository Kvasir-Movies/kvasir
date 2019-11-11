import React, { MouseEvent, useState } from "react";
import { components } from "react-select";
import AsyncSelect from "react-select/async";
import { Button, Image } from "semantic-ui-react";
import { debounce } from "underscore";

import { loadMovieOptions } from "../network/requests";
import { Movie } from "../types";
import { OptionProps } from "react-select/src/components/Option";

interface MovieOption {
  value: number;
  label: string;
  movie: Movie;
}

const MovieAdder = ({
  handleAddMovie
}: {
  handleAddMovie: (externalMovieId: string) => void;
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

  function onClick(e: MouseEvent) {
    if (selectedMovie) {
      handleAddMovie(selectedMovie.movie.externalMovieId);
      clearValue();
    }
  }

  const Option = (props: OptionProps<MovieOption>) => {
    const movie = props.data.movie;
    const releaseYear = movie.releaseDate
      ? new Date(movie.releaseDate).getUTCFullYear()
      : null;
    return (
      <components.Option {...props}>
        <div className="movieDropdownOption">
          {movie.posterPath && <Image src={movie.posterPath} size="mini" />}
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
      <Button onClick={onClick} primary style={{ marginLeft: "0.5em" }}>
        Add
      </Button>
    </div>
  );
};

export default MovieAdder;
