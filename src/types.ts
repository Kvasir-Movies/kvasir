import { PreferenceType } from "./constants";

export interface Friend {
  email: string;
}

export interface MoviePreference {
  userId: number;
  externalMovieId: string;
  preferenceType: PreferenceType;
}

export interface Movie {
  externalMovieId: string;
  title: string;
  overview: string;
  posterPath?: string;
  releaseDate?: string;
}

export interface User {
  id: number;
  email: string;
}

// Includes lists of information, which can potentially be very large
export interface FullUser extends User {
  friends: Array<Friend>;
  moviePreferences: Array<MoviePreference>;
}

export interface AuthenticatedPageProps {
  sessionUser: User;
  setSessionUser: SetSessionUser;
}

export interface UnauthenticatedPageProps {
  setSessionUser: SetSessionUser;
}

export interface GlobalState {
  sessionUser: FullUser | null;
  hasSessionLoaded: boolean;
}

export interface Action {
  type: string;
  hasSessionLoaded?: boolean;
  moviePreference?: MoviePreference;
  user?: User;
}

export type SetMovies = (movies: Array<Movie>) => void;
export type SetMoviePreferences = (movies: Array<MoviePreference>) => void;
export type SetSessionUser = (sessionUser: User | null) => void;
