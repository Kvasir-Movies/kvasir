import { PreferenceType } from "./constants";

export interface Friend {
  email: string;
}

export interface MoviePreference {
  id: number;
  user_id: number;
  externalMovieId: string;
  title: string;
  overview: string;
  poster_path: string;
  preferenceType: PreferenceType;
}

export interface Movie {
  externalMovieId: string;
  title: string;
  overview: string;
  poster_path: string;
  release_date?: string;
}

export interface User {
  id: number;
  email: string;
  friends: Array<Friend>;
}

export interface AuthenticatedPageProps {
  sessionUser: User;
  setSessionUser: SetSessionUser;
}

export interface UnauthenticatedPageProps {
  setSessionUser: SetSessionUser;
}

export interface GlobalState {
  sessionUser: User | null;
  hasSessionLoaded: boolean;
}

export interface Action {
  type: string;
  hasSessionLoaded?: boolean;
  user?: User;
}

export type SetMovies = (movies: Array<Movie>) => void;
export type SetMoviePreferences = (movies: Array<MoviePreference>) => void;
export type SetSessionUser = (sessionUser: User | null) => void;
