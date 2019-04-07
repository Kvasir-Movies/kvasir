import React, { SyntheticEvent, useState, useEffect } from "react";

import { Movie, PreferenceType, SetMovies, User } from "../types";

import { Button, Card, Icon, Image } from "semantic-ui-react";

import { addMoviePreference } from "../network/requests";

const ExploreMovieList = (props: {
  user: User;
  movies: Array<Movie>;
  fetchExploreMovies: () => void;
  setMovies: SetMovies;
}): JSX.Element => {
  useEffect(props.fetchExploreMovies, []);

  const callAddMoviePreference = (
    preferenceType: PreferenceType,
    externalMovieId: string
  ) => {
    addMoviePreference(props.user, +externalMovieId, preferenceType);
  };

  return (
    <Card.Group centered>
      {props.movies.map((movie, index) => (
        <Card key={index}>
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
                  callAddMoviePreference(
                    PreferenceType.positive,
                    movie.externalMovieId
                  )
                }
              >
                <Icon name="checkmark" />
              </Button>
              <Button
                color="black"
                onClick={() =>
                  callAddMoviePreference(
                    PreferenceType.negative,
                    movie.externalMovieId
                  )
                }
              >
                <Icon name="close" />
              </Button>
            </Button.Group>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
};

export default ExploreMovieList;
