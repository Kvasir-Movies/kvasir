import React, { Component } from "react";

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
      <div className="app">
        <header className="header">
          <h1>Kvasir Movies</h1>
          <p>
            {this.state.email ? `Welcome back, ${this.state.email}! ` : ""}
            Find 🎬 with 👫 😄
          </p>
          {this.state.email ? (
            <a onClick={this.handleLogout}>Log Out</a>
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
      </div>
    );
  }
}

export default HomePage;
