import React from "react";

import AuthenticationForm from "../components/AuthenticationForm";
import LayoutContainer from "../components/LayoutContainer";
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
        formName="Login"
        handleOnSubmit={handleOnSubmit}
        onEmailChange={onEmailChange}
        onPasswordChange={onPasswordChange}
        passwordValue={passwordValue}
      />
    </LayoutContainer>
  );
};

export default LoginPage;
