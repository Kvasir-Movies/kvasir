import { useEffect, useState } from "react";

import { Movie, User, MoviePreference } from "../types";
import { fetchWatchlistMovies } from "../network/requests";
import { PreferenceType } from "../constants";

export default function useUserMovies(user: User): Array<Movie> {
  const [watchlistMovies, setWatchlistMovies] = useState<Array<Movie>>([]);
  // const refetchUserMovies = () => fetchMovies(user, setUserMovies);
  // useEffect(refetchUserMovies, [user]);

  // }
  useEffect(
    () => {
      fetchWatchlistMovies(user, setWatchlistMovies);
    },
    [user]
  );

  return watchlistMovies;
  // const handleChangeMoviePreference = async (
  //   externalMovieId: string,
  //   preferenceType: PreferenceType
  // ) => {
  //   const matchingMoviePreference = userMovies.find(
  //     userMovie => userMovie.externalMovieId == externalMovieId
  //   );
  //   if (matchingMoviePreference) {
  //     await updateMoviePreferenceAsync(
  //       matchingMoviePreference.id,
  //       user,
  //       preferenceType
  //     );
  //     refetchUserMovies();
  //   } else {
  //     await addMoviePreference(user, Number(externalMovieId), preferenceType);
  //     refetchUserMovies();
  //   }
  // };

  // return userMovies;
}
