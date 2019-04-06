import React, { useEffect } from "react";
import deleteIcon from "../images/x_icon_light.svg";

import { MoviePreference, SetMovies, User } from "../types";
import { deleteMovie } from "../network/requests";
import MoviePreferenceType from "./MoviePreferenceType";

export default function MovieList(props: {
  user: User;
  movies: Array<MoviePreference>;
  fetchUserMovies: () => void;
  setMovies: SetMovies;
}): JSX.Element {
  useEffect(props.fetchUserMovies, []);

  return (
    <div className="movieList">
      My movies:
      {props.movies.map((movie, index) => (
        <div className="movieOption" key={index}>
          <div className="movieOptionWrapper">
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
        </div>
      ))}
    </div>
  );
}
