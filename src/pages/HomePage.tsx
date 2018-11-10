import React, { Component } from "react";

import logo from "../logo.svg";

class HomePage extends Component {
  readonly state: { email: string } = { email: "" };

  componentDidMount() {
    this.fetchSession();
  }

  fetchSession() {
    fetch("/session")
      .then(response => response.json())
      .then((data: { email: string }) => {
        this.setState(data);
      });
  }

  handleLogout = () => {
    fetch("/logout", { method: "POST" }).then(() => {
      this.setState({ email: "" });
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Kvasir Movies</h1>
          <p>
            {this.state.email ? `Welcome back, ${this.state.email}! ` : ""}
            Find 🎬 with 👫 :D
          </p>
          {this.state.email ? (
            <button onClick={this.handleLogout}>Log Out</button>
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
  }
}

export default HomePage;
