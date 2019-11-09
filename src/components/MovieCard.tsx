import React, { useState } from "react";
import { Card, Dimmer, Header, Image } from "semantic-ui-react";

import useSessionUser from "../hooks/useSessionUser";
import MovieCardBottom from "./MovieCardBottom";
import { Movie } from "../types";
import { PreferenceType } from "../constants";
import useUpsertMoviePreference from "../hooks/useUpsertMoviePreferences";

const MovieCard = ({ movie }: { movie: Movie }): JSX.Element => {
  const [isHovering, setIsHovering] = useState(false);
  const upsertMoviePreference = useUpsertMoviePreference();
  const sessionUser = useSessionUser();

  function handleChangeMoviePreference(preferenceType: PreferenceType) {
    upsertMoviePreference({
      externalMovieId: movie.externalMovieId,
      preferenceType,
      userId: sessionUser!.id
    });
  }

  return (
    <Card className="movieCard">
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
      {sessionUser && (
        <Card.Content extra className="no-padding">
          <MovieCardBottom
            movie={movie}
            handleChangeMoviePreference={handleChangeMoviePreference}
          />
        </Card.Content>
      )}
    </Card>
  );
};

export default MovieCard;
