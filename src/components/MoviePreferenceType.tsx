import React from "react";

import { updateMoviePreference } from "../network/requests";
import { PreferenceType, SetMovies, User } from "../types";

export default function MoviePreferenceType({
  movie_preference_id,
  preference,
  setMovies,
  user
}: {
  movie_preference_id: number;
  preference: PreferenceType;
  setMovies: SetMovies;
  user: User;
}): JSX.Element {
  if (preference == PreferenceType.positive) {
    return (
      <div
        className="preferenceIcon"
        onClick={() =>
          updateMoviePreference(
            movie_preference_id,
            user,
            PreferenceType.negative,
            setMovies
          )
        }
      >
        ✅
      </div>
    );
  } else {
    return (
      <div
        className="preferenceIcon"
        onClick={() =>
          updateMoviePreference(
            movie_preference_id,
            user,
            PreferenceType.positive,
            setMovies
          )
        }
      >
        🔴
      </div>
    );
  }
}
