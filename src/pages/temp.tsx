import React, { useState, useEffect } from "react";

import LayoutContainer from "../components/LayoutContainer";
import MovieAdder from "../components/MovieAdder";
import MovieList from "../components/MovieList";
import MovieRecommender from "../components/MovieRecommender";
import { fetchMovies } from "../network/requests";
import { MoviePreference, User } from "../types";

const HomePage = (): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [movies, setMovies] = useState<Array<MoviePreference>>([]);
  const fetchUserMovies = () => (user ? fetchMovies(user, setMovies) : null);

  useEffect(() => {
    fetch("/session")
      .then(response => response.json())
      .then((data: { user: User | null }) => {
        setUser(data.user);
      });
  }, []);

  const handleLogout = () => {
    fetch("/logout", { method: "POST" }).then(() => {
      setUser(null);
    });
  };

  return (
    <div />
    // <LayoutContainer activePath={Page.home}>
    //   <h1>Kvasir Movies</h1>
    //   {user != null && <p>Welcome back, {user.email}!</p>}
    //   <p>Find 🎬 with 👫 😄</p>
    //   {user != null && <MovieRecommender />}
    //   {user != null && (
    //     <MovieAdder user={user} fetchUserMovies={fetchUserMovies} />
    //   )}
    //   {user != null && (
    //     <MovieList
    //       user={user}
    //       movies={movies}
    //       fetchUserMovies={fetchUserMovies}
    //       setMovies={setMovies}
    //     />
    //   )}
    //   {user ? (
    //     <div className="links">
    //       <a onClick={handleLogout}>Log Out</a>
    //     </div>
    //   ) : (
    //     <div className="links">
    //       <a className="login" href="/login">
    //         Log In
    //       </a>
    //       <a className="signup" href="/signup">
    //         Sign Up
    //       </a>
    //     </div>
    //   )}
    // </LayoutContainer>
  );
};

export default HomePage;
