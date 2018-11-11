import React, { ChangeEvent, useState, useEffect } from "react";

import logo from "../logo.svg";

const HomePage = (): JSX.Element => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("/session")
      .then(response => response.json())
      .then((data: { email: string }) => {
        setEmail(data.email);
      });
  }, []);

  const handleLogout = () => {
    fetch("/logout", { method: "POST" }).then(() => {
      setEmail("");
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Kvasir Movies</h1>
        {Boolean(email) && <p>Welcome back, {email}!</p>}
        <p>Find 🎬 with 👫 :D</p>
        {email ? (
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
