import React, { Component, FormEvent, ChangeEvent } from "react";
import SessionInfo from "../types";
import { Redirect } from "react-router";

class LoginPage extends Component {
  readonly state: {
    email: string | null;
    password: string | null;
    sessionInfo: SessionInfo | null;
  } = {
    email: null,
    password: null,
    sessionInfo: null
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event: any) => {
    event.preventDefault();
    fetch("/login", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(
            `Login failed: ${response.status} ${response.statusText || ""}`
          );
        }
      })
      .then((data: { sessionInfo: SessionInfo }) => {
        this.setState({ sessionInfo: data });
      })
      .catch(errorMessage => alert(errorMessage));
  };

  render() {
    return this.state.sessionInfo ? (
      <Redirect to="/" />
    ) : (
      <form onSubmit={this.handleSubmit}>
        Email:{" "}
        <input type="text" name="email" onChange={this.handleInputChange} />
        <br />
        Password:{" "}
        <input
          type="password"
          name="password"
          onChange={this.handleInputChange}
        />
        <br />
        <input type="submit" value="Submit" />
        <br />
      </form>
    );
  }
}

export default LoginPage;
