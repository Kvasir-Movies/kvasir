import React from "react";
import { Container, Header } from "semantic-ui-react";

import FriendAdder from "../components/FriendAdder";
import FriendList from "../components/FriendList";
import LayoutContainer from "../components/LayoutContainer";
import { Path } from "../constants";
import useSessionUser from "../hooks/useSessionUser";

const FriendsPage = (): JSX.Element => {
  const sessionUser = useSessionUser()!;
  return (
    <LayoutContainer activePath={Path.friendsPage}>
      <Container text>
        <Header as="h2" inverted>
          Friends
        </Header>
        <FriendAdder sessionUser={sessionUser} />
        <FriendList sessionUser={sessionUser} />
      </Container>
    </LayoutContainer>
  );
};

export default FriendsPage;
