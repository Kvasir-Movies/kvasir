import React, { useEffect } from "react";

import { Movie, SetMovies, User } from "../types";

import MovieList from "./MovieList";
import useUserMovies from "../hooks/useUserMovies";

const ExploreMovieList = (props: {
  user: User;
  movies: Array<Movie>;
  fetchExploreMovies: () => void;
  setMovies: SetMovies;
}): JSX.Element => {
  useEffect(props.fetchExploreMovies, []);
  const [
    _userMovies,
    handleChangeMoviePreference,
    _refetchUserMovies
  ] = useUserMovies(props.user);

  return (
    <MovieList
      movies={props.movies}
      changeMoviePreference={handleChangeMoviePreference}
    />
  );
};

export default ExploreMovieList;
