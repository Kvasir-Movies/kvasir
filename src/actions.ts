import { Action, FullUser, MoviePreference } from "./types";

export const UPSERT_MOVIE_PREFERENCE = "UPSERT_MOVIE_PREFERENCE";
export const SET_SESSION_DATA = "SET_SESSION_DATA";
export const SET_SESSION_USER = "SET_SESSION_USER";

export function setSessionData(
  hasSessionLoaded: boolean,
  user: FullUser | null
): Action {
  return {
    type: SET_SESSION_DATA,
    hasSessionLoaded,
    user
  };
}

export function setSessionUser(user: FullUser | null): Action {
  return {
    type: SET_SESSION_USER,
    user
  };
}

export function upsertMoviePreference(moviePreference: MoviePreference) {
  return {
    type: UPSERT_MOVIE_PREFERENCE,
    moviePreference
  };
}
