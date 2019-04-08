import React, { SyntheticEvent, useState, useEffect } from "react";

import {
  Movie,
  MoviePreference,
  PreferenceType,
  SetMovies,
  User
} from "../types";

import { Button, Card, Icon, Image } from "semantic-ui-react";

import {
  addMoviePreference,
  fetchMovies,
  updateMoviePreferenceAsync
} from "../network/requests";

const ExploreMovieList = (props: {
  user: User;
  movies: Array<Movie>;
  fetchExploreMovies: () => void;
  setMovies: SetMovies;
}): JSX.Element => {
  const [userMovies, setUserMovies] = useState<Array<MoviePreference>>([]);
  const doFetchUserMovies = () => fetchMovies(props.user, setUserMovies);

  useEffect(props.fetchExploreMovies, []);
  useEffect(doFetchUserMovies, []);

  const callAddMoviePreference = (
    preferenceType: PreferenceType,
    externalMovieId: string
  ) => {
    if (
      userMovies.filter(
        userMovie => userMovie.external_movie_id == externalMovieId
      ).length
    ) {
      updateMoviePreferenceAsync(+externalMovieId, props.user, preferenceType);
    } else {
      addMoviePreference(props.user, +externalMovieId, preferenceType);
    }
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
