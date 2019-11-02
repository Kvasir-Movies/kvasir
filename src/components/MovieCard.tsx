import React, { useState } from "react";

import { Card, Dimmer, Header, Image } from "semantic-ui-react";

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
  const [isHovering, setIsHovering] = useState(false);
  return (
    <Card>
      <Card.Content className="no-padding">
        <Dimmer.Dimmable
          blurring
          dimmed={isHovering}
          onMouseEnter={() => {
            setIsHovering(true);
          }}
          onMouseLeave={() => {
            setIsHovering(false);
          }}
        >
          <Image centered fluid src={movie.posterPath} />
          <Dimmer active={isHovering} className="contain-text">
            <Header inverted>{movie.title}</Header>
            {movie.overview}
          </Dimmer>
        </Dimmer.Dimmable>
      </Card.Content>
      <Card.Content extra className="no-padding">
        <MovieCardBottom
          movie={movie}
          changeMoviePreference={changeMoviePreference}
        />
      </Card.Content>
    </Card>
  );
};

export default MovieCard;
