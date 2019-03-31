import React from "react";

import { updateMoviePreference } from "../network/requests";
import { PreferenceType, SetMovies, User } from "../types";

export default function MoviePreferenceType({
  id,
  preference,
  setMovies,
  user
}: {
  id: number;
  preference: PreferenceType;
  setMovies: SetMovies;
  user: User;
}): JSX.Element {
  if (preference == PreferenceType.positive) {
    return (
      <div
        className="preferenceIcon"
        onClick={() =>
          updateMoviePreference(id, user, PreferenceType.negative, setMovies)
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
          updateMoviePreference(id, user, PreferenceType.positive, setMovies)
        }
      >
        🔴
      </div>
    );
  }
}
