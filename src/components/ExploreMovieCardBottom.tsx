import React from "react";

import { Movie, User } from "../types";
import { PreferenceType } from "../constants";

import { Button, Icon } from "semantic-ui-react";

const ExploreMovieCardBottom = (props: {
  movie: Movie;
  changeMoviePreference: (
    externalMovieId: string,
    preferenceType: PreferenceType
  ) => void;
}): JSX.Element => {
  const movie = props.movie;
  const changeMoviePreference = props.changeMoviePreference;

  return (
    <Button.Group fluid>
      <Button
        color="green"
        onClick={() =>
          changeMoviePreference(movie.externalMovieId, PreferenceType.positive)
        }
      >
        <Icon name="checkmark" />
      </Button>
      <Button
        color="black"
        onClick={() =>
          changeMoviePreference(movie.externalMovieId, PreferenceType.negative)
        }
      >
        <Icon name="close" />
      </Button>
    </Button.Group>
  );
};

export default ExploreMovieCardBottom;
