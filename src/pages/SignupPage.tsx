import React, { useState } from "react";
import { Redirect } from "react-router";

import useFormInput from "../hooks/useFormInput";

export default function SignupPage(): JSX.Element {
  const email = useFormInput("");
  const password = useFormInput("");
  const [signedUp, setSignedUp] = useState(false);

  function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    fetch("/signup", {
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
      .then(() => setSignedUp(true))
      .catch(errorMessage => alert(errorMessage));
  }

  return signedUp ? (
    <Redirect to="/" />
  ) : (
    <form onSubmit={handleOnSubmit}>
      Email:{" "}
      <input
        type="text"
        name="email"
        value={email.value}
        onChange={email.handleChange}
      />
      <br />
      Password:{" "}
      <input
        type="text"
        name="password"
        value={password.value}
        onChange={password.handleChange}
      />
      <br />
      <input type="submit" value="Submit" />
      <br />
    </form>
  );
}
