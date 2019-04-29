import React, { useEffect } from "react";
import { Icon, Segment } from "semantic-ui-react";

import deleteIcon from "../images/x_icon_light.svg";
import { MoviePreference, SetMovies, User } from "../types";
import { deleteMovie } from "../network/requests";
import MoviePreferenceType from "./MoviePreferenceType";

export default function MovieList(props: {
  user: User;
  movies: Array<MoviePreference>;
  setMovies: SetMovies;
}): JSX.Element {
  return (
    <Segment.Group>
      {props.movies.map(movie => (
        <Segment key={movie.id}>
          <div style={{ display: "flex" }}>
            <div style={{ flexGrow: 1, margin: "0.5em" }}>{movie.title}</div>
            <MoviePreferenceType
              movie_preference_id={movie.id}
              preference={movie.preferenceType}
              setMovies={props.setMovies}
              user={props.user}
            />
            <Icon
              link
              name="delete"
              onClick={() => deleteMovie(props.user, movie, props.setMovies)}
            />
          </div>
        </Segment>
      ))}
    </Segment.Group>
  );
}
