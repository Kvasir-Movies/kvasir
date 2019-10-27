import React, { useEffect } from "react";
import { Segment } from "semantic-ui-react";

import deleteIcon from "../images/x_icon_light.svg";
import { MoviePreference, SetMoviePreferences, User } from "../types";
import { deleteMovie } from "../network/requests";
import MoviePreferenceType from "./MoviePreferenceType";

export default function UserMovieList(props: {
  user: User;
  movies: Array<MoviePreference>;
  fetchUserMovies: () => void;
  setMovies: SetMoviePreferences;
}): JSX.Element {
  return (
    <Segment.Group>
      {props.movies.map(movie => (
        <Segment key={movie.externalMovieId}>
          <div style={{ display: "flex" }}>
            <div style={{ flexGrow: 1, margin: "0.5em" }}>{movie.title}</div>
            <MoviePreferenceType
              movie_preference_id={movie.id}
              preference={movie.preferenceType}
              setMovies={props.setMovies}
              user={props.user}
            />
          </div>
          <div className="movieTitle">
            {movie.title}
            <img className="moviePoster" src={movie.poster_path} />
          </div>
          <div className="movieOverview">{movie.overview}</div>
          <img
            className="deleteIcon"
            src={deleteIcon}
            onClick={() => deleteMovie(props.user, movie, props.setMovies)}
          />
        </Segment>
      ))}
    </Segment.Group>
  );
}
