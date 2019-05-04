import React, { SyntheticEvent, useState, useEffect } from "react";

import {
  Movie,
  MoviePreference,
  PreferenceType,
  SetMovies,
  User
} from "../types";

import { Card } from "semantic-ui-react";

import ExploreMovieCard from "./ExploreMovieCard";

import {
  addMoviePreference,
  fetchMovies,
  updateMoviePreferenceAsync
} from "../network/requests";

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
      acc[moviePreference.external_movie_id] = moviePreference.preferenceType;
      return acc;
    },
    {}
  );

  const handleChangeMoviePreference = (
    externalMovieId: string,
    preferenceType: PreferenceType
  ) => {
    const matchingMoviePreference = userMovies.filter(
      userMovie => userMovie.external_movie_id == externalMovieId
    );
    if (matchingMoviePreference.length) {
      updateMoviePreferenceAsync(
        matchingMoviePreference[0].id,
        props.user,
        preferenceType
      );
    } else {
      addMoviePreference(props.user, +externalMovieId, preferenceType);
    }
  };

  return (
    <Card.Group centered>
      {props.movies.map((movie, index) => (
        <ExploreMovieCard
          key={index}
          movie={movie}
          changeMoviePreference={handleChangeMoviePreference}
          moviePreference={
            userMoviePreferenceMap[movie.externalMovieId]
              ? userMoviePreferenceMap[movie.externalMovieId]
              : null
          }
        />
      ))}
    </Card.Group>
  );
};

export default ExploreMovieList;
