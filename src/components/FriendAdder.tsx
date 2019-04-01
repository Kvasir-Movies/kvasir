import React from "react";

import useFormInput from "../hooks/useFormInput";
import { addFriend } from "../network/requests";
import { User } from "../types";

const FriendAdder = (props: { user: User }): JSX.Element => {
  const emailInput = useFormInput("");

  const handleAddFriend = async () => {
    addFriend(props.user.id, emailInput.value);
  };

  return (
    <div className="friendAdder">
      <span>Friend's Email:</span>
      <input className="formField" type="email" {...emailInput} />
      <button onClick={handleAddFriend}>Add Friend</button>
    </div>
  );
};

export default FriendAdder;
