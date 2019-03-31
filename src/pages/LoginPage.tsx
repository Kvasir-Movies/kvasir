import React, { useState } from "react";
import { Redirect } from "react-router";

import useFormInput from "../hooks/useFormInput";
import { User } from "../types";

export default function LoginPage(): JSX.Element {
  const email = useFormInput("");
  const password = useFormInput("");
  const [sessionUser, setsessionUser] = useState<User | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    fetch("/login", {
      method: "POST",
      body: JSON.stringify({ email: email.value, password: password.value }),
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
      .then((user: User) => {
        setsessionUser(user);
      })
      .catch(errorMessage => alert(errorMessage));
  }

  return sessionUser ? (
    <Redirect to="/" />
  ) : (
    <form onSubmit={handleSubmit} className="app">
      <div className="formField">
        <label>Email</label>
        <input type="text" name="email" {...email} />
      </div>
      <br />
      <div className="formField">
        <label>Password</label>
        <input type="password" name="password" {...password} />
      </div>
      <br />
      <button type="submit" value="Submit">
        Submit
      </button>
      <br />
    </form>
  );
}
