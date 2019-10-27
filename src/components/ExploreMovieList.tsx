import React, { SyntheticEvent, useState, useEffect } from "react";
import { Card, SemanticWIDTHS } from "semantic-ui-react";

import { Movie, MoviePreference, SetMovies, User } from "../types";
import { PreferenceType } from "../constants";

import MovieCard from "./MovieCard";

import {
  addMoviePreference,
  fetchMovies,
  updateMoviePreferenceAsync
} from "../network/requests";
import MovieList from "./MovieList";

const ExploreMovieList = (props: {
  user: User;
  movies: Array<Movie>;
  fetchExploreMovies: () => void;
  setMovies: SetMovies;
}): JSX.Element => {
  const [userMovies, setUserMovies] = useState<Array<MoviePreference>>([]);
  const doFetchUserMovies = () => fetchMovies(props.user, setUserMovies);
  useEffect(props.fetchExploreMovies, []);
  useEffect(doFetchUserMovies, []);

  const userMoviePreferenceMap = userMovies.reduce(
    (acc: any, moviePreference: MoviePreference) => {
      acc[moviePreference.externalMovieId] = moviePreference.preferenceType;
      return acc;
    },
    {}
  );

  const handleChangeMoviePreference = (
    externalMovieId: string,
    preferenceType: PreferenceType
  ) => {
    const matchingMoviePreference = userMovies.find(
      userMovie => userMovie.externalMovieId == externalMovieId
    );
    if (matchingMoviePreference) {
      updateMoviePreferenceAsync(
        matchingMoviePreference.id,
        props.user,
        preferenceType
      );
    } else {
      addMoviePreference(props.user, Number(externalMovieId), preferenceType);
    }
  };

  return (
    <MovieList
      movies={props.movies}
      changeMoviePreference={handleChangeMoviePreference}
    />
  );
};

export default ExploreMovieList;
