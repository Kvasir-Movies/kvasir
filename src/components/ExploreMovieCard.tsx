import React from "react";

import { Movie, PreferenceType, User } from "../types";

import { Button, Card, Icon, Image } from "semantic-ui-react";

const ExploreMovieCard = (props: {
  movie: Movie;
  addMoviePreference: (
    externalMovieId: string,
    preferenceType: PreferenceType
  ) => void;
}): JSX.Element => {
  const movie = props.movie;
  const addMoviePreference = props.addMoviePreference;
  return (
    <Card>
      <Image src={movie.poster_path} />
      <Card.Content>
        <Card.Header>{movie.title}</Card.Header>
        <Card.Description>{movie.overview}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group fluid>
          <Button
            color="green"
            onClick={() =>
              addMoviePreference(movie.externalMovieId, PreferenceType.positive)
            }
          >
            <Icon name="checkmark" />
          </Button>
          <Button
            color="black"
            onClick={() =>
              addMoviePreference(movie.externalMovieId, PreferenceType.negative)
            }
          >
            <Icon name="close" />
          </Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default ExploreMovieCard;
