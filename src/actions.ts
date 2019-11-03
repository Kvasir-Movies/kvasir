import { MoviePreference, User } from "./types";

export const ADD_MOVIE_PREFERENCE = "ADD_MOVIE_PREFERENCE";
export const UPSERT_MOVIE_PREFERENCE = "UPSERT_MOVIE_PREFERENCE";
export const SET_SESSION_LOADED = "SET_SESSION_LOADED";
export const SET_SESSION_USER = "SET_SESSION_USER";

export function setSessionLoaded(hasSessionLoaded: boolean) {
  return {
    type: SET_SESSION_LOADED,
    hasSessionLoaded
  };
}
export function setSessionUser(user: User | null) {
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
