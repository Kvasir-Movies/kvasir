import React from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Label } from "semantic-ui-react";

import { setSessionUser } from "../actions";
import useFormInput from "../hooks/useFormInput";
import { addFriend } from "../network/requests";
import { SetSessionUser, User } from "../types";

const FriendAdder = ({ sessionUser }: { sessionUser: User }): JSX.Element => {
  const emailInput = useFormInput("");
  const dispatch = useDispatch();

  // Sets a new user object to the sessionUser to refresh values associated
  // with that user's object
  // First double-checks that the user itself hasn't changed
  const updateSessionUser = (user: User) => {
    if (user.id === sessionUser.id) {
      dispatch(setSessionUser(user));
    }
  };

  const handleOnSubmit = async () => {
    const user = await addFriend(sessionUser.id, emailInput.value);
    if (user) {
      updateSessionUser(user);
    }
    emailInput.setValue("");
  };

  return (
    <Form className="flex-fill" onSubmit={handleOnSubmit}>
      <input
        className="flex-fill"
        name="email"
        placeholder="Enter a friend's email"
        type="email"
        value={emailInput.value}
        onChange={emailInput.onChange}
      />
      <Button primary style={{ marginLeft: "0.5em" }} type="submit">
        Add
      </Button>
    </Form>
  );
};

export default FriendAdder;
