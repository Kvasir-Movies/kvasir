import React, { useState, useEffect } from "react";

import MovieAdder from "../components/MovieAdder";
import MovieList from "../components/MovieList";
import MovieRecommender from "../components/MovieRecommender";
import { MoviePreference, User } from "../types";
import { fetchMovies } from "../network/requests";

const HomePageDeprecated = (): JSX.Element => {
  return <div />;
  // const [user, setUser] = useState<User | null>(null);
  // const [movies, setMovies] = useState<Array<MoviePreference>>([]);
  // const fetchUserMovies = () => (user ? fetchMovies(user, setMovies) : null);

  // return (
  //   <div className="app">
  //     <header className="header">
  //       <p>Find 🎬 with 👫 😄</p>
  //       {user != null && <MovieRecommender />}
  // );
};

export default HomePageDeprecated;
