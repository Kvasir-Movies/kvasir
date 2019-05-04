import React from "react";

import { Movie, MoviePreference, PreferenceType, User } from "../types";

import { Card, Image } from "semantic-ui-react";

import ExploreMovieCardBottom from "./ExploreMovieCardBottom";

const ExploreMovieCard = (props: {
  movie: Movie;
  changeMoviePreference: (
    externalMovieId: string,
    preferenceType: PreferenceType
  ) => void;
  moviePreference: MoviePreference | null;
}): JSX.Element => {
  const movie = props.movie;
  const moviePreference = props.moviePreference;
  const changeMoviePreference = props.changeMoviePreference;

  return (
    <Card>
      <Image src={movie.poster_path} />
      <Card.Content>
        <Card.Header>{movie.title}</Card.Header>
        <Card.Description>{movie.overview}</Card.Description>
      </Card.Content>
      {props.moviePreference != null && (
        <Card.Content extra>
          <ExploreMovieCardBottom
            movie={movie}
            changeMoviePreference={changeMoviePreference}
          />
        </Card.Content>
      )}
    </Card>
  );
};

export default ExploreMovieCard;
