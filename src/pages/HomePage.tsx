import React, { useState, useEffect } from "react";

import MovieAdder from "../components/MovieAdder";
import MovieList from "../components/MovieList";
import { User } from "../types";

const HomePage = (): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);

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
        {user && <MovieAdder user={user} />}
        {user ? (
          <a onClick={handleLogout}>Log Out</a>
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
      {user && <MovieList user={user} />}
    </div>
  );
};

export default HomePage;
