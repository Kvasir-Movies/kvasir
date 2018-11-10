import React, { Component, ChangeEvent } from "react";
import { Redirect } from "react-router";

class LoginPage extends Component {
  readonly state: {
    email: string | null;
    password: string | null;
    sessionEmail: string | null;
  } = {
    email: null,
    password: null,
    sessionEmail: null
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
      .then((data: { email: string }) => {
        this.setState({ sessionEmail: data.email });
      })
      .catch(errorMessage => alert(errorMessage));
  };

  render() {
    return this.state.sessionEmail ? (
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
