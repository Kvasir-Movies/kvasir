import React, { useState } from "react";
import { Link } from "react-router-dom";

import useFormInput from "../hooks/useFormInput";
import AuthenticationForm from "../components/AuthenticationForm";
import LayoutContainer from "../components/LayoutContainer";
import { Path } from "../constants";
import { UnauthenticatedPageProps, User } from "../types";

const SignupPage = ({
  setSessionUser
}: UnauthenticatedPageProps): JSX.Element => {
  const { value: emailValue, onChange: onEmailChange } = useFormInput("");
  const { value: passwordValue, onChange: onPasswordChange } = useFormInput("");

  function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    fetch("/signup", {
      method: "POST",
      body: JSON.stringify({ email: emailValue, password: passwordValue }),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(
            `Signup failed: ${response.status} ${response.statusText || ""}`
          );
        }
      })
      .then((user: User) => {
        setSessionUser(user);
      })
      .catch(errorMessage => alert(errorMessage));
  }

  return (
    <LayoutContainer setSessionUser={setSessionUser}>
      <AuthenticationForm
        emailValue={emailValue}
        footer={
          <span>
            Already have an account?{" "}
            <Link to={Path.loginPage}>Log in here.</Link>
          </span>
        }
        formName="Create an account"
        handleOnSubmit={handleOnSubmit}
        onEmailChange={onEmailChange}
        onPasswordChange={onPasswordChange}
        passwordValue={passwordValue}
      />
    </LayoutContainer>
  );
};

export default SignupPage;
