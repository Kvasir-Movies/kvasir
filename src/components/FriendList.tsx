import React from "react";
import { Segment } from "semantic-ui-react";

import { User } from "../types";

const FriendList = ({ sessionUser }: { sessionUser: User }) => (
  <Segment.Group>
    {sessionUser.friends.map(friend => (
      <Segment key={friend.email}>{friend.email}</Segment>
    ))}
  </Segment.Group>
);

export default FriendList;
