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
): {
  userMovies: Array<MoviePreference>;
  handleChangeMoviePreference: ChangeMoviePreference;
  refetchUserMovies: () => void;
} {
  const [userMovies, setUserMovies] = useState<Array<MoviePreference>>([]);
  const refetchUserMovies = () => fetchMovies(user, setUserMovies);
  useEffect(refetchUserMovies, [user]);

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
      refetchUserMovies();
    } else {
      await addMoviePreference(user, Number(externalMovieId), preferenceType);
      refetchUserMovies();
    }
  };

  return { userMovies, handleChangeMoviePreference, refetchUserMovies };
}
