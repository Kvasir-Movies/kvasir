import React from "react";
import { Link } from "react-router-dom";

import AuthenticationForm from "../components/AuthenticationForm";
import LayoutContainer from "../components/LayoutContainer";
import { Path } from "../constants";
import useFormInput from "../hooks/useFormInput";
import { UnauthenticatedPageProps, User } from "../types";

const LoginPage = ({
  setSessionUser
}: UnauthenticatedPageProps): JSX.Element => {
  const { value: emailValue, onChange: onEmailChange } = useFormInput("");
  const { value: passwordValue, onChange: onPasswordChange } = useFormInput("");

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    fetch("/login", {
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
            `Login failed: ${response.status} ${response.statusText || ""}`
          );
        }
      })
      .then((user: User) => {
        setSessionUser(user);
      })
      .catch(errorMessage => alert(errorMessage));
  };

  return (
    <LayoutContainer setSessionUser={setSessionUser}>
      <AuthenticationForm
        emailValue={emailValue}
        footer={
          <span>
            Don't have an account?{" "}
            <Link to={Path.signupPage}>Sign up here.</Link>
          </span>
        }
        formName="Log In"
        handleOnSubmit={handleOnSubmit}
        onEmailChange={onEmailChange}
        onPasswordChange={onPasswordChange}
        passwordValue={passwordValue}
      />
    </LayoutContainer>
  );
};

export default LoginPage;
