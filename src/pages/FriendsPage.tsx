import React from "react";
import { Container, Header } from "semantic-ui-react";

import FriendAdder from "../components/FriendAdder";
import FriendList from "../components/FriendList";
import LayoutContainer from "../components/LayoutContainer";
import { Path } from "../constants";
import { useSelector } from "react-redux";
import { GlobalState } from "../types";

const FriendsPage = (): JSX.Element => {
  const sessionUser = useSelector((state: GlobalState) => state.sessionUser!);
  return (
    <LayoutContainer activePath={Path.friendsPage}>
      <Container text>
        <Header as="h2">Friends</Header>
        <FriendAdder sessionUser={sessionUser} />
        <FriendList sessionUser={sessionUser} />
      </Container>
    </LayoutContainer>
  );
};

export default FriendsPage;
