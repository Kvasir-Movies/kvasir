import React, { useEffect } from "react";
import deleteIcon from "../images/x_icon_light.svg";

import { MoviePreference, SetMovies, User } from "../types";
import { deleteMovie } from "../network/requests";

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
          {movie.title}
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
