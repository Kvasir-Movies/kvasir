import React, { useState, useEffect } from "react";

import MovieAdder from "../components/MovieAdder";
import logo from "../logo.svg";
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Kvasir Movies</h1>
        {user !== null && <p>Welcome back, {user.email}!</p>}
        <p>Find 🎬 with 👫 :D</p>
        {user !== null && <MovieAdder user={user} />}
        {user ? (
          <button onClick={handleLogout}>Log Out</button>
        ) : (
          <>
            <a className="login" href="/login">
              Log In
            </a>
            <a className="signup" href="/signup">
              Sign Up
            </a>
          </>
        )}
      </header>
    </div>
  );
};

export default HomePage;
