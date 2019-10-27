import { useEffect, useState } from "react";

import { User, MoviePreference } from "../types";
import { ChangeMoviePreference } from "../components/MovieCardBottom";
import {
  addMoviePreference,
  fetchMovies,
  updateMoviePreferenceAsync
} from "../network/requests";
import { PreferenceType } from "../constants";

export default function useUserMovies(
  user: User
): [Array<MoviePreference>, ChangeMoviePreference, () => void] {
  const [userMovies, setUserMovies] = useState<Array<MoviePreference>>([]);
  const doFetchUserMovies = () => fetchMovies(user, setUserMovies);
  useEffect(doFetchUserMovies, [user]);

  const handleChangeMoviePreference = async (
    externalMovieId: string,
    preferenceType: PreferenceType
  ) => {
    const matchingMoviePreference = userMovies.find(
      userMovie => userMovie.externalMovieId == externalMovieId
    );
    if (matchingMoviePreference) {
      await updateMoviePreferenceAsync(
        matchingMoviePreference.id,
        user,
        preferenceType
      );
      doFetchUserMovies();
    } else {
      await addMoviePreference(user, Number(externalMovieId), preferenceType);
      doFetchUserMovies();
    }
  };

  return [userMovies, handleChangeMoviePreference, doFetchUserMovies];
}
