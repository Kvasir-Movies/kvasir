import React from "react";

import useFormInput from "../hooks/useFormInput";
import { addFriend } from "../network/requests";
import { User } from "../types";

const FriendAdder = (props: { user: User; setUser: Function }): JSX.Element => {
  const emailInput = useFormInput("");

  const handleAddFriend = async () => {
    const user = await addFriend(props.user.id, emailInput.value);
    if (user) {
      props.setUser(user);
    }
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
