import React from "react";

import { Movie, PreferenceType, User } from "../types";

import { Card, Image } from "semantic-ui-react";

import ExploreMovieCardBottom from "./ExploreMovieCardBottom";
const ExploreMovieCard = ({
  movie,
  changeMoviePreference
}: {
  movie: Movie;
  changeMoviePreference: (
    externalMovieId: string,
    preferenceType: PreferenceType
  ) => void;
}): JSX.Element => {
  return (
    <Card>
      <Image src={movie.poster_path} />
      <Card.Content>
        <Card.Header>{movie.title}</Card.Header>
        <Card.Description>{movie.overview}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <ExploreMovieCardBottom
          movie={movie}
          changeMoviePreference={changeMoviePreference}
        />
      </Card.Content>
    </Card>
  );
};

export default ExploreMovieCard;
