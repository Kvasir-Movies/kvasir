import React from "react";
import { Segment } from "semantic-ui-react";

import { FullUser } from "../types";

const FriendList = ({ sessionUser }: { sessionUser: FullUser }) => (
  <Segment.Group className="friendList">
    {sessionUser.friends.map(friend => (
      <Segment key={friend.email}>{friend.email}</Segment>
    ))}
  </Segment.Group>
);

export default FriendList;
