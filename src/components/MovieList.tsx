import React, { useEffect } from "react";
import deleteIcon from "../images/x_icon_light.svg";

import { MoviePreference, User } from "../types";
import { deleteMovie } from "../network/requests";

export default function MovieList(props: {
  user: User;
  movies: Array<MoviePreference>;
  fetchUserMovies: () => void;
  setMovies: (movies: Array<MoviePreference>) => void;
}): JSX.Element {
  useEffect(props.fetchUserMovies, []);

  return (
    <div className="movieList">
      My movies:
      {props.movies.map((movie, index) => (
        <div className="movieOption" key={index}>
          {movie.title}
          <img
            src={deleteIcon}
            onClick={() => deleteMovie(props.user, movie, props.setMovies)}
          />
        </div>
      ))}
    </div>
  );
}
