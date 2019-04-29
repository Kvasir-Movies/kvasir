import React from "react";
import { Button, Form, Header } from "semantic-ui-react";

const AuthenticationForm = ({
  emailValue,
  formName,
  handleOnSubmit,
  onEmailChange,
  onPasswordChange,
  passwordValue
}: {
  emailValue: string;
  handleOnSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
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
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </div>
  );
};

export default AuthenticationForm;
