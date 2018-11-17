import React, { useState, useEffect } from "react";

import MovieAdder from "../components/MovieAdder";
import MovieList from "../components/MovieList";
import { ExternalMovie, User } from "../types";
import { fetchMovies } from "../network/requests";

const HomePage = (): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [movies, setMovies] = useState<Array<ExternalMovie>>([]);
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
    <div className="app">
      <header className="header">
        <h1>Kvasir Movies</h1>
        {user && <p>Welcome back, {user.email}!</p>}
        <p>Find 🎬 with 👫 😄</p>
        {user && <MovieAdder user={user} fetchUserMovies={fetchUserMovies} />}
        {user ? (
          <div className="links">
            <a onClick={handleLogout}>Log Out</a>
          </div>
        ) : (
          <div className="links">
            <a className="login" href="/login">
              Log In
            </a>
            <a className="signup" href="/signup">
              Sign Up
            </a>
          </div>
        )}
      </header>
      {user && (
        <MovieList
          user={user}
          movies={movies}
          fetchUserMovies={fetchUserMovies}
        />
      )}
    </div>
  );
};

export default HomePage;
