import React from "react";
import { Card, Image } from "semantic-ui-react";

import { Movie, User } from "../types";
import { PreferenceType } from "../constants";
import MovieCardBottom, { ChangeMoviePreference } from "./MovieCardBottom";

const MovieCard = ({
  movie,
  changeMoviePreference
}: {
  movie: Movie;
  changeMoviePreference: ChangeMoviePreference;
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
        <MovieCardBottom
          movie={movie}
          changeMoviePreference={changeMoviePreference}
        />
      </Card.Content>
    </Card>
  );
};

export default MovieCard;
