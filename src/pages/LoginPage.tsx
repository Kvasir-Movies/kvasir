import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { setSessionUser } from "../actions";
import AuthenticationForm from "../components/AuthenticationForm";
import LayoutContainer from "../components/LayoutContainer";
import { Path } from "../constants";
import useFormInput from "../hooks/useFormInput";
import { FullUser } from "../types";

const LoginPage = (): JSX.Element => {
  const { value: emailValue, onChange: onEmailChange } = useFormInput("");
  const { value: passwordValue, onChange: onPasswordChange } = useFormInput("");
  const dispatch = useDispatch();

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
      .then((user: FullUser) => {
        dispatch(setSessionUser(user));
      })
      .catch(errorMessage => alert(errorMessage));
  };

  return (
    <LayoutContainer>
      <AuthenticationForm
        emailValue={emailValue}
        footer={
          <span>
            Don't have an account?{" "}
            <Link to={Path.signupPage}>Sign up here.</Link>
          </span>
        }
        formName="Log in"
        handleOnSubmit={handleOnSubmit}
        onEmailChange={onEmailChange}
        onPasswordChange={onPasswordChange}
        passwordValue={passwordValue}
      />
    </LayoutContainer>
  );
};

export default LoginPage;
