import React from "react";

import { Movie, User } from "../types";
import { PreferenceType } from "../constants";

import { Button, Icon } from "semantic-ui-react";

export default function MovieCardBottom(props: {
  movie: Movie;
  handleChangeMoviePreference: (preferenceType: PreferenceType) => void;
}): JSX.Element {
  const movie = props.movie;
  const handleChangeMoviePreference = props.handleChangeMoviePreference;

  return (
    <Button.Group fluid>
      <Button
        color="green"
        onClick={() => handleChangeMoviePreference(PreferenceType.positive)}
      >
        <Icon name="checkmark" />
      </Button>
      <Button
        color="black"
        onClick={() => handleChangeMoviePreference(PreferenceType.negative)}
      >
        <Icon name="close" />
      </Button>
    </Button.Group>
  );
}
