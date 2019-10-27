import React, { SyntheticEvent, useState, useEffect } from "react";
import { Card, SemanticWIDTHS } from "semantic-ui-react";

import { Movie, MoviePreference, SetMovies, User } from "../types";
import { PreferenceType } from "../constants";
import useWindowSize from "../hooks/useWindowSize";

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
  const windowWidth = useWindowSize().width || 0;
  // NOTE: Another factor is the mobile view which is handled by Card.Group's stackable property.
  const MIN_COLUMNS = 3;
  const NEXT_COLUMN_START = 800; // when to use more than 3 columns, in px;
  const COLUMN_INTERVAL = 200; // add a new column after multiple of this interval, in px
  const numColumns = Math.max(
    MIN_COLUMNS,
    Math.floor(
      (windowWidth - NEXT_COLUMN_START) / COLUMN_INTERVAL + MIN_COLUMNS + 1
    )
  ) as SemanticWIDTHS;
  console.log(numColumns);
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
    <Card.Group
      centered
      stackable
      itemsPerRow={("" + numColumns) as SemanticWIDTHS}
    >
      {props.movies.map((movie, index) => (
        <ExploreMovieCard
          key={index}
          movie={movie}
          changeMoviePreference={handleChangeMoviePreference}
        />
      ))}
    </Card.Group>
  );
};

export default ExploreMovieList;
