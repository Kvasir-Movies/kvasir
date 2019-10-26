import React from "react";

import { Movie, User } from "../types";
import { PreferenceType } from "../constants";

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
      <Card.Content extra>
        <Card.Header textAlign="center">{movie.title}</Card.Header>
      </Card.Content>
      <Card.Content>
        <Image centered fluid src={movie.poster_path} />
        <Card.Description textAlign="center" className="card-description">
          {movie.overview}
        </Card.Description>
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
