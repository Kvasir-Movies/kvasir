export interface User {
  id: number;
  email: string;
}

export interface MoviePreference {
  id: number;
  user_id: number;
  external_movie_id: string;
  title: string;
}

export type SetMovies = (movies: Array<MoviePreference>) => void;
