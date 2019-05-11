import React from "react";

import { PreferenceType } from "../constants";
import { updateMoviePreference } from "../network/requests";
import { SetMoviePreferences, User } from "../types";

export default function MoviePreferenceType({
  movie_preference_id,
  preference,
  setMovies,
  user
}: {
  movie_preference_id: number;
  preference: PreferenceType;
  setMovies: SetMoviePreferences;
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
