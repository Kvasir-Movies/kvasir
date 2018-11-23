import React, { useEffect } from "react";
import deleteIcon from "../images/x_icon_light.svg";

import { ExternalMovie, User } from "../types";

export default function MovieList(props: {
  user: User;
  movies: Array<ExternalMovie>;
  fetchUserMovies: () => void;
}): JSX.Element {
  useEffect(props.fetchUserMovies, []);

  return (
    <div className="movieList">
      My movies:
      {props.movies.map((movie, index) => (
        <div className="movieOption" key={index}>
          {movie.title}
          <img src={deleteIcon} />
        </div>
      ))}
    </div>
  );
}
