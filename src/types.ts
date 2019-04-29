import { RouteComponentProps } from "react-router-dom";

import { PreferenceType } from "./constants";

export interface MoviePreference {
  id: number;
  user_id: number;
  external_movie_id: string;
  title: string;
  preferenceType: PreferenceType;
}

export interface Movie {
  externalMovieId: string;
  title: string;
}

export interface User {
  id: number;
  email: string;
}

export interface AuthenticatedPageProps extends RouteComponentProps {
  sessionUser: User;
  setSessionUser: SetSessionUser;
}

export interface UnauthenticatedPageProps extends RouteComponentProps {
  setSessionUser: SetSessionUser;
}

export type SetMovies = (movies: Array<MoviePreference>) => void;
export type SetSessionUser = (sessionUser: User | null) => void;
