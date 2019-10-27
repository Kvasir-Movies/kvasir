import React, { useEffect } from "react";

import { Movie, SetMovies, User } from "../types";

import MovieList from "./MovieList";
import useUserMovies from "../hooks/useUserMovies";

const ExploreMovieList = (props: {
  user: User;
  movies: Array<Movie>;
  setMovies: SetMovies;
}): JSX.Element => {
  const { handleChangeMoviePreference } = useUserMovies(props.user);

  return (
    <MovieList
      movies={props.movies}
      changeMoviePreference={handleChangeMoviePreference}
    />
  );
};

export default ExploreMovieList;
