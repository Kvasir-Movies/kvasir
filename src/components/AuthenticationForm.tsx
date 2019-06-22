import React from "react";
import { Button, Container, Form, Header } from "semantic-ui-react";

const AuthenticationForm = ({
  emailValue,
  footer,
  formName,
  handleOnSubmit,
  onEmailChange,
  onPasswordChange,
  passwordValue
}: {
  emailValue: string;
  handleOnSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  footer: JSX.Element;
  formName: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordValue: string;
}): JSX.Element => {
  return (
    <div
      style={{
        display: "flex",
        flexGrow: 1,
        justifyContent: "center",
        paddingTop: "4em"
      }}
    >
      <div style={{ flexGrow: 1, maxWidth: "40em" }}>
        <Header as="h1">{formName}</Header>
        <Form onSubmit={handleOnSubmit}>
          <Form.Field>
            <label>Email</label>
            <input
              name="email"
              placeholder="Email"
              type="text"
              value={emailValue}
              onChange={onEmailChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              name="password"
              placeholder="Password"
              type="password"
              value={passwordValue}
              onChange={onPasswordChange}
            />
          </Form.Field>
          <Button fluid type="submit">
            Submit
          </Button>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "1em"
            }}
          >
            {footer}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AuthenticationForm;
